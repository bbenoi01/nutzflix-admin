import { types } from '../../types';
import nutzflixAPi from '../../api/nutzflixApi';

export function register(newUser) {
	return (dispatch) => {
		dispatch({
			type: types.REGISTER_START,
		});
		nutzflixAPi
			.post('/auth/register', newUser)
			.then((res) => {
				const { token, ...userData } = res.data;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(userData));
				localStorage.setItem('darkMode', JSON.stringify(false));
				dispatch({
					type: types.REGISTER_SUCCESS,
					payload: userData,
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

export function login(userCredentials) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_START,
		});
		nutzflixAPi
			.post('/auth/login', userCredentials)
			.then((res) => {
				const { token, ...userData } = res.data;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(userData));
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: userData,
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

export function logout() {
	return (dispatch) => {
		dispatch({
			type: types.LOGOUT,
		});
		localStorage.removeItem('token');
		// localStorage.removeItem('user');
		sessionStorage.clear();
		window.location.replace('/');
	};
}
