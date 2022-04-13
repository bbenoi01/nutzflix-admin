import { types } from '../../types';
import nutzflixApi from '../../api/nutzflixApi';

export function getNewSubs() {
	return (dispatch) => {
		dispatch({
			type: types.GET_NEW_SUBS_START,
		});
		nutzflixApi
			.get('/users?new=true')
			.then((res) => {
				sessionStorage.setItem('newSubs', JSON.stringify(res.data));
				dispatch({
					type: types.GET_NEW_SUBS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_NEW_SUBS_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function getSubs() {
	return (dispatch) => {
		dispatch({
			type: types.GET_SUBS_START,
		});
		nutzflixApi
			.get('/users')
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

export function getSub(id) {
	return (dispatch) => {
		dispatch({
			type: types.GET_SUB_START,
		});
		nutzflixApi
			.get(`/users/find/${id}`)
			.then((res) => {
				sessionStorage.setItem('sub', JSON.stringify(res.data));
				dispatch({
					type: types.GET_SUB_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_SUB_FAILURE,
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
		nutzflixApi
			.delete(`/users/${id}`)
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
