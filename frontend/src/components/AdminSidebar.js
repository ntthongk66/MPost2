import { useState } from 'react'
import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarContent,
	SidebarFooter,
} from 'react-pro-sidebar'
import { Box, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import HomeIcon from '@mui/icons-material/Home'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import PeopleAlt from '@mui/icons-material/PeopleAlt'
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useDispatch } from 'react-redux'
import { logout } from '../state/actions/authActions'
import colors from '../colors'
import '../styles/Sidebar.css'
import { useSelector } from 'react-redux'

const Item = ({ title, to, icon, selected, setSelected }) => {
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: 'black',
				backgroundColor: selected === title ? colors.active : 'transparent',
				fontWeight: 'bold',
				borderRadius: '5px',
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title.toUpperCase()}</Typography>
			<Link to={to} />
		</MenuItem>
	)
}

const Sidebar = () => {
	const department = useSelector((state) => state.auth.department)
	const admin = useSelector((state) => state.auth.admin)
	const currentLoc = useLocation().pathname.split('/')[1]

	const [selected, setSelected] = useState(
		currentLoc === 'auth'
			? admin == null
				? 'dashboard'
				: 'pickup'
			: currentLoc
	)

	const dispatch = useDispatch()

	return (
		<Box
			id='sidebar'
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary} !important`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
			}}
		>
			<ProSidebar collapsed={false}>
				<SidebarContent>
					<Menu iconShape='square'>
						<MenuItem
							style={{
								margin: '10px 0 20px 0',
								color: 'black',
							}}
						>
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Typography
									variant='h5'
									style={{ color: 'black', fontWeight: 'bold' }}
								>
									Magic Post
								</Typography>
								<img
									src="https://png.pngtree.com/png-clipart/20211128/original/pngtree-courier-logo-png-image_6952321.png"
									alt='MagicPost'
									height={75}
								/>
							</Box>
						</MenuItem>

						<Box mb='25px'>
							<Box textAlign='center'>
								<Typography
									variant='h5'
									fontWeight='bold'
									sx={{ m: '10px 0 0 0', color: 'black' }}
								>
									{admin ? admin.name : department.name}
								</Typography>
								<Typography>
									{admin
										? `Admin Email: ${admin.email}`
										: `Registration Number: ${department.registrationNumber}`}
								</Typography>
							</Box>
						</Box>
						{admin ? (
							<Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='Departments'
										to='/admin/departments'
										icon={<HomeWorkIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='Warehouses'
										to='/admin/deliveryAgents'
										icon={<WarehouseIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box> {/*
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='Dashboard'
										to='/dashboardWh'
										icon={<LocalShippingOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='Waiting'
										to='/courierWaiting'
										icon={<LocalShippingOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='Accepted'
										to='/courierAccepted'
										icon={<LocalShippingOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='Staff'
										to='/staffWH'
										icon={<PeopleAlt />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box> */}
							</Box>
						) : (
							<Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='dashboard'
										to='/dashboard'
										icon={<HomeIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>

								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='profile'
										to='/profile'
										icon={<ManageAccountsIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>

								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='couriers'
										to='/couriers'
										icon={<LocalShippingOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='track'
										to='/track/courier'
										icon={<ShareLocationOutlinedIcon />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
								<Box paddingLeft={'10%'} marginRight={2} marginTop={1}>
									<Item
										title='staff'
										to='/staffs'
										icon={<PeopleAlt />}
										selected={selected}
										setSelected={setSelected}
									/>
								</Box>
							</Box>
						)}
					</Menu>
				</SidebarContent>
				<SidebarFooter>
					<Menu iconShape='square'>
						<MenuItem
							active={selected === 'Logout'}
							onClick={() => dispatch(logout())}
							icon={
								<LogoutOutlinedIcon
									sx={{
										color: 'black',
									}}
								/>
							}
						>
							<Typography color={'black'}>{'Logout'}</Typography>
						</MenuItem>
					</Menu>
				</SidebarFooter>
			</ProSidebar>
		</Box>
	)
}

export default Sidebar
