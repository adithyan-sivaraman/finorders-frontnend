/* eslint-disable react/prop-types */
import { Tag, TagLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faIndianRupeeSign, faXmark } from '@fortawesome/free-solid-svg-icons';

const ViewOrder = ({ order, onClose }) => {

    const [formData,] = useState(order)

    const handleClose = () => {
        onClose("view")
    }


    return (
        <div className="flex w-screen h-screen select-none font-lato fixed top-0 left-0 justify-center items-center z-50 bg-opacity">


            <form id='viewOrder' className='bg-white'>
                <FontAwesomeIcon
                    onClick={handleClose}
                    icon={faXmark} className="cursor-pointer hover:bg-blue-500 hover:text-white p-1" />
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                    <label htmlFor='custname' className='text-sm lg:text-base font-bold w-full sm:w-1/3 flex items-center'>Customer Name</label>
                    <input
                        id='custname' name='custname'
                        type='text'
                        required
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                        disabled
                        defaultValue={formData.custname}

                    />

                </div>


                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                    <label htmlFor='orderDt' className='text-sm lg:text-base font-bold w-full sm:w-1/3'>Order Date</label>
                    <input
                        id='orderDt' name='orderDt'
                        type='date'
                        required
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                        disabled
                        defaultValue={formData.orderDt}
                    />
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                    <label htmlFor='endDt' className='text-sm lg:text-base font-bold w-full sm:w-1/3'>Estimated Completion</label>
                    <input
                        id='endDt' name='endDt'
                        type='date'
                        required
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                        disabled
                        defaultValue={formData.endDt}
                    />
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                    <label htmlFor='value' className='text-sm lg:text-base font-bold w-full sm:w-1/3 flex gap-3 items-center'>
                        Order Value <FontAwesomeIcon icon={faIndianRupeeSign} /></label>
                    <input
                        id='value' name='value'
                        type='text'
                        required
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                        disabled

                        defaultValue={formData.value}
                    />


                </div>
                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>

                    <label htmlFor='services' className='text-sm lg:text-base font-bold w-full sm:w-1/3 flex gap-3 items-center'>Services</label>

                    <input
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                        id='services' name='services'
                        disabled
                        type='text'
                        defaultValue={formData.services} />


                </div>

                <div className='flex flex-wrap gap-3 border sm:items-center py-1 sm:py-2' id='servicesList' >
                    {formData.services.map((service, index) => (

                        <Tag
                            key={index} colorScheme='gray'>
                            <TagLabel >
                                <FontAwesomeIcon
                                    icon={faCheck} className='px-2' />{service}</TagLabel>
                        </Tag>

                    ))}

                </div>

                <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                    <label htmlFor='description' className='text-sm lg:text-base font-bold w-full sm:w-1/3'>Order Description</label>
                    <textarea
                        id='description' name='description'
                        type='number'
                        required
                        className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200 resize-none h-20 overflow-y-auto'
                        disabled
                        defaultValue={formData.description}
                    />
                </div>
            </form>
        </div>
    )
}

export default ViewOrder;