import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Dialog,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { apiHost } from '../apiLoc'

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

const NewStaffModal = (props) => {
  // pdfMake.vfs = pdfFonts.pdfMake.vfs

  const accessToken = useSelector((state) => state.auth.accessToken)
  const [value, setValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  // const createPdf = (data, refId) => {
  //   const pdfGenerator = pdfMake.createPdf({
  //     pageSize: 'A7',
  //     header: [
  //       {
  //         text: 'Courier TnM',
  //         margin: 5,
  //         fontSize: '10',
  //         bold: true,
  //         alignment: 'center',
  //       },
  //     ],
  //     content: [
  //       {
  //         text: 'Receiver Details',
  //         fontSize: '7',
  //         bold: true,
  //         decoration: 'underline',
  //       },
  //       {
  //         text: `Name: ${data.receiverDetails.name}\nPhone: ${data.receiverDetails.phoneNumber}\nEmail: ${data.receiverDetails.email}\nAddress: ${data.receiverDetails.location}, ${data.receiverDetails.city}, ${data.receiverDetails.state}, ${data.receiverDetails.country}, ${data.receiverDetails.pincode}`,
  //         fontSize: '5',
  //         marginTop: 2,
  //       },
  //       {
  //         text: 'Sender Details',
  //         fontSize: '7',
  //         bold: true,
  //         decoration: 'underline',
  //         marginTop: 5,
  //       },
  //       {
  //         text: `Name: ${data.senderDetails.name}\nPhone: ${data.senderDetails.phoneNumber}\nEmail: ${data.senderDetails.email}\nAddress: ${data.senderDetails.location}, ${data.senderDetails.city}, ${data.senderDetails.state}, ${data.senderDetails.country}, ${data.senderDetails.pincode}`,
  //         fontSize: '5',
  //         marginTop: 2,
  //       },
  //       {
  //         text: 'Package Details',
  //         fontSize: '7',
  //         bold: true,
  //         decoration: 'underline',
  //         marginTop: 5,
  //       },
  //       {
  //         text: `Reference ID: ${refId}\nItem Description: ${data.courierDetails.packageName}\nWeight: ${data.courierDetails.packageWeight}`,
  //         fontSize: '5',
  //         bold: true,
  //         marginTop: 5,
  //       },
  //     ],
  //   })
  //   var win = window.open('', '_blank')
  //   pdfGenerator.print({}, win)
  // }

  const handleNewStaffFormSubmit = async (formData) => {
    const data = {
      // receiverDetails: {
      //   name: formData.receiverName,
      //   phoneNumber: formData.receiverPhone,
      //   email: formData.receiverEmail,
      //   location: formData.receiverLocation,
      //   city: formData.receiverCity,
      //   state: formData.receiverState,
      //   country: formData.receiverCountry,
      //   pincode: formData.receiverPinCode,
      // },
      // senderDetails: {
      //   name: formData.senderName,
      //   phoneNumber: formData.senderPhone,
      //   email: formData.senderEmail,
      //   location: formData.senderLocation,
      //   city: formData.senderCity,
      //   state: formData.senderState,
      //   country: formData.senderCountry,
      //   pincode: formData.senderPinCode,
      // },
      staffDetails: {

        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        departmentPinCode: formData.departmentPinCode,
        password: formData.password
      },
    }
    try {
      const url = `${apiHost}/api/departments/addStaff`
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const staffEntryResponse = await response.json()

      if (response.status === 204 || response.status === 201) {
        // createPdf(data, staffEntryResponse.data._id)
        toast.success('Entry Successful', {
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
        toast.error(staffEntryResponse.message, {
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

  const handleStaffEntryFormSubmit = async (formData) => {
    const data = {
      staffDetails: {
        _id: formData._id,
      },
    }
    try {
      const url = `${apiHost}/api/departments/addStaff`
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const staffEntryResponse = await response.json()

      response.status === 204 || response.status === 201
        ? toast.success('Entry Successful', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        : toast.error(staffEntryResponse.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
    } catch (error) {
      console.log(error)
    }
    props.handleModalClose()
  }

  const initValues = {
    // receiverName: '',
    // receiverEmail: '',
    // receiverPhone: '',
    // receiverLocation: '',
    // receiverCountry: '',
    // receiverState: '',
    // receiverCity: '',
    // receiverPinCode: '',

    // senderName: '',
    // senderEmail: '',
    // senderPhone: '',
    // senderLocation: '',
    // senderCountry: '',
    // senderState: '',
    // senderCity: '',
    // senderPinCode: '',

    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    departmentPinCode: '',

  }

  const phoneRegExp = /^[0-9]\d{9}$/

  const brandNewStaffSchema = yup.object().shape({
    // receiverName: yup.string().required('required'),
    // receiverEmail: yup.string().email('invalid email').required('required'),
    // receiverPhone: yup
    //   .string()
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .required('required'),
    // receiverLocation: yup.string().required('required'),
    // receiverCountry: yup.string().required('required'),
    // receiverState: yup.string().required('required'),
    // receiverCity: yup.string().required('required'),
    // receiverPinCode: yup.number().required('required'),

    // senderName: yup.string().required('required'),
    // senderEmail: yup.string().email('invalid email').required('required'),
    // senderPhone: yup
    //   .string()
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .required('required'),
    // senderLocation: yup.string().required('required'),
    // senderCountry: yup.string().required('required'),
    // senderState: yup.string().required('required'),
    // senderCity: yup.string().required('required'),
    // senderPinCode: yup.number().required('required'),

    name: yup.string().required('required'),
    password: yup.string().required('required'),
    email: yup.string().required('required'),
    departmentPinCode: yup.number().required('required'),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, 'Phone Number is not valid'),
  })

  // const staffEntrySchema = yup.object().shape({
  //   _id: yup.string().required('required'),
  // })

  return (
    <div>
      <Dialog open={props.modalOpen} onClose={props.handleModalClose}>
        <DialogTitle>Add Staff (Transaction staff)</DialogTitle>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange} centered>
              {/* <Tab
                label='mark courier entry'
                {...additionalTabWiseAttributes(0)}
              /> */}
              <Tab
                label='Add new Staff'
                {...additionalTabWiseAttributes(0)}
              />
            </Tabs>
          </Box>

          {/* <TabPanel value={value} index={0}>
            {/* Entry of a courier form 
            <Formik
              initialValues={{ _id: '' }}
              onSubmit={handleStaffEntryFormSubmit}
              validationSchema={staffEntrySchema}
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
                      label='Reference ID'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='_id'
                      value={values._id}
                      error={!!touched._id && !!errors._id}
                      helperText={touched._id && errors._id}
                      sx={{ gridColumn: 'span 4' }}
                    />
                  </Box>

                  <Box display='flex' justifyContent='end' mt='20px'>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        borderRadius: '20px',
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </TabPanel> */}

          <TabPanel value={value} index={0}>
            {/* New Courier Form */}
            <Formik
              initialValues={initValues}
              onSubmit={handleNewStaffFormSubmit}
              validationSchema={brandNewStaffSchema}
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
                  <Typography sx={{ backgroundColor: 'yellow' }}>
                    Staff Details
                  </Typography>
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
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Email'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='email'
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: 'span 2' }}
                    />
                  </Box>

                  {/* <Typography sx={{ backgroundColor: 'yellow' }} mt={2}>
                    Receiver's Details
                  </Typography> */}
                  <Box
                    display='grid'
                    gap='30px'
                    gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  >
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Phone Number'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='phoneNumber'
                      value={values.phoneNumber}
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Department PinCode'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='departmentPinCode'
                      value={values.departmentPinCode}
                      error={!!touched.departmentPinCode && !!errors.departmentPinCode}
                      helperText={touched.departmentPinCode && errors.departmentPinCode}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='password'
                      value={values.password}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    {/* <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Address'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverLocation'
                      value={values.receiverLocation}
                      error={
                        !!touched.receiverLocation && !!errors.receiverLocation
                      }
                      helperText={
                        touched.receiverLocation && errors.receiverLocation
                      }
                      sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Country'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverCountry'
                      value={values.receiverCountry}
                      error={
                        !!touched.receiverCountry && !!errors.receiverCountry
                      }
                      helperText={
                        touched.receiverCountry && errors.receiverCountry
                      }
                      sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='State'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverState'
                      value={values.receiverState}
                      error={!!touched.receiverState && !!errors.receiverState}
                      helperText={touched.receiverState && errors.receiverState}
                      sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='City'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverCity'
                      value={values.receiverCity}
                      error={!!touched.receiverCity && !!errors.receiverCity}
                      helperText={touched.receiverCity && errors.receiverCity}
                      sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Pincode'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='receiverPinCode'
                      value={values.receiverPinCode}
                      error={
                        !!touched.receiverPinCode && !!errors.receiverPinCode
                      }
                      helperText={
                        touched.receiverPinCode && errors.receiverPinCode
                      }
                      sx={{ gridColumn: 'span 1' }}
                    /> */}
                  </Box>
                  {/* <Typography sx={{ backgroundColor: 'yellow' }} mt={2}>
                    Sender's Details
                  </Typography>
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
                      name='senderName'
                      value={values.senderName}
                      error={!!touched.senderName && !!errors.senderName}
                      helperText={touched.senderName && errors.senderName}
                      sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Phone'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderPhone'
                      value={values.senderPhone}
                      error={!!touched.senderPhone && !!errors.senderPhone}
                      helperText={touched.senderPhone && errors.senderPhone}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Email'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderEmail'
                      value={values.senderEmail}
                      error={!!touched.senderEmail && !!errors.senderEmail}
                      helperText={touched.senderEmail && errors.senderEmail}
                      sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Address'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderLocation'
                      value={values.senderLocation}
                      error={
                        !!touched.senderLocation && !!errors.senderLocation
                      }
                      helperText={
                        touched.senderLocation && errors.senderLocation
                      }
                      sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Country'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderCountry'
                      value={values.senderCountry}
                      error={!!touched.senderCountry && !!errors.senderCountry}
                      helperText={touched.senderCountry && errors.senderCountry}
                      sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='State'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderState'
                      value={values.senderState}
                      error={!!touched.senderState && !!errors.senderState}
                      helperText={touched.senderState && errors.senderState}
                      sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='City'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderCity'
                      value={values.senderCity}
                      error={!!touched.senderCity && !!errors.senderCity}
                      helperText={touched.senderCity && errors.senderCity}
                      sx={{ gridColumn: 'span 1' }}
                    />
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      label='Pincode'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name='senderPinCode'
                      value={values.senderPinCode}
                      error={!!touched.senderPinCode && !!errors.senderPinCode}
                      helperText={touched.senderPinCode && errors.senderPinCode}
                      sx={{ gridColumn: 'span 1' }}
                    />
                  </Box> */}
                  <Box display='flex' justifyContent='end' mt='20px'>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        borderRadius: '20px',
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </TabPanel>
        </Box>
      </Dialog>
    </div>
  )
}

export default NewStaffModal