import { types } from '../../types';
import nutzflixApi from '../../api/nutzflixApi';

export function getLists() {
	return (dispatch) => {
		dispatch({
			type: types.GET_LISTS_START,
		});
		nutzflixApi
			.get('/lists')
			.then((res) => {
				sessionStorage.setItem('lists', JSON.stringify(res.data));
				dispatch({
					type: types.GET_LISTS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_LISTS_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
