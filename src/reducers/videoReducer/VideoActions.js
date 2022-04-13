import { types } from '../../types';
import nutzflixApi from '../../api/nutzflixApi';

export function getVideos() {
	return (dispatch) => {
		dispatch({
			type: types.GET_VIDEOS_START,
		});
		nutzflixApi
			.get('/videos')
			.then((res) => {
				sessionStorage.setItem('videos', JSON.stringify(res.data));
				dispatch({
					type: types.GET_VIDEOS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_VIDEOS_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function createVideo(videoData) {
	return (dispatch) => {
		dispatch({
			type: types.CREATE_VIDEO_START,
		});
		nutzflixApi
			.post('/videos', videoData)
			.then((res) => {
				sessionStorage.setItem(
					'videos',
					JSON.stringify(res.data.updatedVideoList)
				);
				dispatch({
					type: types.CREATE_VIDEO_SUCCESS,
					payload: res.data.updatedVideoList,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.CREATE_VIDEO_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function getVideo(id) {
	return (dispatch) => {
		dispatch({
			type: types.GET_SINGLE_VIDEO_START,
		});
		nutzflixApi
			.get(`/videos/find/${id}`)
			.then((res) => {
				sessionStorage.setItem('video', JSON.stringify(res.data));
				dispatch({
					type: types.GET_SINGLE_VIDEO_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_SINGLE_VIDEO_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function updateVideo(id, videoData) {
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_VIDEO_START,
		});
		nutzflixApi
			.put(`/${id}`, videoData)
			.then((res) => {
				sessionStorage.setItem(
					'videos',
					JSON.stringify(res.data.updatedVideos)
				);
				sessionStorage.setItem('video', JSON.stringify(res.data.updatedVideo));
				dispatch({
					type: types.UPDATE_VIDEO_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.UPDATE_VIDEO_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function deleteVideo(id) {
	return (dispatch) => {
		dispatch({
			type: types.DELETE_VIDEO_START,
		});
		nutzflixApi
			.delete(`/videos/${id}`)
			.then((res) => {
				sessionStorage.setItem(
					'videos',
					JSON.stringify(res.data.updatedVideoList)
				);
				dispatch({
					type: types.DELETE_VIDEO_SUCCESS,
					payload: res.data.updatedVideoList,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.DELETE_VIDEO_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
