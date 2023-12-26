import Auth from './components/Auth/Auth'
import { useSelector } from 'react-redux'

import DepartmentMain from './components/DepartmentMain'
import DeliveryAgentMain from './components/DeliveryAgentMain'
import StaffTransactionMain from './components/StaffTransactionMain'

function App() {
  const state = useSelector((state) => state)

  return (
    <>
      {state.auth.accessToken == null ? (
        <Auth />
      ) : state.auth.deliveryAgent != null ? (
        <DeliveryAgentMain />
      ) : state.auth.staffTransaction != null ? (
        <StaffTransactionMain />
      ) : (
        <DepartmentMain />
      )}
    </>
  )
}

export default App
