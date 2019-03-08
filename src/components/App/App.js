import React, { Component } from 'react';
import './App.less'
import Text from '../Text'

export default class App extends Component {
	static defaultProps = {}

	constructor (props) {
		super(props)
		let {store: {getState}} = this.props
		let {vote: {n}} = getState()
		this.state = {n}
	}
	componentDidMount () {
		let {store: {getState, subscribe}}= this.props
		subscribe(() => {
			let { vote: {n} } = getState()
			this.setState({
				n
			})
		})
	}
	render () {
		let { n } = this.state
		let { store } = this.props
		return (<div>
			<div>{n}</div>
      <Text store={store}/>
		</div>)
	}
}