import './newUserInfo.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NewUserInfo = () => {
	const [newUsers, setNewUsers] = useState([]);

	useEffect(() => {
		const getNewUsers = async () => {
			try {
				const res = await axios.get('/users?new=true', {
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
					},
				});
				setNewUsers(res?.data);
			} catch (err) {
				console.log(err);
			}
		};
		getNewUsers();
	}, []);

	return (
		<div className='new-user-info'>
			<span className='title'>New Users</span>
			<ul className='user-list'>
				{newUsers.map((user) => (
					<li className='item' key={user?._id}>
						<img
							src={user?.profilePic || '/profile_avatar.jpg'}
							alt=''
							className='image'
						/>
						<div className='user'>
							<span className='username'>{user?.username}</span>
						</div>
						<button>
							<VisibilityIcon className='icon' />
							Display
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NewUserInfo;
