import { types } from '../../types';

const INITIAL_STATE = {};

const ListReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'LIGHT': {
			return {
				darkMode: false,
			};
		}

		case 'DARK': {
			return {
				darkMode: true,
			};
		}

		case 'TOGGLE': {
			return {
				darkMode: !state.darkMode,
			};
		}
		default:
			return state;
	}
};

export default ListReducer;
