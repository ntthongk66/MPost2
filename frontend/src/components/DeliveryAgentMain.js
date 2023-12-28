import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import Deliver from './views/deliveryagent/Deliver'
import Dashboard from './views/deliveryagent/Dashboard'
import Pickup from './views/deliveryagent/Pickup'
import Staffs from './views/deliveryagent/staff'
import { getAllStaffs } from '../state/actions/staffWarehouseAction'
import { getAllCouriersWh } from '../state/actions/courierActions'
import CouriersWaiting from './views/deliveryagent/Waiting'
import CouriersAccepted from './views/deliveryagent/Accepted'


function DeliveryAgentMain() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    // dispatch(getDepartmentInfo(state.auth.accessToken))
    dispatch(getAllCouriersWh(state.auth.accessToken))
    dispatch(getAllStaffs(state.auth.accessToken))
  }, [state.auth.accessToken])

  return (
    <>{state.auth.deliveryAgent == null ? (
      <>LOADING...</>
    ) : (
      <div className='app'>
        <Sidebar />
        <main className='content'>
          <Routes>
            <Route exact path='/pickup' element={<Pickup />} />
            <Route exact path='/deliver' element={<Deliver />} />
            <Route exact path='/staffWH' element={<Staffs />} />
            <Route exact path='/dashboardWh' element={<Dashboard />} />

            <Route exact path='/courierWaiting' element={<CouriersWaiting />} />
            <Route exact path='/courierAccepted' element={<CouriersAccepted />} />
            <Route path='*' element={<Navigate to='/pickup' replace />} />
          </Routes>
        </main>
      </div>
      )}
    </>
  )
}

export default DeliveryAgentMain
