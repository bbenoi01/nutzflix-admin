import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../dataTableSource';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const DataTable = () => {
	const [data, setData] = useState(userRows);

	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
	};

	const actionColumn = [
		{
			field: 'action',
			headerName: 'Action',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='cell-action'>
						<Link to='/users/test' style={{ textDecoration: 'none' }}>
							<div className='view-btn'>View</div>
						</Link>
						<div
							className='delete-btn'
							onClick={() => handleDelete(params.row.id)}
						>
							Delete
						</div>
					</div>
				);
			},
		},
	];
	return (
		<div className='data-table'>
			<div className='data-table-title'>
				Add New User
				<Link to='/users/new' className='link'>
					Add New
				</Link>
			</div>
			<DataGrid
				className='data-grid'
				rows={data}
				columns={userColumns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	);
};

export default DataTable;