import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/index'
import App from './components/App/App.js'
render(<Provider store={store}>
	<App/>
</Provider>, document.getElementById('root'), () => {
	console.log('%c  页  面  渲  染  成  功', 'font-size: 14px; color: green;text-shadow: 1px 1px 1px red;')
});
