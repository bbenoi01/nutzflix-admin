import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './login.scss';

import { login } from '../../reducers/authReducer/AuthActions';

const Login = ({ isFetching }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();
		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	return (
		<div className='login'>
			<form className='login-form' onSubmit={handleLogin}>
				<input
					type='email'
					placeholder='email'
					className='login-input'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='password'
					className='login-input'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit' className='login-btn' disabled={isFetching}>
					Login
				</button>
			</form>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		isFetching: store.auth.isFetching,
	};
}

export default connect(mapStoreToProps)(Login);
