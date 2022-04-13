import { types } from '../../types';

const INITIAL_STATE = {
	isFetching: false,
	user: JSON.parse(localStorage.getItem('user')) || null,
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
			localStorage.removeItem('user');
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
