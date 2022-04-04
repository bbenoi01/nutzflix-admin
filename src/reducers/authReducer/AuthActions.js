import { types } from '../../types';
import axios from 'axios';

export function login(userData) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_START,
		});
		axios
			.post('/auth/login', userData)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data));
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.LOGIN_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function register(newUser) {
	return (dispatch) => {
		dispatch({
			type: types.REGISTER_START,
		});
		axios
			.post('/auth/register', newUser)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data));
				localStorage.setItem('darkMode', JSON.stringify(false));
				dispatch({
					type: types.REGISTER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.REGISTER_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({
			type: types.LOGOUT,
		});
		localStorage.clear();
		sessionStorage.clear();
		window.location.replace('/');
	};
}
