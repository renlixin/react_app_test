import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import './static/less/index.less'
import App from './components/App/App'

console.log(qs.parse('name=LiXin.Ren&age=18&address=BeiJing TianAnMen FuJin'));


ReactDOM.render(<App/>, document.getElementById('root'), () => {
	console.log('%c页面渲染成功', 'font-size: 14px; color: green;')
});
