import { types } from '../../types';
import axios from 'axios';

export function getVideos() {
	return (dispatch) => {
		dispatch({
			type: types.GET_VIDEOS_START,
		});
		axios
			.get('/videos', {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
				},
			})
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
		axios
			.post('/videos', videoData, {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
				},
			})
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

export function deleteVideo(id) {
	return (dispatch) => {
		dispatch({
			type: types.DELETE_VIDEO_START,
		});
		axios
			.delete(`/videos/${id}`, {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
				},
			})
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
