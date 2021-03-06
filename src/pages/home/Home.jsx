import { useEffect, useMemo, useState } from 'react';
import nutzflixApi from '../../api/nutzflixApi';
import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget from '../../components/widget/Widget';
// import Featured from '../../components/featured/Featured';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import Chart from '../../components/chart/Chart';
import TransactionTable from '../../components/transactionTable/TransactionTable';

const Home = () => {
	const MONTHS = useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		[]
	);
	const [subStats, setSubStats] = useState([]);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await nutzflixApi.get('/users/stats');
				const statsList = res?.data?.sort(function (a, b) {
					return a._id - b._id;
				});
				statsList.map((item) =>
					setSubStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], 'New Subscribers': item?.total },
					])
				);
			} catch (err) {
				console.log(err);
			}
		};
		getStats();
	}, [MONTHS]);

	return (
		<div className='home'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<div className='widgets'>
					<Widget type='sub' />
					<Widget type='order' />
					<Widget type='earning' />
					<Widget type='balance' />
				</div>
				<div className='charts'>
					<WidgetLg />
					<Chart data={subStats} title='Subscriber Analytics' aspect={4 / 1} />
				</div>
				<div className='list-container'>
					<div className='list-title'>Latest Transactions</div>
					<TransactionTable />
				</div>
			</div>
		</div>
	);
};

export default Home;
