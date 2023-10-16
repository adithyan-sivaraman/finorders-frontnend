import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
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
import { useEffect, useState } from 'react'
import Topbar from './Layout/Topbar'
function App() {


  const [topBar, setTopBar] = useState(false)
  
  const handleLogin = () => {
    setTopBar(true)
  }

  const handleLogout = () => {
    setTopBar(false)
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("orders_user"));
    if(user){
      setTopBar(true)
    }
    
  },[])

  return (
    <Router>
      <div className={topBar?'main':'main justify-center'}>
        {topBar && <Topbar onLogout={handleLogout} />}
        <div className={topBar?'flex overflow-x-hidden':'flex container'}> 
          <Routes>

            <Route path='/' element={<UserLogin onLogin={handleLogin}/>} />
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
        </div>
        </div>
    </Router>
  )
}

export default App
