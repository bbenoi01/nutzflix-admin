import { types } from '../../types';

export function lightMode() {
	return (dispatch) =>
		dispatch({
			type: types.LIGHT_MODE,
		});
}

export function darkMode() {
	return (dispatch) =>
		dispatch({
			type: types.DARK_MODE,
		});
}

export function toggleMode() {
	return (dispatch) =>
		dispatch({
			type: types.TOGGLE_MODE,
		});
}
