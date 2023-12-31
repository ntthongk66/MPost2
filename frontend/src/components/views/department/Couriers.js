import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCouriers } from '../../../state/actions/courierActions'
import NewCourierModal from '../../NewCourierModal'
import Moment from 'react-moment'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { visuallyHidden } from '@mui/utils'
import { ToastContainer } from 'react-toastify'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import 'react-date-range/dist/styles.css'
import QRCode from 'qrcode.react';
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
import CourierDetailModal from '../../CourierDetailModal'

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
    id: 'item',
    label: 'Description',
  },
  {
    id: 'weight',
    label: 'Weight',
  },
  {
    id: 'sender',
    label: 'Sender',
  },
  {
    id: 'receiver',
    label: 'Receiver',
  },
  ,
  {
    id: 'status',
    label: 'Status',
  },
  ,
  {
    id: 'updatedDate',
    label: 'Updated Date',
  },
  {
    id: 'slip',
    label: 'Courier Slip',
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

const getRowsList = (couriersList) => {
  const rowsList = []
  couriersList.map((courier) => {
    const singleRow = {
      id: courier._id,
      item: courier.packageName,
      weight: courier.packageWeight,
      sender: courier.senderDetails,
      receiver: courier.receiverDetails,
      status: courier.departmentStatus,
      updatedDate: courier.updatedAt,
    }
    rowsList.push(singleRow)
  })
  return rowsList
}
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const createPdf = async (data) => {
  const getImageAsBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image as base64:', error);
      return null;
    }
  };

  const imageUrl = 'https://i.ibb.co/svJ55Td/Courier-Tn-M-removebg-preview.png';
  const QR = 'https://i.ibb.co/TYb0C5w/qrcode-localhost.png';
   // Đường dẫn hình ảnh
  const logo = await getImageAsBase64(imageUrl);
  const QRimage = await getImageAsBase64(QR);
  const pdfDefinition = {
    content: [
      {
        columns: [
          {
            image: logo, // Sử dụng base64 để chèn hình ảnh vào tài liệu PDF
            width: 150,
            margin: [10, 10],
            alignment: 'center',
          },
          {
          },
          {
            image: QRimage, // Sử dụng base64 để chèn hình ảnh vào tài liệu PDF
            width: 150,
            margin: [10, 10],
            alignment: 'center',
          },
        ]
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: 'Receiver Details', bold: true },
                  {
                    ul: [
                      { text: `Name: ${data.receiver.name}` },
                      { text: `Phone: ${data.receiver.phoneNumber}` },
                      { text: `Email: ${data.receiver.email}` },
                      { text: `Address: ${data.receiver.location}, ${data.receiver.city}, ${data.receiver.state}, ${data.receiver.country}, ${data.receiver.pincode}` },
                    ],
                  },
                ],
                margin: [0, 0, 0, 10],
              },
              {
                stack: [
                  { text: 'Sender Details', bold: true },
                  {
                    ul: [
                      { text: `Name: ${data.sender.name}` },
                      { text: `Phone: ${data.sender.phoneNumber}` },
                      { text: `Email: ${data.sender.email}` },
                      { text: `Address: ${data.sender.location}, ${data.sender.city}, ${data.sender.state}, ${data.sender.country}, ${data.sender.pincode}` },
                    ],
                  },
                ],
                margin: [0, 0, 0, 10],
              },
            ],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          body: [
            [
              {
                stack: [
                  { text: 'Package Details', bold: true },
                  {
                    ul: [
                      { text: `Reference ID: ${data.id}` },
                      { text: `Item Description: ${data.item}` },
                      { text: `Weight: ${data.weight}` },
                      { text: `Status: ${data.status}` },
                    ],
                  },
                ],
                margin: [0, 10, 0, 0],
              },
            ],
          ],
        },
      },
    ],
    pageSize: 'A4',
    pageOrientation: 'landscape',
    header: {
      columns: [
        {
          text: 'Magic Post',
          fontSize: 25,
          bold: true,
          italics: true,
          margin: [10, 10],
          alignment: 'center',
        },
        {
        },
        {
          text: 'QR code', // Thêm thông tin về mã QR code nếu cần thiết
          fontSize: 14,
          bold: true,
          margin: [10, 10, 10, 10],
          alignment: 'center',
        },
      ],
    },
  }

  const pdfDocument = pdfMake.createPdf(pdfDefinition);
  var win = window.open('','_blank');
  pdfDocument.open({}, win);
};

