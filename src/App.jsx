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
import PageNotFound from './Components/NotFound'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' Component={UserLogin} />
        <Route path='/reset' Component={ResetPassword} />
        <Route path='*' Component={PageNotFound} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />

        <Route path='customer'>
          <Route path='add' element={<ProtectedRoute element={<AddCustomer />} />} />
          <Route path='list' element={<ProtectedRoute element={<ListCustomer />} />} />
        </Route>

        <Route path='order'>
          <Route path='add' element={<ProtectedRoute element={<AddOrder />} />} />
          <Route path='list' element={<ProtectedRoute element={<ListOrder />} />} />
        </Route>

        <Route path='user'>
          <Route path='add' element={<ProtectedRoute element={<AddUser />} />} />
          <Route path='list' element={<ProtectedRoute element={<ListUser />} />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
