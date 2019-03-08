/**
 * createStore：创建REDUX容器的
 * 	  @params
 * 			reduceer：函数
 *    @return
 * 			store：{
 * 				getState,
 * 				subscribe,
 * 				dispatch
 * 			}
 */
function createStore (reducer) {
	// 创建一个store，state 用来存储管理的状态信息，listenAry 用来存储事件池中的方法
	// state 不用设置初始值，因为第一次dispatch执行reducer的时候，state中没有值，走的是reducer中赋值的默认信息，我们自己会创建容器的时候就把dispatch执行一次
	let state = undefined;
	let listenAry = []

	// 基于 dispatch 实现任务派发
	function dispatch (action) {
		// 1. 执行 reducer， 修改容器中的状态(接收reducer的返回值，把返回值替换原有的state，
		// 		值得注意的是⚠️：我们是把返回值全部替换state，所以要求reducer在修改状态之前，先克隆一份，在进行单个属性的修改)
		state = reducer(state, action);
		// 2. 容器中的状态信息经过 reducer 修改后,通知事件池中的方法执行
		for (let i = 0; i < listenAry.length; i++) {
			let item = listenAry[i];
			if (typeof item === 'function') {
				item()
			} else {
				listenAry.splice(i, 1)
				i--;
			}
		}
	}
	dispatch({type: '_INIT_DEFAULT_STATE'}); // => 创建容器的时候执行一次 dispatch ，目的是把reducer中的默认状态信息赋值给redux中的state

	function subscribe (callback) {
		// 1. 向容器中追加方法（去重复验证）
		!listenAry.includes(callback) ? listenAry.push(callback) : null;
		return unsubscribe = () => {
			let index = listenAry.findIndex(item => item === callback)
			// listenAry.splice(index, 1); //可能会引发数组塌陷
			listenAry[index] = null
		}
	}

	// 获取容器中的状态信息
	function getState () {
		// 1. 我们需要保证返回的状态信息，不能和容器中的 state 是同一个堆内存，
		//    （否则外面获取状态信息后，直接就可以修改容器中的状态了，这不符合 dispatch 到reducer 才能该状态的规范）
		return JSON.parse(JSON.stringify(state));
	}

	return {
		getState,
		subscribe,
		dispatch
	}
}

let reducer = (state = {}, action) => {
	// => state： 原有状态信息
	// => action: 派发任务时传递的行为对象
	switch (action.type) {
		// ... 根据type不同，执行不同的修改操作
	}
	return state; // 返回的state会替换原有的state
}
let store = createStore(reducer); // create 的时候把reducer传进来，但是reducer并没有执行，只有dispatch的时候才执行，通过执行reducer修改容器中的状态

store.dispatch({type: 'CHANGE'})

/**
 * combineReducers：reducer 合并的方法
 * 	  @params
 * 			对象：，对象中包含了每一个板块中的对象的reducer
 *    @return
 * 			返回的是一个新的 reducer 函数，把这个值当作参数传递给createStore
 * 	特殊处理：合并 reducer 之后，reducx 容器中的 state 也变为以对应对象管理的模式，例如 => { xxx: {...}, ...}
 */

function combineReducers (reducers) {
	// => reducers 是传递进来的 reducers 对象集合

	return function reducer (state ={}, action) {
		// dispatch 派发的时候，执行的是返回的reducer，这里也要返回一个最终的state对象，替换原有的state， 而且这个state中包含每隔模块的状态信息
		// => 我们所谓的reducer合并，其实就是dispatch派发的时候，把每一个模块的reducer 都单独执行一遍，把每隔模块的返回状态最后汇总，一起替换容器中的状态

		let newState = {}
		for (let key in reducers) {
			if (reducers.hasOwnProperty(key)) {
				// => reducers[key] 每个模块单独的 reducer
				// state[key] => 当前模块中存储的状态信息
				newState[key] = reducers[key](state[key], action)
			}
		}
		return newState
	}
}

let reducer = combineReducers(reducer)