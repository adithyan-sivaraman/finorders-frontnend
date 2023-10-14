import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../assets/error404.jpeg'
import { faHome } from '@fortawesome/free-solid-svg-icons';

const PageNotFound = () => {
    return (

        <div className='flex flex-col lg:flex-row w-screen h-screen bg-white justify-center items-center select-none'>
            <p className="text-3xl font-bold px-2 text-gd fixed top-0 left-0">FinOrders</p>
            <a href='/' className='fixed top-0 right-0 text-3xl font-bold px-2'><FontAwesomeIcon icon={faHome} /></a>
            <p className='text-2xl font-bold h-1/2 flex items-center justify-center sm:h-auto w-full  sm:w-1/2 p-2'>Sorry the requested page was not Found!!</p>
            <img src={Error} alt='error' className='w-full sm:w-1/2 ' />
        </div>
    )
}
export default PageNotFound;