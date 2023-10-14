/* eslint-disable react-hooks/exhaustive-deps */
import Topbar from '../../Layout/Topbar';
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
    const user = JSON.parse(localStorage.getItem("orders_user") ).user;
    const fetchOrders = async () => {
        setSpinner(true)
        const response = await fetch(`${apiEndpoint}/orders/list`,{
            method:'POST',
            body:JSON.stringify({user:user}),
            headers: {"content-type": "application/json"}
        });
        const data = await response.json();
        
        if (data) {
            setTimeout(() => {
                setSpinner(false)
                setorderData(data);
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

    const checkOverDue=(date,status)=>{
        if(status==="Pending"){
            const dueDate = new Date(date);
            const curDt = new Date();
            if(dueDate>curDt){
                return "Pending"
            }
            else {
                return "Overdue"
            }
        }
        
    }

    const handleClose = (action,orderID) => {
        if(action ==="update"){
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



    return (
        <div className="flex w-screen h-screen select-none font-lato">
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


                {!spinner && (<div className='p-2 h-full overflow-y-auto'>
                    <p className='py-2 text-lg lg:text-xl font-bold tracking-wider font-lato'>List of Orders</p>
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

                                    key={index} className={checkOverDue(item.endDt,item.status)==="Overdue"?"bg-red-400 text-white":"hover:bg-blue-500 hover:text-white"} >
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.orderID}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.custname}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.orderDt.split("-").reverse().join("-")}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.endDt.split("-").reverse().join("-")}</td>
                                    <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base '>{item.status==="Pending"?checkOverDue(item.endDt,"Pending"):item.status}</td>
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

                            {orderData.length===0 && (
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