const Couriers = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('updatedDate')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [newCourierModalOpen, setNewCourierModalOpen] = useState(false)
  const handleNewCourierModalOpen = () => setNewCourierModalOpen(true)
  const handleNewCourierModalClose = () => {
    setNewCourierModalOpen(false)
  }

  const [courierDetailModalOpen, setCourierDetailModalOpen] = useState(false)
  const handleCourierDetailModalOpen = () => setCourierDetailModalOpen(true)
  const handleCourierDetailModalClose = () => {
    setCourierDetailModalOpen(false)
  }

  const [singleClickedCourierData, setSingleClickedCourierData] = useState()

  useEffect(() => {
    dispatch(getAllCouriers(state.auth.accessToken))
  }, [newCourierModalOpen, courierDetailModalOpen])

  const [courierRowsList, setCourierRowsList] = useState(getRowsList(state.courier.couriers))

  useEffect(() => {
    setCourierRowsList(getRowsList(state.courier.couriers))
  }, [state])

  const [rows, setRows] = useState(courierRowsList)
  useEffect(() => {
    setRows(courierRowsList)
  }, [courierRowsList])

  const refIdSearch = (event) => {
    const searchedId = event.target.value
    if (searchedId.length === 0) {
      setRows(courierRowsList)
      return
    }
    const newRows = courierRowsList.filter((courier) => {
      return courier.id === searchedId
    })
    setRows(newRows)
  }

  const emailIdSearch = (event) => {
    const searchedEmail = event.target.value
    if (searchedEmail.length === 0) {
      setRows(courierRowsList)
      return
    }
    const newRows = courierRowsList.filter((courier) => {
      return (
        courier.sender.email === searchedEmail ||
        courier.receiver.email === searchedEmail
      )
    })
    setRows(newRows)
  }
  const dateSearch = (event) => {
    const eventId = event.target.id
    var startDate, endDate
    if (eventId === 'startDate') {
      startDate = event.target.value
    } else {
      endDate = event.target.value
    }

    if (startDate && endDate) {
      const newRows = courierRowsList.filter((courier) => {
        const sDate = new Date(startDate)
        const eDate = new Date(endDate)
        const uDate = new Date(courier.updatedDate)

        return uDate >= sDate && uDate <= eDate
      })

      setRows(newRows)
    } else if (startDate && !endDate) {
      const newRows = courierRowsList.filter((courier) => {
        const sDate = new Date(startDate)
        const uDate = new Date(courier.updatedDate)
        return uDate >= sDate
      })

      setRows(newRows)
    } else if (endDate && !startDate) {
      const newRows = courierRowsList.filter((courier) => {
        const eDate = new Date(endDate)
        const uDate = new Date(courier.updatedDate)

        return uDate <= eDate
      })

      setRows(newRows)
    } else {
      setRows(courierRowsList)
    }
  }

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
          <Box>
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
          </Box>
          <Box>
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
          </Box>
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
            onClick={handleNewCourierModalOpen}
          >
            Add New
          </Button>
          <NewCourierModal
            modalOpen={newCourierModalOpen}
            handleModalClose={handleNewCourierModalClose}
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
                          handleCourierDetailModalOpen()
                          setSingleClickedCourierData(row)
                        }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>{row.item}</TableCell>
                      <TableCell>{row.weight}</TableCell>
                      <TableCell>{row.sender.name}</TableCell>
                      <TableCell>{row.receiver.name}</TableCell>
                      <TableCell>
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
                      </TableCell>
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
      <CourierDetailModal
        modalOpen={courierDetailModalOpen}
        handleModalClose={handleCourierDetailModalClose}
        data={singleClickedCourierData}
      />
    </Box>
  )
}

export default Couriers
