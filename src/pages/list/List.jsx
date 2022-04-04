import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DataTable from '../../components/dataTable/DataTable';

const List = ({ title }) => {
	return (
		<div className='list'>
			<Sidebar />
			<div className='canvas'>
				<Navbar />
				<DataTable title={title} />
			</div>
		</div>
	);
};

export default List;
