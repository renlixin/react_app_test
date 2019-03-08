import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App'

import store from './store/index.js'

ReactDOM.render(<App store={store}/>, document.getElementById('root'), () => {
	console.log('%c  页  面  渲  染  成  功', 'font-size: 14px; color: green;text-shadow: 1px 1px 1px red;')
});
