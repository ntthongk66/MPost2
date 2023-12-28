import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import StaffSidebar from './StaffSidebar'
import CouriersWaiting from './views/staffWarehouse/Waiting'
// import Dashboard from './views/staffTransaction/Dashboard'
// import Couriers from './views/staffTransaction/Couriers'
// import Track from './views/staffTransaction/Track'
import { getAllCouriersWh } from '../state/actions/courierActions'
import CouriersAccepted from './views/staffWarehouse/Accepted'

function StaffWarehouseMain() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	useEffect(() => {
		// dispatch(getDepartmentInfo(state.auth.accessToken))
		dispatch(getAllCouriersWh(state.auth.accessToken))
		// dispatch(getAllStaffs(state.auth.accessToken))
	}, [state.auth.accessToken])

	return (
		<>
			{state.auth.staffWarehouse == null ? (
				<>LOADING...</>
			) : (
				<div className='app'>
					<StaffSidebar />
					<main className='content'>
						<Routes>
							<Route exact path='staffWarehouse/waiting' element={<CouriersWaiting />} />
							<Route exact path='staffWarehouse/accepted' element={<CouriersAccepted />} />
							{/* <Route exact path='staffTransaction/couriers' element={<Couriers />} /> */}
							{/* <Route exact path='staffTransaction/track/courier' element={<Track />} /> */}
							{/* <Route exact path='/staffs' element={<Staffs />} /> */}
							<Route path='*' element={<Navigate to='staffWarehouse/waiting' replace />} />
						</Routes>
					</main>
				</div>
			)}
		</>
	)
}

export default StaffWarehouseMain