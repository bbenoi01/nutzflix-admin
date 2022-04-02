import { types } from '../../types';

const INITIAL_STATE = {
	videos: JSON.parse(sessionStorage.getItem('videos')) || [],
	isFetching: false,
	errors: {},
};

const VideoReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GET_VIDEOS_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.GET_VIDEOS_SUCCESS: {
			return {
				...state,
				videos: payload,
				errors: {},
			};
		}

		case types.GET_VIDEOS_FAILURE: {
			return {
				...state,
				isFetching: false,
				reeors: payload,
			};
		}

		case types.DELETE_VIDEO_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.DELETE_VIDEO_SUCCESS: {
			return {
				...state,
				isFetching: false,
				videos: payload,
				errors: {},
			};
		}

		case types.DELETE_VIDEO_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.LOGOUT: {
			return {
				videos: [],
				isFetching: false,
				errors: {},
			};
		}
		default:
			return state;
	}
};

export default VideoReducer;
