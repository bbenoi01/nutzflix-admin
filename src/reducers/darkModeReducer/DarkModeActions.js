import { types } from '../../types';

export function lightMode() {
	return (dispatch) => {
		dispatch({
			type: types.LIGHT_MODE,
		});
		localStorage.setItem('darkMode', JSON.stringify(false));
	};
}

export function darkMode() {
	return (dispatch) => {
		dispatch({
			type: types.DARK_MODE,
		});
		localStorage.setItem('darkMode', JSON.stringify(true));
	};
}

export function toggleMode() {
	return (dispatch) => {
		dispatch({
			type: types.TOGGLE_MODE,
		});
		localStorage.setItem(
			'darkMode',
			JSON.stringify(!JSON.parse(localStorage.getItem('darkMode')))
		);
	};
}
