import React, { Component } from 'react'
import propTypes from 'prop-types'

/**
 * Provider: 当前项目的根组件
 * 		1. 接收通过属性传进来的 store ， 把 store 挂载到上下文中，这样当前项目中任何一个组件中，想要使用redux中的store，直接通过上下文获取即可
 * 		2. 在组件的 render 中，把传递给 provider 的子元素渲染
 */

class Provider extends Component {
	constructor (props, context) {
		super(props, context)
	}
	// => 设置上下文信息类型
	static childContextTypes = {
		store: propTypes.object.isRequired
	}
	// => 设置上下文信息 值
	getChildContext () {
		return {
			store: this.props.store
		}
	}

	render () {
		return this.props.children
	}
}

/**
 * connect: 高阶组件（基于柯理化函数）创建的组件就是高阶组件
 * @params
 * 		`mapStateToProps`: 回调函数，把redux中的部分状态信息（方法返回的内容）挂载到指定的组件属性上
 * 		```javascript
 *  	function mapStateToProps (state) {
 * 			// => state: redux 中的状态信息
 * 			return {} // return 对象中有啥，属性上就挂载啥
 * 		}
 * 		```
 * 
 * 		`mapDispatchToProps`:  回调函数，把一些需要派发的任务那个发也挂载到组件的属性上
 * 		```javascript
 * 		function mapDispatchToProps (dispatch) {
 * 			// => dispatch: store 中的 dispatch
 * 			return {
 * 				init () {
 * 					return dispatch({type: 'XXX', ....})
 * 				}
 * 			} // return 对象中有啥，属性上就挂载啥（返回的方法中有执行的 dispatch 派发任务的操作）
 * 		}
 * 		```
 * 	@return
 * 		返回一个新的函数 connnectHOT
 * 
 * 	====================
 * 	connnectHOT()
 * 	@params
 * 		传递进来的是要操作的组件，需要把指定的属性和方法都挂载到当前组件的属性上
 * 	@return {Proxy}
 * 		返回一个新的组件 Proxy(代理组件)，在代理组件中，我们要获取 Provider 在上下文中存储的 store ，紧接着获取 store 中的 dispatch 和 state
 * 		把 mapStateToProps 和 mapDispatchToProps 执行，接受返回结果，把这些结果挂载到Component这个要操作的组件上
 */

function connect (mapStateToProps, mapDispatchToProps) {

	return function connnectHOT (Component) {
		return class Proxy extends Component {
			// => 获取上下文中的 store
			static contextTypes = {
				store: propTypes.object
			}
			// => 获取 store 中的 state 和 dispatch ，把传递的两个回调函数执行，接收返回的结果
			constructor (props, context) {
				super(props, context)
				this.state = this.queryMountProps()
			}
			// 从 redux 中获取最新的回调信息，基于回调函数筛选，返回的是需要挂载到组件属性上的信息
			queryMountProps = () => {
				let {store} = this.context
				let state = store.getState()
				let propsState = typeof mapStateToProps === 'function' ? mapStateToProps(state) : {}
				let propsDispatch = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(store.dispatch) : {}
				return {
					...propsState,
					...propsDispatch
				}
			}
			// 渲染 component 组件，并且把获取的信息挂载到属性上, 单独调取PROXY 组件时传递的属性也传递给component
			render () {
				return <Component {...this.state} {...this.props}></Component>
			}
			// 基于redux 中的 subscribe 向事件池中追加一个方法，当容器状态改变，我们需要重新获取最新的状态信息，并且重新把cocomponent重新渲染，
			// 把最新的状态信息通过属性传递给component
			componentDidMount () {
				this.context.store.subscribe(() => {
					this.setState(this.queryMountProps())
				})
			}

		}
	}
}



export {
	Provider,
	connect
}