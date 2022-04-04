import { types } from '../../types';

const INITIAL_STATE = {
	subs: JSON.parse(sessionStorage.getItem('subs')) || null,
	isFetching: false,
	errors: {},
};

const SubReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
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
				subs: null,
				isFetching: false,
				errors: {},
			};
		}
		default:
			return state;
	}
};

export default SubReducer;
