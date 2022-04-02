import { combineReducers } from 'redux';
import AuthReducer from './reducers/authReducer/AuthReducer';
import DarkModeReducer from './reducers/darkModeReducer/DarkModeReducer';
// import ListReducer from './reducers/listReducer/ListReducer';
// import UserReducer from './reducers/userReducer/UserReducer';
import VideoReducer from './reducers/videoReducer/VideoReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	dark: DarkModeReducer,
	// list: ListReducer,
	// user: UserReducer,
	videos: VideoReducer,
});

export default rootReducer;
