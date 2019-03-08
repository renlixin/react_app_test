import React, { Component } from 'react';
import action from '../store/action/index'
class Text extends Component {
	constructor (props) {
		super(props)
		let {store: {getState}} = this.props
		let {vote: {n}} = getState()
		this.state = {n}
	}

	componentDidMount () {
		let {store: {getState, subscribe}}= this.props
		let unsubscribe = subscribe(() => {
			let { vote: {n} } = getState()
			this.setState({
				n
			})
		})
		// unsubscribe()  // 把当前追加的方法移除，解除绑定的方式
	}

	render () {
		let { n } = this.state
		let { store: {dispatch} } = this.props
		return (<div>
			{n}
			<button onClick={() => {
				dispatch(action.vote.support())
			}}>点击</button>
		</div>)
	}
}

export default Text