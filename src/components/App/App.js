import React, { Component } from 'react';
import action from '../../store/action/index'
import { connect } from 'react-redux'
import './App.less'
import Text from '../Text'
class App extends Component {
	constructor (props) {
		super(props)
		this.state = {}
	}

	render () {
		return (<div>
			<div>{this.props.n}</div>
      <Text/>
		</div>)
	}
}
// 把 redux 容器中的状态信息遍历，赋值给当前组件的属性（state）
let mapStateToProps = (state) => {
	// state 就是redux容器中的信息
	// 我们返回的是啥，就把他挂在到当前组件的属性上, redux 中存放很多东西,用啥返回啥就行
	return {
		...state.vote
	}
}
// 把 redux 中的 dispatch 派发行为遍历，赋值给丹铅组件的属性 （ActionCreator）
let mapDispatchToProps = (dispatch) => {
	// dispatch: store 中存储的 dispatch 方法
	// 我们返回的是啥，就把他挂在到当前组件的属性上, （一般挂载到这的方法在内部完成了 dispatch 派发任务的操作）
	return {
		init () {
			dispatch(action.vote.support())
		}
	}
}
// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(state => ({...state.vote}), action.vote)(App)