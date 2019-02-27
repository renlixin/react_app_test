import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import './static/less/index.less'

console.log(qs.parse('name=9&age=123'));


ReactDOM.render(<div/>, document.getElementById('root'));
