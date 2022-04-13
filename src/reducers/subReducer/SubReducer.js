import { types } from '../../types';

const INITIAL_STATE = {
	isFetching: false,
	newSubs: JSON.parse(sessionStorage.getItem('newSubs')) || null,
	subs: JSON.parse(sessionStorage.getItem('subs')) || null,
	sub: JSON.parse(sessionStorage.getItem('sub')) || null,
	errors: {},
};

const SubReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GET_NEW_SUBS_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.GET_NEW_SUBS_SUCCESS: {
			return {
				...state,
				isFetching: false,
				newSubs: payload,
				errors: {},
			};
		}

		case types.GET_NEW_SUBS_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.GET_SUBS_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.GET_SUBS_SUCCESS: {
			return {
				...state,
				subs: payload,
				isFetching: false,
				errors: {},
			};
		}

		case types.GET_SUBS_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.GET_SUB_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.GET_SUB_SUCCESS: {
			return {
				...state,
				isFetching: false,
				sub: payload,
				errors: {},
			};
		}

		case types.GET_SUB_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.UPDATE_SUB_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.UPDATE_SUB_SUCCESS: {
			return {
				...state,
				isFetching: false,
				subs: payload.updatedSubList,
				sub: payload.updatedSub,
				errors: {},
			};
		}

		case types.UPDATE_SUB_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.DELETE_SUB_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.DELETE_SUB_SUCCESS: {
			return {
				...state,
				subs: payload,
				isFetching: false,
				errors: {},
			};
		}

		case types.DELETE_SUB_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.CLEAR_SUBS: {
			return {
				...state,
				subs: null,
			};
		}

		case types.LOGOUT: {
			return {
				newSubs: null,
				subs: null,
				sub: null,
				isFetching: false,
				errors: {},
			};
		}
		default:
			return state;
	}
};

export default SubReducer;
