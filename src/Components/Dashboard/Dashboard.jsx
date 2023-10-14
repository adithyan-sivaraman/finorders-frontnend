/* eslint-disable react-hooks/exhaustive-deps */
import Topbar from '../../Layout/Topbar';
import { apiEndpoint } from '../../ApiUtils/apiendpoint';
import { useEffect, useState } from 'react';
import OrderImage from '../../assets/order.jpeg'
import { Spinner } from '@chakra-ui/react';
import StatusChart from './StatusChart';
import OrderCountChart from './CountChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [orderData, setorderData] = useState(false)
    const [option, setOption] = useState('1')
    const [spinner, setSpinner] = useState(false)
    const user = JSON.parse(localStorage.getItem("orders_user")).user;
    const navigate = useNavigate()
    const fetchOrders = async () => {
        setSpinner(true)
        const response = await fetch(`${apiEndpoint}/orders/list`, {
            method: 'POST',
            body: JSON.stringify({ user: user }),
            headers: { "content-type": "application/json" }
        });
        const data = await response.json();

        if (data) {
            setTimeout(() => {
                setSpinner(false)
                setorderData(data);
            }, 1500)
        }

    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="flex w-screen h-screen select-none font-lato overflow-hidden">

            <div className='flex flex-col flex-1 bg-white overflow-x-hidden overflow-y-auto'>
                <Topbar />

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

                {!spinner && Object.values(orderData).length > 0 && (


                    <div className='p-2 h-full overflow-y-auto flex w-full '>
                        <div className=' w-full flex gap-4 px-4 py-2 flex-col lg:flex-row '>
                            <div className='flex flex-col gap-3 w-full  lg:w-1/2'>
                                <div className='flex flex-row'>
                                    <label htmlFor='select' className='text-sm lg:text-base font-bold px-2 py-1 rounded-md bg-gray-200'>Select an option</label>
                                    <select
                                        onChange={(e) => {
                                            setOption(e.target.value)
                                        }}
                                        id='select' name='select' className='border-2 border-indigo-900 text-blue-500 text-sm lg:text-base'>
                                        <option value="1">Current Month</option>
                                        <option value="2">Last Month</option>
                                        <option value="3">Last 3 Months</option>

                                    </select>

                                </div>
                                {orderData && <OrderCountChart data={orderData} option={option} className />}
                            </div>
                            <div className='w-full  lg:w-1/2 flex flex-col  items-center p-2'>
                                {/*
                    <p className='text-base lg:text-lg font-poppins tracking-wider font-bold'>Order Status</p>
                    */}
                                {orderData && <StatusChart data={orderData} />}

                            </div>
                        </div>
                    </div>)}
                {!spinner && Object.values(orderData).length == 0 && (
                    <div className='p-2 h-full overflow-y-auto flex flex-col w-full items-center justify-center select-none'>
                        <img src={OrderImage} alt='order' width={500} height={500} />
                        <p className="text-lg lg:text-xl  font-poppins font-bold py-2">You are yet to make a first order</p>
                        <p className="text-lg font-poppins py-2">Click <FontAwesomeIcon
                            onClick={() => navigate("/order/add")}
                            icon={faPlus} className='cursor-pointer text-xl' /> to create an order</p>
                    </div>)}
            </div>
        </div>
    )
};
export default Dashboard;