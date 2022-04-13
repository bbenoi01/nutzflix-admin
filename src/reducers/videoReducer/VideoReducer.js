import { types } from '../../types';

const INITIAL_STATE = {
	isFetching: false,
	videos: JSON.parse(sessionStorage.getItem('videos')) || null,
	video: JSON.parse(sessionStorage.getItem('video')) || null,
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
				errors: payload,
			};
		}

		case types.GET_SINGLE_VIDEO_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.GET_SINGLE_VIDEO_SUCCESS: {
			return {
				...state,
				isFetching: false,
				video: payload,
				errors: {},
			};
		}

		case types.GET_SINGLE_VIDEO_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.CREATE_VIDEO_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.CREATE_VIDEO_SUCCESS: {
			return {
				...state,
				videos: payload,
				isFetching: false,
				errors: {},
			};
		}

		case types.CREATE_VIDEO_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
			};
		}

		case types.UPDATE_VIDEO_START: {
			return {
				...state,
				isFetching: true,
				errors: {},
			};
		}

		case types.UPDATE_VIDEO_SUCCESS: {
			return {
				...state,
				isFetching: false,
				videos: payload.updatedVideos,
				video: payload.updatedVideo,
				errors: {},
			};
		}

		case types.UPDATE_VIDEO_FAILURE: {
			return {
				...state,
				isFetching: false,
				errors: payload,
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

		case types.CLEAR_VIDEOS: {
			return {
				...state,
				videos: null,
			};
		}

		case types.LOGOUT: {
			sessionStorage.removeItem('videos');
			sessionStorage.removeItem('video');
			return {
				videos: null,
				video: null,
				isFetching: false,
				errors: {},
			};
		}
		default:
			return state;
	}
};

export default VideoReducer;
