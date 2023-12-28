import { combineReducers } from 'redux'
import authReducer from './authReducer'
import courierReducer from './courierReducer'
import staffTransactionReducer from './staffTransactionReducer'
import staffWarehouseReducer from './staffWarehouseReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  courier: courierReducer,
  staff: staffTransactionReducer,
  staffWH: staffWarehouseReducer,
})

export default rootReducer
