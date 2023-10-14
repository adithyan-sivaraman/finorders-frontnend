import Topbar from '../../Layout/Topbar';
import { apiEndpoint } from '../../ApiUtils/apiendpoint';
import { useEffect, useState } from 'react';
import EditCustomer from './EditCustomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react';

const ListCustomer = () => {
    const [userData, setuserData] = useState(false)
    const [filterData, setFilterData] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const fetchCustomers = async () => {
        setSpinner(true)
        const response = await fetch(`${apiEndpoint}/customer/list`);
        const data = await response.json();

        if (data) {
            setTimeout(() => {
                setSpinner(false)
                setuserData(data);
            }, 1500)
        }

    }
    const filterUser = (id) => {
        const data = userData.filter((item) => item.id === id)[0]
        setFilterData(data);
        setShowForm(true);
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const handleClose = () => {
        setShowForm(!showForm)
    }

    return (
        <div className="flex w-screen h-screen select-none font-lato">

            <div className='flex flex-col grow bg-white'>
                <Topbar />
                {showForm && <EditCustomer userData={filterData} onClose={handleClose} />}

                {spinner && (
                    <div className='p-2 h-full overflow-y-auto w-full items-center justify-center flex gap-5'>
                        <p className='text-lg font-bold loading'>Loading</p>
                        <Spinner
                            speed='0.7s'
                            thickness='4px'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </div>
                )}


                {!spinner && (<div className='p-2 h-full overflow-y-auto'>
                    <p className='py-2 text-lg lg:text-xl font-bold tracking-wider font-lato'>List of Customers</p>
                    <table className='w-full'>
                        <thead>
                            <tr >
                                <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Customer ID</th>
                                <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Customer Name</th>
                                <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Customer GST</th>
                                <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData && userData.map((item, index) => (
                                <tr

                                    key={index} className='hover:bg-blue-500 hover:text-white' >
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.id}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.custname}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.custgst.toUpperCase()}</td>
                                    <td className='border-b border-indigo-500  p-1 text-sm lg:text-base text-center'>
                                        <FontAwesomeIcon
                                            onClick={() => filterUser(item.id)}
                                            icon={faPenToSquare} className='px-2 cursor-pointer' title='click to edit user' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}

            </div>
        </div>
    )
};
export default ListCustomer;