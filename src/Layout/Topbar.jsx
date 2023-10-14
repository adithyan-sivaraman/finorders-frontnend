import { faArrowRightFromBracket, faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import Menu from "./Menu";
import { useState } from "react";
import Profile from "../Components/User/Profile";

function Topbar() {
  const username = JSON.parse(localStorage.getItem('orders_user')).user;
  const [menuVisible, setMenuVisible] = useState(false)
  const [profileForm, showProfileForm] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("orders_user")
    navigate('/');
  }

  const handleClose = () => {
    showProfileForm(false)
  }

  return (
    <div className='header top-bar '>

      {menuVisible && <Menu />}
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
