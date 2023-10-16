import { faArrowRightFromBracket, faBars, faCircleUser, faList, faPersonCirclePlus, faSquarePlus, faTachometer, faUserPlus, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link,useNavigate } from "react-router-dom"
import Menu from "./Menu";
import { useState } from "react";
import Profile from "../Components/User/Profile";
import { Divider } from "@chakra-ui/react";

function Topbar({onLogout}) {
  const userData = JSON.parse(localStorage.getItem('orders_user'))
  const username = userData?JSON.parse(localStorage.getItem('orders_user')).user:"";
  const userType = userData?JSON.parse(localStorage.getItem("orders_user")).type:"";
  const [menuVisible, setMenuVisible] = useState(false)
  const [profileForm, showProfileForm] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("orders_user")
    navigate('/');
    onLogout()
    
  }

  const handleClose = () => {
    showProfileForm(false)
  }

  return (
    <div className='header top-bar '>

      {menuVisible && (
            <div className='side-menu box-shadow'>


            <div className='flex flex-col grow '>
              <div className='flex flex-col px-2 gap-5 py-2'>
                <p className='text-xs md:text-sm font-bold uppercase'>Orders</p>
      
                <Link onClick={()=>{
                  setMenuVisible(false)
                }} to="/dashboard" className='flex items-center cursor-pointer py-0.5'>
                  <FontAwesomeIcon icon={faTachometer} className='w-12 text-lg lg:text-2xl' />
                  <span className='text-xs md:text-sm tracking-wider uppercase'>Dashboard</span>
                </Link>
      
                <Link onClick={()=>{
                  setMenuVisible(false)
                }} to="/order/add" className='flex items-center cursor-pointer py-0.5'>
                  <FontAwesomeIcon icon={faSquarePlus} className='w-12 text-lg lg:text-2xl' />
                  <span className='text-xs md:text-sm tracking-wider uppercase'>Add Order</span>
                </Link>
      
                <Link onClick={()=>{
                  setMenuVisible(false)
                }} to="/order/list"
                  className='flex items-center cursor-pointer py-0.5'>
                  <FontAwesomeIcon icon={faList} className='w-12 text-lg lg:text-2xl' />
                  <span className='text-xs md:text-sm tracking-wider uppercase'>List Orders</span>
                </Link>
      
      
              </div>
      
              <Divider borderColor="red" />
      
              <div className='flex flex-col px-2 gap-5 py-2'>
                <p className='text-xs md:text-sm font-bold uppercase'>Customers</p>
      
                <Link onClick={()=>{
                  setMenuVisible(false)
                }} to="/customer/add" className='flex items-center cursor-pointer py-0.5'>
                  <FontAwesomeIcon icon={faPersonCirclePlus} className='w-12 text-lg lg:text-2xl' />
                  <span className='text-xs md:text-sm tracking-wider uppercase'>Add Customer</span>
                </Link>
      
                <Link onClick={()=>{
                  setMenuVisible(false)
                }} to="/customer/list" className='flex items-center cursor-pointer py-0.5'>
                  <FontAwesomeIcon icon={faList} className='w-12 text-lg lg:text-2xl' />
                  <span className='text-xs md:text-sm tracking-wider uppercase'>List Customers</span>
                </Link>
              </div>
      
              <Divider borderColor="red" />
              {userType === "admin" && (
                <div className='flex flex-col px-2 gap-5 py-2'>
                  <p className='text-xs md:text-sm font-bold uppercase'>Adminstration</p>
      
                  <Link onClick={()=>{
                    setMenuVisible(false)
                  }} to="/user/add" className='flex items-center cursor-pointer py-0.5'>
                    <FontAwesomeIcon icon={faUserPlus} className='w-12 text-lg lg:text-2xl' />
                    <span className='text-xs md:text-sm tracking-wider uppercase'>Add User</span>
                  </Link>
      
                  <Link onClick={()=>{
                    setMenuVisible(false)
                  }} to="/user/list" className='flex items-center cursor-pointer py-0.5'>
                    <FontAwesomeIcon icon={faUsersViewfinder} className='w-12 text-lg lg:text-2xl' />
                    <span className='text-xs md:text-sm tracking-wider uppercase'>List Users</span>
                  </Link>
      
                  {/* 
              <Link onClick={()=>{
                setMenuVisible(false)
              }} className='flex items-center cursor-pointer py-0.5'>
                  <FontAwesomeIcon icon={faGear} className='w-12 text-lg lg:text-2xl' />
                  <span className='text-xs md:text-sm tracking-wider uppercase'>Add Service</span>
                </Link>
              */}
                </div>
              )}
      
      
            </div>
          </div>
      
      )}
      {profileForm && <Profile onClose={handleClose} />}

      <p className='text-sm md:text-lg lg:text-2xl font-bold w-1/4'>FinOrders</p>
      <p className="usertext"> Welcome {username}</p>

      <FontAwesomeIcon
        onClick={() => setMenuVisible(!menuVisible)}
        icon={faBars} className="usericon" />
      <FontAwesomeIcon
        onClick={() => {
          showProfileForm(true)
        }}
        icon={faCircleUser} className="usericon" />

      <FontAwesomeIcon
        onClick={handleLogout}
        icon={faArrowRightFromBracket} className="logout" />

    </div>
  )
}

export default Topbar
