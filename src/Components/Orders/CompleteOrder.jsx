/* eslint-disable react/prop-types */
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { apiEndpoint } from "../../ApiUtils/apiendpoint";

const OrderComplete = ({ order, onClose }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [orderStatus, setOrderStatus] = useState({
        orderID: order.orderID,
        orderDt: order.orderDt,
        endDt: order.endDt,
        completeDt: "",
        remarks: ""
    });

    const handleClose = (orderID) => {
        onClose("update", orderID)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiEndpoint}/orders/update`, {
            method: 'PUT',
            body: JSON.stringify(orderStatus),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        
        if (data.message === "order updated") {
            setDialogText(`Order status updated successfully.`)
            setDialogOpen(true)
            setTimeout(() => {
                setDialogOpen(false);
                handleClose(orderStatus.orderID)
            }, 2000)
            return;
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

        <div className="flex w-screen h-screen select-none font-lato fixed top-0 left-0 justify-center items-center z-50 bg-opacity">
            {dialogOpen && (
                <dialog
                    className="dialog-parent font-lato">
                    <div className="dialog">
                        <p className="text-xl font-bolder py-1">Alert !</p>
                        <p className="text-lg font-bolder py-1">{dialogText}</p>
                        {/* <button
                    className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                    onClick={() => setDialogOpen(false)}
                    type="button">Close</button>*/}
                    </div>
                </dialog>
            )}

            <form className='completeOrder bg-white box-shadow' onSubmit={handleSubmit}>
                <FontAwesomeIcon
                    onClick={handleClose}
                    icon={faXmark} className="cursor-pointer hover:bg-blue-500 hover:text-white p-1" />
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                    <label
                        className='text-sm lg:text-base font-bold w-full sm:w-1/4'
                        htmlFor="orderID">Order ID</label>
                    <input
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-3/4 rounded-sm p-1 focus:bg-cyan-200 resize-none'
                        id="orderID" name="orderID"
                        type="text"
                        disabled
                        value={orderStatus.orderID}
                    />
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                    <label
                        className='text-sm lg:text-base font-bold w-full sm:w-1/4'
                        htmlFor="orderID">Order date</label>
                    <input
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-3/4 rounded-sm p-1 focus:bg-cyan-200 resize-none'
                        id="endorderDtDt" name="orderDt"
                        type="date"
                        disabled
                        value={orderStatus.orderDt}
                    />
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                    <label
                        className='text-sm lg:text-base font-bold w-full sm:w-1/4'
                        htmlFor="orderID">Due date</label>
                    <input
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-3/4 rounded-sm p-1 focus:bg-cyan-200 resize-none'
                        id="endDt" name="endDt"
                        type="date"
                        disabled
                        value={orderStatus.endDt}
                    />
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                    <label
                        className='text-sm lg:text-base font-bold w-full sm:w-1/4'
                        htmlFor="completeDt">Complete date</label>
                    <input
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-3/4 rounded-sm p-1 focus:bg-cyan-200 resize-none'
                        id="completeDt" name="completeDt"
                        type="date"
                        onInput={(e) => {
                            const orderDate = new Date(orderStatus.orderDt);
                            const date = new Date(e.target.value);
                            const curDt = new Date();
                            if (date > curDt) {
                                showDialog("Completed date cannot be greater than current date")
                                return;
                            }
                            if (date < orderDate) {
                                showDialog("Completed date cannot be lesser than order date")
                                return;
                            }

                            setOrderStatus({ ...orderStatus, completeDt: e.target.value })
                        }}
                        value={orderStatus.completeDt}
                    />
                </div>


                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                    <label
                        className='text-sm lg:text-base font-bold w-full sm:w-1/4'
                        htmlFor="orderID">Remarks</label>
                    <textarea
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-3/4 rounded-sm p-1 focus:bg-cyan-200 resize-none h-20 overflow-y-auto'
                        id="remarks" name="remarks"
                        onInput={(e) => {
                            setOrderStatus({ ...orderStatus, remarks: e.target.value })
                        }}
                        required
                        value={orderStatus.remarks}
                    ></textarea>
                </div>

                <button type='submit' className='btn-grad'>Update</button>
            </form>
        </div>

    )
};
export default OrderComplete;