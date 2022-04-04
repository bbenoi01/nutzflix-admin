import { types } from '../../types';
import axios from 'axios';

export function getSubs() {
	return (dispatch) => {
		dispatch({
			type: types.GET_SUBS_START,
		});
		axios
			.get('/users', {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
				},
			})
			.then((res) => {
				sessionStorage.setItem('subs', JSON.stringify(res.data));
				dispatch({
					type: types.GET_SUBS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_SUBS_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function deleteSub(id) {
	return (dispatch) => {
		dispatch({
			type: types.DELETE_SUB_START,
		});
		axios
			.delete(`/users/${id}`, {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
				},
			})
			.then((res) => {
				sessionStorage.setItem('subs', JSON.stringify(res.data.updatedSubList));
				dispatch({
					type: types.DELETE_SUB_SUCCESS,
					payload: res.data.updatedSubList,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.DELETE_SUB_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
