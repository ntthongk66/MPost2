const express = require('express')
const route = express.Router()
const DepartmentController = require('../controllers/departmentController')
const CourierController = require('../controllers/courierController')
const DeliveryAgentController = require('../controllers/deliveryAgentController')
const StaffTransactionPointController = require('../controllers/staffTransactionPointController')
const StaffWarehouseController = require('../controllers/staffWarehouseController')
const AdminController = require('../controllers/adminController')

const {
  authorize,
  authorizeDeliveryAgent,
  authorizeStaffTransaction,
  authorizeAdmin,
} = require('../middleware/authorizationMiddleware')

route.get('/', (req, res) => {
  res.send('/api working')
})

//------------------ DEPARTMENT APIS -------------------------------//
route.post('/departments/addDepartment', DepartmentController.addDepartment)
route.post('/departments/loginDepartment', DepartmentController.loginDepartment)
route.get(
  '/departments/getDepartmentInfo',
  authorize,
  DepartmentController.getDepartmentProfile
)
route.patch(
  '/departments/updateDepartmentInfo',
  authorize,
  DepartmentController.updateDepartmentProfile
)

route.post('/departments/addStaff', authorize,DepartmentController.addStaffTransactionPoint)

route.patch('/departments/updateStaffInfo', authorize, DepartmentController.updateStaffProfile)

route.delete('/departments/deleteStaffTransactionPoint', authorize, DepartmentController.deleteStaffTransactionPoint)

//------------------- COURIER APIS ------------------------------//
route.post('/couriers/addCourier', authorize, CourierController.addCourierEntry)
route.get('/couriers/getCouriers', authorize, CourierController.getAllCouriers)
route.get('/couriers/getCouriers/:id', CourierController.getCourierById)
route.post('/couriers/track', CourierController.getTrackingDetails)
route.patch(
  '/couriers/updateCourier',
  authorize,
  CourierController.updateCourierEntry
)
route.get('/couriers/getCouriersWh', authorizeDeliveryAgent, CourierController.getAllCouriersWh)

route.patch(
  '/couriers/updateCourierWh',
  authorizeDeliveryAgent,
  CourierController.updateCourierEntryWh
)

route.delete('/couriers/deleteCourier', authorizeDeliveryAgent, CourierController.deleteCourier)

//----------------- DELIVERY AGENT APIS -------------------------//
route.post(
  '/deliveryAgents/loginDeliveryAgent',
  DeliveryAgentController.loginDeliveryAgent
)
route.post(
  '/deliveryAgents/addEntry',
  authorizeDeliveryAgent,
  DeliveryAgentController.addEntryDeliveryAgent
)
route.post(
  '/deliveryAgents/markCourierAsDelivered',
  authorizeDeliveryAgent,
  DeliveryAgentController.markDeliveredByDeliveryAgent
)
route.post('/deliveryAgents/addStaff', authorizeDeliveryAgent, DeliveryAgentController.addStaffWarehouse)

route.patch('/deliveryAgents/updateStaffInfo', authorizeDeliveryAgent, DeliveryAgentController.updateStaffProfile)

route.delete('/deliveryAgents/deleteStaffWarehouse', authorizeDeliveryAgent, DeliveryAgentController.deleteStaffWarehouse)

//--------------------STAFF TRANSACTION---------------//
route.post('/staffTransactions/loginStaffTransaction', StaffTransactionPointController.loginStaffTransaction)

route.get('/staffTransactions/getStaffs', authorize,StaffTransactionPointController.getAllStaffs)


//----------------------STAFF WAREHOUSE---------------//

route.get('/staffWarehouses/getStaffs', authorizeDeliveryAgent, StaffWarehouseController.getAllStaffs)

route.post('/staffWarehouses/loginStaffWarehouse', StaffWarehouseController.loginStaffWarehouse)

//-----------------------ADMIN-------------//

route.post('/admin/loginAdmin', AdminController.loginAdmin)
route.get('/admin/getDepartments', authorizeAdmin,AdminController.getAllDepartment)

route.delete('/admin/deleteDepartment', authorizeAdmin, AdminController.deleteDepartment)

route.patch('/admin/updateDepartments', authorizeAdmin, AdminController.updateDepartmentProfile)

route.post('/admin/addDepartment', authorizeAdmin, AdminController.addDepartment)

route.get('/admin/getDeliveryAgents', authorizeAdmin,AdminController.getAllDeliveryAgent)

route.delete('/admin/deleteDeliveryAgent', authorizeAdmin, AdminController.deleteDeliveryAgent)

route.patch('/admin/updateDeliveryAgents', authorizeAdmin, AdminController.updateDeliveryAgentProfile)

route.post('/admin/addDeliveryAgent', authorizeAdmin, AdminController.addDeliveryAgent)

module.exports = route
