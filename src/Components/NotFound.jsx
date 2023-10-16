import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../assets/error404.jpeg'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';

const PageNotFound = () => {
    return <Navigate to="/dashboard"/>
}
export default PageNotFound;