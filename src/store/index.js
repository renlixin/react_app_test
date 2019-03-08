import { createStore, applyMiddleware } from 'redux'

import reducer from './reducer/index'

let store = createStore(reducer, applyMiddleware(({ getState }) => {
  return (next) => (action) => {
    console.log('出触发的 dispatch:', action)
    let returnValue = next(action)
    console.log('修改后的 state', getState())
    return returnValue
  }
}))
export default store