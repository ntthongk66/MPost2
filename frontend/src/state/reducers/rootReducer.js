import { combineReducers } from 'redux'
import authReducer from './authReducer'
import courierReducer from './courierReducer'
import staffTransactionReducer from './staffTransactionReducer'
import staffWarehouseReducer from './staffWarehouseReducer'
import departmentReducer from './departmentReducer'
import deliveryAgentsReducer from './deliveryAgentReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  courier: courierReducer,
  staff: staffTransactionReducer,
  staffWH: staffWarehouseReducer,
  department: departmentReducer,
  deliveryAgent: deliveryAgentsReducer,
})

export default rootReducer
