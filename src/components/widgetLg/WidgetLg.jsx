import './widgetLg.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getNewSubs } from '../../reducers/subReducer/SubActions';

const WidgetLg = ({ dispatch, newSubs }) => {
	useEffect(() => {
		dispatch(getNewSubs());
	}, [dispatch]);

	return (
		<div className='widgetLg'>
			<span className='title'>New Subscribers</span>
			<ul className='sub-list'>
				{newSubs &&
					newSubs.map((sub) => (
						<li className='item' key={sub?._id}>
							<img
								src={sub?.profilePhoto || '/profile_avatar.jpg'}
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

function mapStoreToProps(store) {
	return {
		newSubs: store.sub.newSubs,
	};
}

export default connect(mapStoreToProps)(WidgetLg);
