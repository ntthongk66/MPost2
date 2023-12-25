import { combineReducers } from 'redux'
import authReducer from './authReducer'
import courierReducer from './courierReducer'
import staffTransactionReducer from './staffTransactionReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  courier: courierReducer,
  staff: staffTransactionReducer,
})

export default rootReducer
