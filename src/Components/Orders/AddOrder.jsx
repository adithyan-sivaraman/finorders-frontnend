import Topbar from '../../Layout/Topbar';
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tag, TagLabel, Tooltip, useDisclosure } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { useState } from 'react';
import Loader from '../../Layout/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { servicesList } from './ServicesList';

const AddOrder = () => {
    const initialValues = {
        custname: "",
        orderDt: "",
        endDt: "",
        value: "",
        description: "",
        services: "",

    }
    const [formData, setFormData] = useState(initialValues)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [loader, setLoader] = useState(false);
    const [custName, setCustName] = useState('');
    const [customerNames, setCustomerNames] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedServices, setSelectedServices] = useState([]);
    const user =  JSON.parse(localStorage.getItem("orders_user")).user
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedServices.length === 0) {
            showDialog("Please select at least one service")
            return;
        }
        setLoader(true);
        const orders = {
            data:{ ...formData, services: selectedServices.join(',') },
            user:user
        }
        const response = await fetch(`${apiEndpoint}/orders/add`, {
            method: 'POST',
            body: JSON.stringify(orders),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (data.message === "order created") {
            const { orderID } = data

            setTimeout(() => {
                setFormData(initialValues)
                setSelectedServices([])
                showDialog(`Order created successfully. Order ID Is is ${orderID}`)
                setLoader(false);
            }, 1500)
            return;
        }

    }

    const custSearch = async (e) => {
        const { value } = e.target;
        setCustName(value)
        if (value.length > 2) {
            const response = await fetch(`${apiEndpoint}/customer/search`, {
                method: 'POST',
                body: JSON.stringify({ custname: value }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.log(data)
            setCustomerNames(data)
        }
        else {
            setCustomerNames(false)
        }

    }
    const showDialog = (text) => {
        setDialogText(text)
        setDialogOpen(true)
        setTimeout(() => {
            setDialogOpen(false);
        }, 2000)
    }


    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        if (name === "orderDt") {
            const curDt = new Date();
            const orderDt = new Date(value)
            const setDate = curDt.toISOString().split("T")[0]
            if (curDt < orderDt) {
                showDialog("Order date cannot be greater than curent date")
                setFormData({ ...formData, orderDt: setDate })
            }
        }
        if (name === "endDt") {
            const curDt = new Date();
            const orderDt = new Date(value)
            const setDate = curDt.toISOString().split("T")[0]
            if (curDt > orderDt) {
                showDialog("Estimated Completion date cannot be lesser than curent date")
                setFormData({ ...formData, endDt: setDate })
            }
        }
    }

    return (
        <div className="flex w-screen h-screen select-none font-lato">

            {loader && <Loader />}

            {dialogOpen && (

                <dialog
                    className="dialog-parent font-lato">
                    <div className="dialog">
                        <p className="text-xl font-bolder py-2">Alert !</p>
                        <p className="text-lg font-bolder py-2">{dialogText}</p>
                        <button
                            className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                            onClick={() => setDialogOpen(false)}
                            type="button">Close</button>
                    </div>

                </dialog>
            )}
            
            <div className='flex flex-col grow bg-white'>
                <Topbar />
                <p className='px-4 py-2 text-lg lg:text-xl font-bold tracking-wider'>Create a service order</p>
                <form className='addOrder' onSubmit={handleSubmit} id='addOrder'>
                    <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                        <label htmlFor='custname' className='text-sm lg:text-base font-bold w-full sm:w-1/3 flex items-center'>Customer Name
                            <IconButton
                                onClick={onOpen}
                                className='ml-2'
                                isRound={true}
                                colorScheme='gray'
                                aria-label='Search Customer'
                                icon={<SearchIcon />} />
                        </label>
                        <input
                            id='custname' name='custname'
                            type='text'
                            required
                            className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                            onChange={handleInput}
                            value={formData.custname}
                            readOnly
                        />

                    </div>


                    <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                        <label htmlFor='orderDt' className='text-sm lg:text-base font-bold w-full sm:w-1/3'>Order Date</label>
                        <input
                            id='orderDt' name='orderDt'
                            type='date'
                            required
                            className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                            onChange={handleInput}
                            value={formData.orderDt}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>
                        <label htmlFor='endDt' className='text-sm lg:text-base font-bold w-full sm:w-1/3'>Estimated Completion</label>
                        <input
                            id='endDt' name='endDt'
                            type='date'
                            required
                            className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                            onChange={handleInput}
                            value={formData.endDt}
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
                            onChange={handleInput}
                            onBlur={() => {
                                if (formData.value) {
                                    const formatValue = parseFloat(formData.value).toLocaleString("en-IN");
                                    setFormData({ ...formData, value: formatValue });
                                }

                            }}
                            onFocus={() => {
                                if (formData.value) {
                                    const formatValue = parseFloat(formData.value.replace(/,/g, ''));
                                    setFormData({ ...formData, value: formatValue });
                                }
                            }}
                            value={formData.value}
                        />


                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2'>

                        <label htmlFor='services' className='text-sm lg:text-base font-bold w-full sm:w-1/3 flex gap-3 items-center'>
                            Services
                            <Tooltip label="You can select multiple services">
                                <FontAwesomeIcon icon={faInfoCircle} className='text-lg' />
                            </Tooltip>
                        </label>

                        <select
                            className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200'
                            id='services' name='services'
                            onChange={(e) => {
                                const { value } = e.target;
                                if (!selectedServices.includes(value)) {
                                    setSelectedServices([...selectedServices, value]);
                                    setFormData({ ...formData, services: "" })
                                }
                            }}
                            value={formData.services}>
                            <option value="">None</option>
                            {servicesList.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-wrap gap-3 border sm:items-center py-1 sm:py-2' id='servicesList' >
                        {selectedServices && selectedServices.map((service, index) => (

                            <Tag
                                onClick={() => {
                                    const filter = selectedServices.filter(item => item !== service);
                                    setSelectedServices(filter)
                                }}

                                key={index} colorScheme='cyan' className='cursor-pointer'>
                                <TagLabel title='click to remove'>
                                    <FontAwesomeIcon

                                        icon={faTrash} className='px-2' />{service}</TagLabel>
                            </Tag>

                        ))}
                        {selectedServices.length === 0 && (
                            <p className='text-red-900 tracking-wider p-2'> You have not selected any service</p>
                        )}
                    </div>

                    <div className='flex flex-col sm:flex-row sm:items-center py-1 sm:py-2' >
                        <label htmlFor='description' className='text-sm lg:text-base font-bold w-full sm:w-1/3'>Order Description</label>
                        <textarea
                            id='description' name='description'
                            type='number'
                            required
                            className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200 resize-none h-20 overflow-y-auto'
                            onChange={handleInput}
                            value={formData.description}
                        />
                    </div>
                    <button
                        disabled={!formData.custname}
                        type='submit' className='btn-grad'>Create</button>

                </form>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Search for Customer</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <input
                                id='custname' name='custname'
                                type='text'
                                required
                                className='text-sm lg:text-base mt-1 sm:mt-0 border border-gray-500 w-full sm:w-2/3 rounded-sm p-1 focus:bg-cyan-200 resize-none overflow-y-auto'
                                onChange={custSearch}
                                value={custName}
                                placeholder='Enter customer name'
                            />
                            <div>
                                {customerNames && (
                                    <div className='flex flex-col mt-2' >
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='text-left text-sm lg:text-base border bg-blue-200'>Customer Name</th>
                                                    <th className='text-left text-sm lg:text-base border bg-blue-200'>Customer GSTIN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customerNames && customerNames.map((item, index) => (
                                                    <tr
                                                        onClick={() => {
                                                            setFormData({ ...formData, custname: item.custname })
                                                            setCustName("")
                                                            setCustomerNames(false)
                                                            onClose()
                                                        }}
                                                        key={index} className='cursor-pointer' title='click to select this customer'>
                                                        <td className='border-b border-indigo-500 text-base lg:text-lg'>{item.custname}</td>
                                                        <td className='border-b border-indigo-500 text-base lg:text-lg'>{item.custgst.toUpperCase()}</td>
                                                    </tr>
                                                ))}

                                                {customerNames.length === 0 && (
                                                    <tr>
                                                    <td className='font-bold p-2 border-b border-indigo-500' colSpan={2}>No Customers Found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </div>
    )
}

export default AddOrder;