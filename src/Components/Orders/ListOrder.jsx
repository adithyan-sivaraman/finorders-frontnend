/* eslint-disable react-hooks/exhaustive-deps */
import { apiEndpoint } from '../../ApiUtils/apiendpoint';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react';
import OrderComplete from './CompleteOrder';
import ViewOrder from './ViewOrder';

const ListOrder = () => {
    const [orderData, setorderData] = useState(false)
    const [filterData, setFilterData] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [viewForm, setViewForm] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [orderToDelete, setorderToDelete] = useState('');
    const [option, setOption] = useState("1")
    const [originalData, setoriginalData] = useState(false);

    const user = JSON.parse(localStorage.getItem("orders_user")).user;
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
                setoriginalData(data)
            }, 1500)
        }

    }
    const filterOrder = (id, action) => {
        const data = orderData.filter((item) => item.orderID === id)[0]
        setFilterData(data);
        if (action === 'update') {
            setShowForm(true);
        }
        else {
            setViewForm(true)
        }

    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const checkOverDue = (date, status) => {
        if (status === "Pending") {
            const dueDate = new Date(date);
            const curDt = new Date();
            if (dueDate > curDt) {
                return "Pending"
            }
            else {
                return "Overdue"
            }
        }

    }

    const getBGColor = (date, status) => {
        if (status === "Completed") {
            return "bg-blue-300 hover:bg-blue-600 hover:text-white "
        }
        else {
            const dueDate = new Date(date);
            const curDt = new Date();
            if (dueDate > curDt) {
                return "bg-gray-300 hover:bg-gray-600 hover:text-white"
            }
            else {
                return "bg-red-400 text-white hover:bg-red-600 text-white"
            }
        }
    }

    const handleClose = (action, orderID) => {
        if (action === "update") {
            setShowForm(!showForm)
        }
        else {
            setViewForm(!viewForm)
        }

        const updatedOrders = orderData.map(order => {
            if (order.orderID === orderID) {
                return { ...order, status: "Completed" };
            }
            return order;
        });

        setorderData(updatedOrders)

    }


    const handleDelete = async () => {

        const response = await fetch(`${apiEndpoint}/orders/delete/${orderToDelete}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (data.message === "order deleted") {
            setorderToDelete("")
            const updatedOrders = orderData.filter((item) => item.orderID !== orderToDelete)
            setorderData(updatedOrders)
            showDialog(`Order Deleted successfully`)

        }

    }
    const showDialog = (text) => {
        setDialogText(text)
        setDialogOpen(true)
        setTimeout(() => {
            setDialogOpen(false);
        }, 2000)
    }

    const handleSelect = (e) => {
        const { value } = e.target;
        const option = Number(value);
        setOption(value)
        if (option === 1) {
            setorderData(originalData)
        }
        else if (option === 2 || option === 3) {
            const filter = originalData.filter((item) => {
                const endDt = new Date(item.endDt);
                const curDt = new Date();
                if (option === 2 && item.status === 'Pending' && curDt < endDt) {
                    return item;
                }
                else if (option === 3 && item.status === 'Pending' && curDt > endDt) {
                    return item;
                }
            })
            setorderData(filter)
        }

        else if (option === 4) {

            const filter = originalData.filter((item) => item.status === 'Completed')
            setorderData(filter)
        }
    }

    return (
        <div className="flex w-screen select-none font-lato overflow-x-hidden overflow-y-auto">
            {showForm && <OrderComplete order={filterData} onClose={handleClose} />}
            {viewForm && <ViewOrder order={filterData} onClose={handleClose} />}
            {dialogOpen && (

                <dialog
                    className="dialog-parent font-lato">
                    <div className="dialog">
                        <p className="text-xl font-bold py-2">Alert !</p>
                        <p className="text-lg  py-2">{dialogText}</p>
                        <div className={orderToDelete ? 'flex justify-evenly w-full' : "hidden"}>
                            <button
                                className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                                onClick={handleDelete}
                                type="button">Confirm</button>
                            <button
                                className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                                onClick={() => setDialogOpen(false)}
                                type="button">Cancel</button>
                        </div>

                    </div>

                </dialog>
            )}

            <div className='flex flex-col grow bg-white'>
                
                {spinner && (
                    <div className='fixed w-screen h-screen top-0 left-0 flex items-center justify-center'>
                    <div className='p-2 overflow-hidden items-center justify-center flex gap-5'>
                        <p className='text-lg font-bold loading'>Loading</p>
                        <Spinner
                            speed='0.7s'
                            thickness='4px'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </div>
                    </div>
                )}


                {!spinner && (<div className='p-2'>
                    <div className='flex w-full items-center gap-3'>
                        <p className='py-2 text-lg lg:text-xl font-bold tracking-wider font-lato'>List of Orders</p>

                        <select
                            onChange={handleSelect}
                            id='select'
                            name='select'
                            value={option}
                            disabled={Object.values(originalData).length === 0}
                            className='border-2 border-indigo-900 text-blue-500 text-sm lg:text-base p-1'>
                            <option value="1">All</option>
                            <option value="2">Pending</option>
                            <option value="3">Overdue</option>
                            <option value="4">Completed</option>

                        </select>
                    </div>

                    <table className='w-full'>
                        <thead>
                            <tr >
                                <th className='px-2 text-sm lg:text-base bg-gray-400'>Order ID</th>
                                <th className='px-2 text-sm lg:text-base bg-gray-400'>Customer Name</th>
                                <th className='px-2 text-sm lg:text-base bg-gray-400'>Order Date</th>
                                <th className='px-2 text-sm lg:text-base bg-gray-400'>Due Date</th>
                                <th className='px-2 text-sm lg:text-base bg-gray-400'>Order Status</th>
                                <th className='px-2 text-sm lg:text-base bg-gray-400'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData && orderData.map((item, index) => (
                                <tr

                                    key={index} className={getBGColor(item.endDt, item.status)} >
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.orderID}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.custname}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.orderDt.split("-").reverse().join("-")}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.endDt.split("-").reverse().join("-")}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base '>{item.status === "Pending" ? checkOverDue(item.endDt, "Pending") : item.status}</td>
                                    <td className='border-b border-indigo-500  p-1 text-sm lg:text-base'>
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                filterOrder(item.orderID, "view")
                                            }}
                                            icon={faEye} className='px-2 cursor-pointer' title='click to view order' />

                                        {item.status === 'Pending' && <FontAwesomeIcon
                                            onClick={() => {
                                                filterOrder(item.orderID, "update")
                                            }}
                                            icon={faCircleCheck} className='px-2 cursor-pointer' title='click to update order status' />}

                                        {item.status === "Pending" && <FontAwesomeIcon
                                            onClick={() => {
                                                setDialogOpen(true)
                                                setDialogText("Are you sure to delete this order? Click confirm to delete")
                                                setorderToDelete(item.orderID)
                                            }}
                                            icon={faTrashCan} className='px-2 cursor-pointer' title='click to delete order' />}

                                    </td>
                                </tr>
                            ))}

                            {orderData.length === 0 && (
                                <tr>
                                    <td colSpan="6" className='p-2 text-base lg:text-lg border-2 text-red-900 font-bold  tracking-wider'>You have not created any orders</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>)}

            </div>


        </div>
    )
};
export default ListOrder;