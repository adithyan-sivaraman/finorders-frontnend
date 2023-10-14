/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = (localStorage.getItem('orders_user'));
  
  const navigate = useNavigate();
  if (!isAuthenticated) {
    
    setTimeout(() => {
    navigate('/')
    }, 2000)
    return (
      
      <dialog className="fixed top-0 z-50 bg-white flex flex-col px-4 py-2 rounded-md">
        <p className="text-lg font-bold text-black py-1">Alert!</p>
        <p className="py-1">Please login to use this page</p>
      </dialog>

    )

  }

  return (
    element
  );
};

export default ProtectedRoute;
