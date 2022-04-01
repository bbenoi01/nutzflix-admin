import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import TransactionTable from '../../components/transactionTable/TransactionTable';

const Single = () => {
	return (
		<div className='single'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<div className='top'>
					<div className='left'>
						<button className='edit-btn'>Edit</button>
						<h2 className='title'>Information</h2>
						<div className='item'>
							<img
								src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
								alt=''
								className='item-img'
							/>
							<div className='details'>
								<h2 className='item-title'>Jane Doe</h2>
								<div className='detail-item'>
									<span className='item-key'>Email:</span>
									<span className='item-value'>janedoe@gmail.com</span>
								</div>
								<div className='detail-item'>
									<span className='item-key'>Phone:</span>
									<span className='item-value'>+1 234 567 8901</span>
								</div>
								<div className='detail-item'>
									<span className='item-key'>Address:</span>
									<span className='item-value'>
										123 Mockingbird Way San Diego, CA 92085
									</span>
								</div>
								<div className='detail-item'>
									<span className='item-key'>Country:</span>
									<span className='item-value'>USA</span>
								</div>
							</div>
						</div>
					</div>
					<div className='right'>
						<Chart title='User Spending (Last 6 Months)' aspect={5 / 1} />
					</div>
				</div>
				<div className='bottom'>
					<h2 className='title'>Last Transactions</h2>
					<TransactionTable />
				</div>
			</div>
		</div>
	);
};

export default Single;
