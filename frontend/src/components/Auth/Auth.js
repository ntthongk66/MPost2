import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import SignUp from './SignUp'
// import './styles/auth.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box, Button, Grid } from '@mui/material'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Track from '../views/department/Track'
import LoginDeliveryAgent from './LoginDeliveryAgent'
import LoginStaffTransaction from './LoginStaff'
import LoginStaffWarehouse from './LoginStaffWh'
import LoginAdmin from './LoginAdmin'

const Auth = () => {
  const auth = useSelector((state) => state.auth)
  const [isLogin, setIsLogin] = useState(true)
  function changeAuthType(current) {
    setIsLogin(!current)
  }

  return (
    <div className='authRoot'>
      <Routes>
        <Route
          exact
          path='/auth'
          element={
            <Box>
              <Box display={'flex'} justifyContent='end' marginRight={3}>
                <Link to='/auth/deliveryAgent'>
                  <Button
                    variant='contained'
                    sx={{
                      mt: 1,
                      borderRadius: '20px',
                      color: 'white',
                      backgroundColor: 'black',
                    }}
                  >
                    I'm a warehouse management
                  </Button>
                </Link>
                
                <Link to="/auth/staffTransaction" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 1,   // Đổi mt từ 2 xuống 1 để giữ nút "Track Courier" ngay dưới
                      ml: 3,   // Thêm khoảng cách giữa các nút
                      borderRadius: '20px',
                      color: 'white',
                      backgroundColor: 'black',
                    }}
                  >
                    Staff
                  </Button>
                </Link>
                <Link to="/track/courier" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 1,   // Đổi mt từ 2 xuống 1 để giữ nút "Track Courier" ngay dưới
                      ml: 3,   // Thêm khoảng cách giữa các nút
                      borderRadius: '20px',
                      color: 'white',
                      backgroundColor: 'black',
                    }}
                  >
                    Track Courier
                  </Button>
                </Link>
              </Box>
              <Grid container>
                {/* Login or Signup */}
                <Grid item xs={6} marginTop={5}>
                  <Box id='authForm'>
                    {isLogin ? (
                      <Login handleAuthToggle={changeAuthType} />
                    ) : (
                      <SignUp handleAuthToggle={changeAuthType} />
                    )}
                    {auth.accessToken === null && auth.error != null && (
                      <ToastContainer autoClose={5000} />
                    )}
                  </Box>
                </Grid>
                {/* Intro Landing */}
                <Grid item xs={6}>
                  <img
                    src="https://png.pngtree.com/png-clipart/20211128/original/pngtree-courier-logo-png-image_6952321.png"
                    alt='MagicPost'
                    width='500' height='500'
                  />
                </Grid>
              </Grid>
            </Box>
          }
        ></Route>
        <Route
          exact
          path='/auth/deliveryAgent'
          element={<LoginDeliveryAgent />}
        />
        <Route exact path='/track/courier' element={<Track />} />

        <Route exact path='auth/staffTransaction' element={<LoginStaffTransaction/>}/>
        <Route exact path='auth/staffWarehouse' element={<LoginStaffWarehouse/>}/>
        <Route exact path='auth/admin' element={<LoginAdmin/>}/>

        <Route path='*' element={<Navigate to='/auth' replace />} />
      </Routes>
    </div>
  )
}

export default Auth
