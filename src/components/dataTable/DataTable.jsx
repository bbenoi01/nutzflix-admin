import './dataTable.scss';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { deleteVideo } from '../../reducers/videoReducer/VideoActions';
import { deleteSub } from '../../reducers/subReducer/SubActions';

const DataTable = ({ subs, videos, title }) => {
	const location = useLocation();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [data, setData] = useState([]);

	console.log('DATA', data);

	const dispatch = useDispatch();

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) {
				return order;
			}
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	let headCells;

	if (title === 'Videos') {
		headCells = [
			{
				id: 'id',
				label: 'ID',
			},
			{
				id: 'title',
				label: 'Title',
			},
			{
				id: 'genre',
				label: 'Genre',
			},
			{
				id: 'year',
				label: 'Year',
			},
			{
				id: 'rating',
				label: 'Rating',
			},
			{
				id: 'series',
				label: 'Series',
			},
			{
				id: 'action',
				label: 'Action',
			},
		];
	} else {
		headCells = [
			{
				id: 'id',
				label: 'ID',
			},
			{
				id: 'username',
				label: 'Username',
			},
			{
				id: 'email',
				label: 'Email',
			},
			{
				id: 'isAdmin',
				label: 'is Admin',
			},
			{
				id: 'joined',
				label: 'Joined',
			},
			{
				id: 'action',
				label: 'Action',
			},
		];
	}

	function EnhancedTableHead(props) {
		const {
			onSelectAllClick,
			order,
			orderBy,
			numSelected,
			rowCount,
			onRequestSort,
		} = props;
		const createSortHandler = (property) => (e) => {
			onRequestSort(e, property);
		};

		return (
			<TableHead>
				<TableRow>
					<TableCell padding='checkbox'>
						<Checkbox
							color='primary'
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all desserts',
							}}
						/>
					</TableCell>
					{headCells.map((headCell) => (
						<TableCell
							key={headCell.id}
							sortDirection={orderBy === headCell.id ? order : false}
							align={headCell.id === 'action' ? 'center' : 'inherit'}
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component='span' sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}

	const handleRequestSort = (e, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (e) => {
		if (e.target.checked) {
			let newSelecteds;
			newSelecteds = data?.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (e, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

	const handleDelete = (id) => {
		if (title === 'Videos') {
			dispatch(deleteVideo(id));
		} else {
			dispatch(deleteSub(id));
		}
	};

	useEffect(() => {
		if (location.state.dataType === 'subs') {
			setData(subs);
		} else if (location.state.dataType === 'videos') {
			setData(videos);
		}
	}, [location.state.dataType, subs, videos]);

	console.log(location.state);

	return (
		<div className='data-table'>
			<div className='data-table-title'>
				{title}
				<Link
					to={location.pathname === '/videos' ? '/videos/new' : '/subs/new'}
					className='link'
				>
					Add New
				</Link>
			</div>
			<Box sx={{ width: '100%' }}>
				<Paper sx={{ width: '100%', mb: 2 }}>
					<TableContainer>
						<Table sx={{ minWidth: 750 }}>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={data?.length}
							/>
							<TableBody>
								{stableSort(data, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((item, index) => {
										const isItemSelected = isSelected(item?._id);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(e) => handleClick(item?._id)}
												role='checkbox'
												tabIndex={-1}
												key={item?._id}
												selected={isItemSelected}
											>
												<TableCell padding='checkbox'>
													<Checkbox color='primary' checked={isItemSelected} />
												</TableCell>
												<TableCell component={'th'} id={labelId} scope='row'>
													{item?._id}
												</TableCell>
												<TableCell className='center-cell'>
													<div className='cell-wrapper'>
														<img
															src={
																item?.img ||
																item?.profilePhoto ||
																'/no-image-alt.jpg'
															}
															alt=''
															className='image'
														/>
														{item?.title || item?.username}
													</div>
												</TableCell>
												<TableCell>{item?.genre || item?.email}</TableCell>
												<TableCell>
													{item?.year || item?.isAdmin.toString()}
												</TableCell>
												<TableCell>
													{title === 'Videos' ? (
														<span className={`rating ${item?.rating}`}>
															{item?.rating}
														</span>
													) : (
														item?.createdAt
													)}
												</TableCell>
												<TableCell>{item?.isSeries.toString()}</TableCell>
												<TableCell>
													<div className='cell-action'>
														<Link
															to={
																(title = 'Videos'
																	? `/videos/${item?._id}`
																	: `/subs/${item?._id}`)
															}
															state={{ item }}
															style={{ textDecoration: 'none' }}
														>
															<EditIcon className='edit-btn' />
														</Link>
														<DeleteForeverIcon
															className='delete-btn'
															onClick={() => handleDelete(item?._id)}
														/>
													</div>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={data?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		videos: store.videos.videos,
		subs: store.sub.subs,
	};
}

export default connect(mapStoreToProps)(DataTable);
