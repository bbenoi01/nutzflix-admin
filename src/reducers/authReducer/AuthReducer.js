import { types } from '../../types';

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	isFetching: false,
	errors: {},
};

const AuthReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.LOGIN_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.LOGIN_SUCCESS: {
			return {
				...state,
				isFetching: false,
				user: payload,
				errors: {},
			};
		}

		case types.LOGIN_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.REGISTER_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.REGISTER_SUCCESS: {
			return {
				...state,
				isFetching: false,
				user: payload,
				errors: {},
			};
		}

		case types.REGISTER_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.LOGOUT: {
			return {
				user: null,
				isFetching: false,
				errors: {},
			};
		}
		default:
			return state;
	}
};

export default AuthReducer;
