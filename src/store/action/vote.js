import * as TYPE from '../action-types'

let vote = {
	support: () => {
		return {
			type: TYPE['VOTE_SUPPORT']
		}
	}
}

export default vote