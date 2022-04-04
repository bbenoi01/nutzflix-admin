import { types } from '../../types';

const INITIAL_STATE = {
	darkMode: JSON.parse(localStorage.getItem('darkMode')),
};

const DarkModeReducer = (state = INITIAL_STATE, action) => {
	const { type } = action;

	switch (type) {
		case types.LIGHT_MODE: {
			return {
				darkMode: false,
			};
		}

		case types.DARK_MODE: {
			return {
				darkMode: true,
			};
		}

		case types.TOGGLE_MODE: {
			return {
				darkMode: !state.darkMode,
			};
		}
		default:
			return state;
	}
};

export default DarkModeReducer;
