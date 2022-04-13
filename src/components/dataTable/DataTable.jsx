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

import {
	getVideo,
	deleteVideo,
} from '../../reducers/videoReducer/VideoActions';
import { getSub, deleteSub } from '../../reducers/subReducer/SubActions';

const DataTable = ({ title, subs, videos, lists }) => {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [dataSet, setDataSet] = useState([]);
	const location = useLocation();
	const dispatch = useDispatch();
	const dataType = location.state.dataType;

	let headCells;
	if (dataType === 'subs') {
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
	} else if (dataType === 'videos') {
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
	} else if (dataType === 'lists') {
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
				id: 'type',
				label: 'Type',
			},
			{
				id: 'genre',
				label: 'Genre',
			},
			{
				id: 'action',
				label: 'Action',
			},
		];
	}

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

	function EnhancedTableHead(props) {
		const {
			onSelectAllClick,
			order,
			orderBy,
			numSelected,
			rowCount,
			onRequestSort,
		} = props;
		const createSortHandler = (property) => (event) => {
			onRequestSort(event, property);
		};

		return (
			<TableHead>
				<TableRow>
					<TableCell padding='checkbox'>
						<Checkbox
							className='checkbox'
							color='primary'
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': `select all ${dataType}`,
							}}
						/>
					</TableCell>
					{headCells.map((headCell) => (
						<TableCell
							key={headCell.id}
							align={headCell.id === 'action' ? 'center' : 'inherit'}
							sortDirection={orderBy === headCell.id ? order : false}
							className='table-cell'
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
								className='table-cell'
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

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = dataSet?.map((n) => n._id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSet?.length) : 0;

	const handleDelete = (id) => {
		if (dataType === 'subs') {
			dispatch(deleteSub(id));
		} else if (dataType === 'videos') {
			dispatch(deleteVideo(id));
		}
	};

	useEffect(() => {
		if (dataType === 'subs') {
			setDataSet(subs);
		} else if (dataType === 'videos') {
			setDataSet(videos);
		} else if (dataType === 'lists') {
			setDataSet(lists);
		}
	}, [dataType, subs, videos, lists]);

	console.log(lists);

	return (
		<div className='data-table'>
			<div className='top'>
				<h2 className='title'>{title}</h2>
				<Link
					to={
						dataType === 'subs'
							? '/subs/new'
							: dataType === 'videos'
							? '/videos/new'
							: dataType === 'lists'
							? '/lists/new'
							: null
					}
					className='link'
				>
					Add New
				</Link>
			</div>
			<div className='bottom'>
				{dataSet && (
					<Box sx={{ width: '100%' }}>
						<Paper sx={{ width: '100%', mb: 2 }}>
							<TableContainer className='table'>
								<Table sx={{ minWidth: 750 }}>
									<EnhancedTableHead
										numSelected={selected.length}
										order={order}
										orderBy={orderBy}
										onSelectAllClick={handleSelectAllClick}
										onRequestSort={handleRequestSort}
										rowCount={dataSet?.length}
									/>
									<TableBody>
										{stableSort(dataSet, getComparator(order, orderBy))
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((data, index) => {
												const isItemSelected = isSelected(data?._id);
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
													<TableRow
														hover
														onClick={(event) => handleClick(event, data?._id)}
														role='checkbox'
														tabIndex={-1}
														key={data?._id}
														selected={isItemSelected}
													>
														<TableCell
															padding='checkbox'
															className='table-cell'
														>
															<Checkbox
																color='primary'
																checked={isItemSelected}
																className='checkbox'
															/>
														</TableCell>
														<TableCell
															component={'th'}
															id={labelId}
															scope='row'
															className='table-cell'
														>
															{data?._id}
														</TableCell>
														<TableCell className='table-cell'>
															{dataType === 'lists' ? (
																data?.title
															) : (
																<div className='cell-wrapper'>
																	<img
																		src={
																			dataType === 'subs'
																				? data?.profilePhoto ||
																				  '/profile_avatar.jpg'
																				: dataType === 'videos'
																				? data?.img
																				: '/no-image-alt.jpg'
																		}
																		alt=''
																		className='image'
																	/>
																	{dataType === 'subs'
																		? data?.username
																		: dataType === 'videos'
																		? data?.title
																		: null}
																</div>
															)}
														</TableCell>
														<TableCell className='table-cell'>
															{dataType === 'subs'
																? data?.email
																: dataType === 'videos'
																? data?.genre
																: dataType === 'lists'
																? data?.type
																: null}
														</TableCell>
														<TableCell className='table-cell'>
															{dataType === 'subs'
																? data?.isAdmin?.toString()
																: dataType === 'videos'
																? data?.year
																: dataType === 'lists'
																? data?.genre
																: null}
														</TableCell>
														{dataType === 'lists' ? null : (
															<TableCell className='table-cell'>
																{dataType === 'subs' ? (
																	data?.createdAt
																) : dataType === 'videos' ? (
																	<span className={`rating ${data?.rating}`}>
																		{data?.rating}
																	</span>
																) : null}
															</TableCell>
														)}
														{dataType === 'videos' ? (
															<TableCell className='table-cell'>
																{data?.isSeries?.toString()}
															</TableCell>
														) : null}
														<TableCell className='table-cell'>
															<div className='cell-action'>
																<Link
																	to={
																		dataType === 'subs'
																			? `/subs/${data?._id}`
																			: dataType === 'videos'
																			? `/videos/${data?._id}`
																			: dataType === 'lists'
																			? `/lists/${data?._id}`
																			: null
																	}
																	state={{ data }}
																	style={{ textDecoration: 'none' }}
																	onClick={
																		dataType === 'videos'
																			? () => dispatch(getVideo(data?._id))
																			: dataType === 'subs'
																			? () => dispatch(getSub(data?._id))
																			: null
																	}
																>
																	<EditIcon className='edit-btn' />
																</Link>
																<DeleteForeverIcon
																	className='delete-btn'
																	onClick={() => handleDelete(data?._id)}
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
								count={dataSet?.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								className='pagination'
							/>
						</Paper>
					</Box>
				)}
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		subs: store.sub.subs,
		videos: store.video.videos,
		lists: store.list.lists,
	};
}

export default connect(mapStoreToProps)(DataTable);
