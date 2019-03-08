import * as TYPE from '../action-types'

export default function vote (state = {
	n: 0
}, action) {
	switch (action.type) {
		case TYPE['VOTE_SUPPORT'] :
			state = {...state, n: state.n + 1}
			break;
		case TYPE['VOTE_AGANIST'] :
			state = {...state, n: state.n - 1}
			break;
	}
	return state
}