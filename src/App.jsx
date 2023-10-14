import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddCustomer from './Components/Customer/AddCustomer'
import AddUser from './Components/User/AddUser'
import AddOrder from './Components/Orders/AddOrder'
import ProtectedRoute from './ProtectedRoutes'
import ListUser from './Components/User/ListUser'
import ListCustomer from './Components/Customer/ListCustomer'
import UserLogin from './Components/Authentication/Login'
import ResetPassword from './Components/Authentication/Reset'
import ListOrder from './Components/Orders/ListOrder'
import Dashboard from './Components/Dashboard/Dashboard'
 function App() {

  return (
    <Router>
    <Routes>
    <Route path='/' Component={UserLogin} />
    <Route path='/reset' Component={ResetPassword} />
    <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} /> 
    <Route path='/addcust' element={<ProtectedRoute element={<AddCustomer />} />} />
    <Route path='/listcust' element={<ProtectedRoute element={<ListCustomer />} />} />
    <Route path='/adduser' element={<ProtectedRoute element={<AddUser />} />} />
    <Route path='/listuser' element={<ProtectedRoute element={<ListUser />} />} /> 
    <Route path='/addorder' element={<ProtectedRoute element={<AddOrder />} />} />
    <Route path='/listorder' element={<ProtectedRoute element={<ListOrder />} />} />
    </Routes>
  </Router>
  )
}

export default App
