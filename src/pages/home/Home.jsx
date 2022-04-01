import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import TransactionTable from '../../components/transactionTable/TransactionTable';
import './home.scss';

const Home = () => {
	return (
		<div className='home'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<div className='widgets'>
					<Widget type='user' />
					<Widget type='order' />
					<Widget type='earning' />
					<Widget type='balance' />
				</div>
				<div className='charts'>
					<Featured />
					<Chart title='Last 6 Months (Revenue)' aspect={4 / 1} />
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
