import React, { Component } from 'react';
import './App.less'
export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			time: new Date().toLocaleDateString() + new Date().toLocaleTimeString()
		}
	}

	changeTIme () {
		this.setState({
			time: new Date().toLocaleDateString() + new Date().toLocaleTimeString()
		})
	}

	componentDidMount () {
		let that = this
		setInterval(this.changeTIme.bind(that), 1000)
	}

	render () {
		return (<div className="App">
			<h3>北京时间：{this.state.time}</h3>
		</div>)
	}
}