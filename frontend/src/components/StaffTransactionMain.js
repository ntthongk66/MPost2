import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import StaffSidebar from './StaffSidebar'
import Dashboard from './views/staffTransaction/Dashboard'
import Couriers from './views/staffTransaction/Couriers'
import Track from './views/staffTransaction/Track'
import { getAllCouriers } from '../state/actions/courierActions'

function StaffTransactionMain() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	useEffect(() => {
		// dispatch(getDepartmentInfo(state.auth.accessToken))
		dispatch(getAllCouriers(state.auth.accessToken))
		// dispatch(getAllStaffs(state.auth.accessToken))
	}, [state.auth.accessToken])

	return (
		<>
			{state.auth.staffTransaction == null ? (
				<>LOADING...</>
			) : (
				<div className='app'>
					<StaffSidebar />
					<main className='content'>
						<Routes>
							<Route exact path='staffTransaction/dashboard' element={<Dashboard />} />
							{/* <Route exact path='/profile' element={<Profile />} /> */}
							<Route exact path='staffTransaction/couriers' element={<Couriers />} />
							<Route exact path='staffTransaction/track/courier' element={<Track />} />
							{/* <Route exact path='/staffs' element={<Staffs />} /> */}
							<Route path='*' element={<Navigate to='staffTransaction/dashboard' replace />} />
						</Routes>
					</main>
				</div>
			)}
		</>
	)
}

export default StaffTransactionMain