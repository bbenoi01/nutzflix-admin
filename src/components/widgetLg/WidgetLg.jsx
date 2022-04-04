import './widgetLg.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WidgetLg = () => {
	const [newSubs, setNewSubs] = useState([]);

	useEffect(() => {
		const getNewSubs = async () => {
			try {
				const res = await axios.get('/users?new=true', {
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM4YjZjY2NlM2I5YjBjYzQyNGQwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODgyNzcyMCwiZXhwIjoxNjQ5MjU5NzIwfQ.uaHCZbK5f7zHg03EnTi2-2ZZV3-A_KVRXK46Q5Yb7yI',
					},
				});
				setNewSubs(res?.data);
			} catch (err) {
				console.log(err);
			}
		};
		getNewSubs();
	}, []);

	return (
		<div className='widgetLg'>
			<span className='title'>New Subscribers</span>
			<ul className='sub-list'>
				{newSubs.map((sub) => (
					<li className='item' key={sub?._id}>
						<img
							src={sub?.profilePic || '/profile_avatar.jpg'}
							alt=''
							className='image'
						/>
						<div className='sub'>
							<span className='username'>{sub?.username}</span>
						</div>
						<button className='display-btn'>
							<VisibilityIcon className='icon' />
							Display
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WidgetLg;
