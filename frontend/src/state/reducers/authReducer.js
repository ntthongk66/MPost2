const initState = {
  error: null,
  accessToken: null,
  department: null,
  deliveryAgent: null,
  staffTransaction: null,
  staffWarehouse: null,
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_ERROR':
      return {
        ...state,
        error: 'Login Failed',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload,
        error: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }

    case 'DELIVERY_AGENT_LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        error: null,
        department: null,
        deliveryAgent: action.payload.deliveryAgent,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'STAFF_TRANSACTION_LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken, //.accesToken
        error: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: action.payload.staffTransaction,
        staffWarehouse: null,
      }
    case 'STAFF_WAREHOUSE_LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken, //.accesToken
        error: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: action.payload.staffWarehouse,
        
      }
    case 'DEPARTMENT_NOT_FOUND':
      return {
        ...state,
        error: 'No Department found with the given registration number',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'DELIVERYAGENT_NOT_FOUND':
      return {
        ...state,
        error: 'No Delivery agent found with the given email',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'STAFF_NOT_FOUND':
      return {
        ...state,
        error: 'No Staff found with the given email or password',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'STAFF_WAREHOUSE_NOT_FOUND':
      return {
        ...state,
        error: 'No Staff found with the given email or password',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }

    case 'INVALID_PASSWORD':
      return {
        ...state,
        error: 'Incorrect Password',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'REGISTER_REQUEST_ERROR':
      return {
        ...state,
        error: 'Login Failed',
        accessToken: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        accessToken: action.payload,
        error: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }

    case 'REGISTER_FAILURE':
      return {
        ...state,
        accessToken: null,
        error: action.payload.message,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'UNAUTHORIZED':
      return {
        ...state,
        error: 'Unauthorized',
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'INVALID_ACCESS_TOKEN':
      return {
        ...state,
        error: 'INVALID ACCESS TOKEN',
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'PROFILE_FETCH_SUCCESS':
      return {
        ...state,
        error: null,
        department: action.payload,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'PROFILE_FETCH_ERROR':
      return {
        ...state,
        error: action.payload,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }
    case 'PROFILE_UPDATE_SUCCESS':
      return {
        ...state,
        error: null,
        department: action.payload,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }

    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
        error: null,
        department: null,
        deliveryAgent: null,
        staffTransaction: null,
        staffWarehouse: null,
      }




    default:
      return state
  }
}

export default authReducer
