import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllStaffs } from '../../../state/actions/staffWarehouseAction'
import NewStaffModal from './staff/NewStaffModal'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { visuallyHidden } from '@mui/utils'
import { ToastContainer } from 'react-toastify'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-toastify/dist/ReactToastify.css'
import colors from '../../../colors'

import {
	Button,
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	TextField,
	InputAdornment,
	IconButton,
} from '@mui/material'
// import { search } from '../../../../../backend/routes/api'

import StaffDetailModal from './staff/StaffDetailModal'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

const headCells = [
	{
		id: 'referenceId',
		label: 'Reference ID',
	},
	{
		id: 'name',
		label: 'Name',
	},
	{
		id: 'email',
		label: 'Email',
	},
	{
		id: 'phoneNumber',
		label: 'Phone Number',
	},
	{
		id: 'password',
		label: 'Password',
	},
]

function ColumnHeads(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead sx={{ backgroundColor: colors.primary }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ fontWeight: 'bold' }}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

const getRowsList = (staffsList) => {
	const rowsList = []
	staffsList.map((staffWH) => { ////////
		const singleRow = {
			id: staffWH._id,
			name: staffWH.name,
			email: staffWH.email,
			password: staffWH.password,
			phoneNumber: staffWH.phoneNumber,
		}
		rowsList.push(singleRow)
	})
	return rowsList
}

const Staffs = () => {
	const state = useSelector((state) => state)
	const dispatch = useDispatch()

	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')
	const [selected, setSelected] = useState([])
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [newStaffModalOpen, setNewStaffModalOpen] = useState(false)
	const handleNewStaffModalOpen = () => setNewStaffModalOpen(true)
	const handleNewStaffModalClose = () => {
		setNewStaffModalOpen(false)
	}

	const [staffDetailModalOpen, setStaffDetailModalOpen] = useState(false)
	const handleStaffDetailModalOpen = () => setStaffDetailModalOpen(true)
	const handleStaffDetailModalClose = () => {
		setStaffDetailModalOpen(false)
	}

	const [singleClickedStaffData, setSingleClickedStaffData] = useState()

	useEffect(() => {
		dispatch(getAllStaffs(state.auth.accessToken))
	}, [newStaffModalOpen, staffDetailModalOpen])

	// ko bt dau nha, rat de sai
	const [staffRowsList, setCourierRowsList] = useState(getRowsList(state.staffWH.staffs))//////

	useEffect(() => {
		setCourierRowsList(getRowsList(state.staffWH.staffs))
	}, [state])


	const [rows, setRows] = useState(staffRowsList)
	useEffect(() => {
		setRows(staffRowsList)
	}, [staffRowsList])

	const refIdSearch = (event) => {
		const searchedId = event.target.value
		if (searchedId.length === 0) {
			setRows(staffRowsList)
			return
		}
		const newRows = staffRowsList.filter((staff) => {
			return staff.id === searchedId
		})
		setRows(newRows)
	}

	// email search

	// date search

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	return (
		<Box mx='20px' my='10px'>
			{/* Nav Bar for functionalities */}
			<Box mb='10px' sx={{ display: 'flex', alignItems: 'center' }}>
				<Box
					sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}
				>
					<Box>
						<TextField
							label='Reference ID'
							variant='standard'
							onChange={refIdSearch}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchOutlinedIcon />
									</InputAdornment>
								),
							}}
						/>
					</Box>
					{/* <Box>
            <TextField
              label='Email'
              variant='standard'
              onChange={emailIdSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box> */}
					{/* <Box>
            <TextField
              id='startDate'
              label='Start Date'
              type='date'
              variant='standard'
              onChange={dateSearch}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box>
            <TextField
              id='endDate'
              label='End Date'
              type='date'
              variant='standard'
              onChange={dateSearch}
              InputLabelProps={{ shrink: true }}
            />
          </Box> */}
				</Box>
				<Box>
					<Button
						variant='contained'
						endIcon={<AddOutlinedIcon />}
						sx={{
							color: 'white',
							backgroundColor: 'black',
							borderRadius: '20px',
						}}
						onClick={handleNewStaffModalOpen}
					>
						Add New
					</Button>
					<NewStaffModal
						modalOpen={newStaffModalOpen}
						handleModalClose={handleNewStaffModalClose}
					/>
				</Box>
			</Box>
			{/* Table Data for couriers */}
			<Paper sx={{ mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }}>
						<ColumnHeads
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									return (
										<TableRow hover key={row.id}>
											<TableCell
												sx={{ textDecoration: 'underline', cursor: 'pointer' }}
												onClick={() => {
													handleStaffDetailModalOpen()
													setSingleClickedStaffData(row)
												}}
											>
												{row.id}
											</TableCell>
											<TableCell>{row.name}</TableCell>
											<TableCell>{row.email}</TableCell>
											<TableCell>{row.phoneNumber}</TableCell>
											<TableCell>{row.password}</TableCell>
											{/* <TableCell>
                        {row.status[`${state.auth.department._id}`]}
                      </TableCell>
                      <TableCell>
                        <Moment format='DD/MM/YYYY hh:mm a'>
                          {row.updatedDate}
                        </Moment>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => createPdf(row)}>
                          <DescriptionOutlinedIcon />
                        </IconButton>
                      </TableCell> */}
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
				/>
			</Paper>

			<ToastContainer />
			<StaffDetailModal
				modalOpen={staffDetailModalOpen}
				handleModalClose={handleStaffDetailModalClose}
				data={singleClickedStaffData}
			/>
		</Box>
	)

}

export default Staffs