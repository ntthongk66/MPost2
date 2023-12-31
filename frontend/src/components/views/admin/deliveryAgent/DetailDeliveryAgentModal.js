import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
	Button,
	Card,
	CardContent,
	Dialog,
	DialogTitle,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Tab,
	Tabs,
	TextField,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { apiHost } from '../../../../apiLoc'

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

function additionalTabWiseAttributes(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

function UserCard({ customer }) {
	return (
		<Card>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					Waiting Courier:
				</Typography>
				<Typography component='div'>1</Typography>
				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					Accepted Courier:
				</Typography>
				<Typography component='div'>1</Typography>
				
			</CardContent>
		</Card>
	)
}

const DeliveryAgentDetailModal = (props) => {
	const auth = useSelector((state) => state.auth)
	// var depId = null
	// if (auth.staffTransaction != null) {
	// 	depId = auth.staffTransaction.transactionPointId
	// } else {
	// 	depId = auth.department._id
	// }
	const [value, setValue] = useState(0)

	const handleTabChange = (event, newValue) => {
		setValue(newValue)
	}


	const initValues = {
		name: props.data && props.data.name,
		location: props.data && props.data.location,
		phoneNumber: props.data && props.data.phoneNumber,
		email: props.data && props.data.email,
		city: props.data && props.data.city,
		state: props.data && props.data.state,
		pinCode: props.data && props.data.pinCode,
		// status: props.data && props.data.status[`${depId}`],
	}

	const editDepartmentSchema = yup.object().shape({
		name: yup.string().required('required'),
		location: yup.string().required('required'),
		phoneNumber: yup.string().required('required'),
		email: yup.string().required('required'),
		city: yup.string().required('required'),
		state: yup.string().required('required'),
		pinCode: yup.number().required('required'),

	})

	const handleDepartmentUpdateFormSubmit = async (formData) => {
		const data = {
			departmentDetails: { ...formData, _id: props.data.id },
		}
		try {
			const url = `${apiHost}/api/admin/updateDeliveryAgents`
			const response = await fetch(url, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.accessToken}`,
				},
			})

			// const courierUpdateResponse = await response.json()

			if (response.status === 204) {
				toast.success('Updated Successfully', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				})
			} else {
				// toast.error('Something went wrong !', {
				// 	position: 'top-right',
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: 'light',
				// })
			}
		} catch (error) {
			console.log(error)
		}
		props.handleModalClose()
	}

	const handleDeleteDeliveryAgent = async () => {
		const data = {
			deliveryAgentDetails: { _id: props.data.id }
		}
		try {
			const url = `${apiHost}/api/admin/deleteDeliveryAgent`
			const response = await fetch(url, {
				method: 'delete',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.accessToken}`,
				},
			})

			// const courierUpdateResponse = await response.json()

			if (response.status === 201) {
				toast.success('Deleted Successfully', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				})
			} else {
				toast.error('Something went wrong !', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				})
			}
		} catch (error) {
			console.log(error)
		}
		props.handleModalClose()
	}

	return (
		<div>
			<Dialog open={props.modalOpen} onClose={props.handleModalClose}>
				<DialogTitle>Warehouse Details</DialogTitle>
				<Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={value} onChange={handleTabChange} centered>
							<Tab
								label='Warehouse Details'
								{...additionalTabWiseAttributes(0)}
							/>
							<Tab label='Statistic' {...additionalTabWiseAttributes(1)} />
							{/* <Tab
								label='Receiver Details'
								{...additionalTabWiseAttributes(2)}
							/> */}
						</Tabs>
					</Box>

					<TabPanel value={value} index={0}>
						<Box>
							<Paper elevation={2} sx={{ px: 2, py: 1 }}>
								<Typography
									sx={{ fontSize: 10 }}
									color='text.secondary'
									gutterBottom
								>
									Reference ID
								</Typography>
								<Typography component='div' sx={{ fontSize: 12 }}>
									{props.data && props.data.id}
								</Typography>
							</Paper>
							<Box mt={2}>
								<Formik
									initialValues={initValues}
									validationSchema={editDepartmentSchema}
									onSubmit={handleDepartmentUpdateFormSubmit}
								>
									{({
										values,
										errors,
										touched,
										handleBlur,
										handleChange,
										handleSubmit,
									}) => (
										<form onSubmit={handleSubmit}>
											<Box
												display='grid'
												gap='30px'
												gridTemplateColumns='repeat(4, minmax(0, 1fr))'
											>
												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='Name'
													onBlur={handleBlur}
													onChange={handleChange}
													name='name'
													value={values.name}
													error={!!touched.name && !!errors.name}
													helperText={touched.name && errors.name}
													sx={{ gridColumn: 'span 4' }}
												/>

											</Box>

											<Box
												display='grid'
												gap='30px'
												gridTemplateColumns='repeat(4, minmax(0, 1fr))'
												marginTop={1}
											>
												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='phoneNumber'
													onBlur={handleBlur}
													onChange={handleChange}
													name='phoneNumber'
													value={values.phoneNumber}
													error={!!touched.phoneNumber && !!errors.phoneNumber}
													helperText={touched.phoneNumber && errors.phoneNumber}
													sx={{ gridColumn: 'span 2' }}
												/>

												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='email'
													onBlur={handleBlur}
													onChange={handleChange}
													name='email'
													value={values.email}
													error={!!touched.email && !!errors.email}
													helperText={touched.email && errors.email}
													sx={{ gridColumn: 'span 2' }}
												/>
											</Box>
											<Box
												display='grid'
												gap='30px'
												gridTemplateColumns='repeat(4, minmax(0, 1fr))'
											>
												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='Location'
													onBlur={handleBlur}
													onChange={handleChange}
													name='location'
													value={values.location}
													error={!!touched.location && !!errors.location}
													helperText={touched.location && errors.location}
													sx={{ gridColumn: 'span 4' }}
												/>
											</Box>

											<Box
												display='grid'
												gap='30px'
												gridTemplateColumns='repeat(4, minmax(0, 1fr))'
												marginTop={1}
											>
												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='City'
													onBlur={handleBlur}
													onChange={handleChange}
													name='city'
													value={values.city}
													error={!!touched.city && !!errors.city}
													helperText={touched.city && errors.city}
													sx={{ gridColumn: 'span 2' }}
												/>

												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='State'
													onBlur={handleBlur}
													onChange={handleChange}
													name='state'
													value={values.state}
													error={!!touched.state && !!errors.state}
													helperText={touched.state && errors.state}
													sx={{ gridColumn: 'span 1' }}
												/>

												<TextField
													fullWidth
													variant='standard'
													type='text'
													label='PinCode'
													onBlur={handleBlur}
													onChange={handleChange}
													name='pinCode'
													value={values.pinCode}
													error={!!touched.pinCode && !!errors.pinCode}
													helperText={touched.pinCode && errors.pinCode}
													sx={{ gridColumn: 'span 1' }}
												/>
											</Box>

											<Box display='flex' justifyContent='end' mt='20px'>

												<Button
													type='text'
													variant='contained'
													onClick={handleDeleteDeliveryAgent}
													sx={{
														color: 'white',
														backgroundColor: 'black',
														borderRadius: '20px',
													}}
												>
													Delete
												</Button>

												<Button
													type='submit'
													variant='contained'
													sx={{
														color: 'white',
														backgroundColor: 'black',
														borderRadius: '20px',
													}}
												>
													Update
												</Button>
											</Box>
										</form>
									)}
								</Formik>
							</Box>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<UserCard customer={props.data} />
					</TabPanel>
					{/* <TabPanel value={value} index={2}>
						<UserCard customer={props.data && props.data.receiver} />
					</TabPanel> */}
				</Box>
			</Dialog>
		</div>
	)
}

export default DeliveryAgentDetailModal
