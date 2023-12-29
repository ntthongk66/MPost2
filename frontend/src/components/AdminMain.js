import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getAllDepartments } from '../state/actions/departmentAction'
import { getAllDeliveryAgents } from '../state/actions/deliveryAgentAction'
import Departments from './views/admin/Department'
import DeliveryAgents from './views/admin/DeliveryAgent'
import AdminSidebar from './AdminSidebar'
function AdminMain() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	useEffect(() => {
		// dispatch(getDepartmentInfo(state.auth.accessToken))
		// dispatch(getAllCouriersWh(state.auth.accessToken))
		dispatch(getAllDepartments(state.auth.accessToken))
		dispatch(getAllDeliveryAgents(state.auth.accessToken))
	}, [state.auth.accessToken])

	return (
		<>{state.auth.admin == null ? (
			<>LOADING...</>
		) : (
			<div className='app'>
				<AdminSidebar />
				<main className='content'>
					<Routes>
						<Route exact path='/admin/departments' element={<Departments />} />
						<Route exact path='/admin/deliveryAgents' element={<DeliveryAgents />} />
						{/* <Route exact path='/deliver' element={<Deliver />} />
						<Route exact path='/staffWH' element={<Staffs />} />
						<Route exact path='/dashboardWh' element={<Dashboard />} />

						<Route exact path='/courierWaiting' element={<CouriersWaiting />} />
						<Route exact path='/courierAccepted' element={<CouriersAccepted />} /> */}
						<Route path='*' element={<Navigate to='/admin/departments' replace />} />
					</Routes>
				</main>
			</div>
		)}
		</>
	)
}

export default AdminMain