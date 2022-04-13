import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListIcon from '@mui/icons-material/List';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../reducers/authReducer/AuthActions';
import {
	lightMode,
	darkMode,
} from '../../reducers/darkModeReducer/DarkModeActions';
import { getSubs } from '../../reducers/subReducer/SubActions';
import { getVideos } from '../../reducers/videoReducer/VideoActions';
import { getLists } from '../../reducers/listReducer/ListActions';

const Sidebar = () => {
	const dispatch = useDispatch();

	return (
		<div className='sidebar'>
			<div className='top'>
				<Link to='/' className='router-link'>
					<span className='logo'>Nutzflix</span>
				</Link>
			</div>
			<hr />
			<div className='center'>
				<ul>
					<p className='title'>MAIN</p>
					<li>
						<DashboardIcon className='icon' />
						<span>Dashboard</span>
					</li>
					<p className='title'>QUICK MENU</p>
					<Link
						to='/subs'
						state={{ dataType: 'subs' }}
						className='router-link'
						onClick={() => dispatch(getSubs())}
					>
						<li>
							<PersonOutlineIcon className='icon' />
							<span>Subscribers</span>
						</li>
					</Link>
					<Link
						to='/videos'
						state={{ dataType: 'videos' }}
						className='router-link'
						onClick={() => dispatch(getVideos())}
					>
						<li>
							<PlayIcon className='icon' />
							<span>Videos</span>
						</li>
					</Link>
					<Link
						to='/lists'
						state={{ dataType: 'lists' }}
						className='router-link'
						onClick={() => dispatch(getLists())}
					>
						<li>
							<ListIcon className='icon' />
							<span>Lists</span>
						</li>
					</Link>
					<li>
						<LocalShippingIcon className='icon' />
						<span>Delivery</span>
					</li>
					<p className='title'>USEFUL</p>
					<li>
						<InsertChartIcon className='icon' />
						<span>Stats</span>
					</li>
					<li>
						<NotificationsNoneIcon className='icon' />
						<span>Notifications</span>
					</li>
					<p className='title'>SERVICE</p>
					<li>
						<SettingsSystemDaydreamOutlinedIcon className='icon' />
						<span>System Health</span>
					</li>
					<li>
						<PsychologyOutlinedIcon className='icon' />
						<span>Logs</span>
					</li>
					<li>
						<SettingsApplicationsIcon className='icon' />
						<span>Settings</span>
					</li>
					<p className='title'>USER</p>
					<li>
						<AccountCircleOutlinedIcon className='icon' />
						<span>Profile</span>
					</li>
					<li onClick={() => dispatch(logout())}>
						<ExitToAppIcon className='icon' />
						<span>Logout</span>
					</li>
				</ul>
			</div>
			<div className='bottom'>
				<div
					className='color-option'
					onClick={() => dispatch(lightMode())}
				></div>
				<div
					className='color-option'
					onClick={() => dispatch(darkMode())}
				></div>
			</div>
		</div>
	);
};

export default Sidebar;
