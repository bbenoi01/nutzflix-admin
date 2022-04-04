import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Navigate,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { videoInputs, subscriberInputs } from './formSource';
import './style/dark.scss';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';

const App = ({ darkMode, user }) => {
	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<Router>
				<Switch>
					<Route path='/'>
						<Route
							index
							element={!user ? <Login /> : <Navigate to={'/home'} replace />}
						/>
						<Route
							path='home'
							element={user ? <Home /> : <Navigate to={'/'} replace />}
						/>
						<Route path='subs'>
							<Route
								index
								element={
									user ? (
										<List title='Subscribers' />
									) : (
										<Navigate to={'/'} replace />
									)
								}
							/>
							<Route
								path=':subId'
								element={user ? <Single /> : <Navigate to={'/'} replace />}
							/>
							<Route
								path='new'
								element={
									user ? (
										<New inputs={subscriberInputs} title='Add New Subscriber' />
									) : (
										<Navigate to={'/'} replace />
									)
								}
							/>
						</Route>
						<Route path='videos'>
							<Route
								index
								element={
									user ? <List title='Videos' /> : <Navigate to={'/'} replace />
								}
							/>
							<Route
								path=':videoId'
								element={user ? <Single /> : <Navigate to={'/'} replace />}
							/>
							<Route
								path='new'
								element={
									user ? (
										<New inputs={videoInputs} title='Add New Video' />
									) : (
										<Navigate to={'/'} replace />
									)
								}
							/>
						</Route>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		darkMode: store.dark.darkMode,
		user: store.auth.user,
	};
}

export default connect(mapStoreToProps)(App);
