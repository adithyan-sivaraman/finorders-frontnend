import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faList, faPersonCirclePlus, faSquarePlus, faTachometer, faUserPlus, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Menu = () => {
  const userType = JSON.parse(localStorage.getItem("orders_user")).type;
  
  return (

    <div className='side-menu box-shadow'>
      

      <div className='flex flex-col grow '>
        <div className='flex flex-col px-2 gap-5 py-4'>
          <p className='text-xs md:text-sm lg:text-base font-bold uppercase'>Orders</p>

          <Link to="/dashboard" className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faTachometer} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>Dashboard</span>
          </Link>

          <Link to="/addorder" className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faSquarePlus} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>Add Order</span>
          </Link>

          <Link to="/listorder"
            className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faList} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>List Orders</span>
          </Link>

      
        </div>

        <Divider borderColor="red" />

        <div className='flex flex-col px-2 gap-5 py-4'>
          <p className='text-xs md:text-sm lg:text-base font-bold uppercase'>Customers</p>

          <Link to="/addcust" className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faPersonCirclePlus} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>Add Customer</span>
          </Link>

          <Link to="/listcust" className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faList} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>List Customers</span>
          </Link>
        </div>

        <Divider borderColor="red" />
        {userType==="admin" && (
          <div className='flex flex-col px-2 gap-5 py-4'>
          <p className='text-xs md:text-sm lg:text-base font-bold uppercase'>Adminstration</p>

          <Link to="/adduser" className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faUserPlus} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>Add User</span>
          </Link>

          <Link to="/listuser" className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faUsersViewfinder} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>List Users</span>
          </Link>

          {/* 
        <Link className='flex items-center cursor-pointer py-0.5'>
            <FontAwesomeIcon icon={faGear} className='w-12 text-lg lg:text-2xl' />
            <span className='text-xs md:text-sm lg:text-base tracking-wider uppercase'>Add Service</span>
          </Link>
        */}
        </div>
        )}
        

      </div>
    </div>
  )
}

export default Menu
