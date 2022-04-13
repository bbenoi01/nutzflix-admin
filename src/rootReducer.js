import { combineReducers } from 'redux';
import AuthReducer from './reducers/authReducer/AuthReducer';
import DarkModeReducer from './reducers/darkModeReducer/DarkModeReducer';
import ListReducer from './reducers/listReducer/ListReducer';
import SubReducer from './reducers/subReducer/SubReducer';
import VideoReducer from './reducers/videoReducer/VideoReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	dark: DarkModeReducer,
	list: ListReducer,
	sub: SubReducer,
	video: VideoReducer,
});

export default rootReducer;
