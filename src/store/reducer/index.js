import { combineReducers } from 'redux'
import vote from './vote'

// 合并 reducer  并且导出，为了保证合并 reducer 过程中，每隔模块管理的状态信息不会互相冲突，reducer 在合并的时候，把容器中的状态进行分开管理，此时
// 容器中的state状态进行分开管理
let reducer = combineReducers({
	vote
})

export default reducer