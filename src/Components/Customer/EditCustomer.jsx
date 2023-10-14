/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCircleUser, faEnvelope, faG, faMapMarker, faMapPin, faMobileScreen, faUser } from '@fortawesome/free-solid-svg-icons';
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { useState } from 'react';

const EditCustomer = ({ userData, onClose }) => {

    const [formData, setFormData] = useState(userData)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiEndpoint}/customer/edit`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.message === "customer updated") {

            setDialogText(`Customer updated successfully`)
            setDialogOpen(true)
            setTimeout(() => {
                setDialogOpen(false);
                handleClose()
            }, 2000)
            return;
        }


    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <div className="flex w-screen h-screen select-none font-lato fixed top-0 left-0 justify-center items-center z-50" id='EditCustomer'>
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

            <form className='editCustomer bg-white box-shadow' onSubmit={handleSubmit}>
                <div className='flex justify-between  py-2 '>
                    <p className='px-4text-lg lg:text-xl font-bold tracking-wider'>Edit Customer</p>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='px-2 bg-blue-400 text-white'>X</button>
                </div>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faCircleUser} />
                    </InputLeftElement>
                    <Input
                        id='custname' name='custname'
                        type='text' variant="outline"
                        placeholder='Customer Name'
                        isDisabled
                        defaultValue={formData.custname}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faG} />
                    </InputLeftElement>
                    <Input
                        id='custgst' name='custgst'
                        type='text' variant="outline"
                        placeholder='Customer GSTIN'
                        isDisabled
                        defaultValue={formData.custgst}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faUser} />
                    </InputLeftElement>
                    <Input
                        id='contactname' name='contactname'
                        type='text' variant="outline"
                        placeholder='Contact Person Name'
                        required
                        onChange={handleInput}
                        value={formData.contactname}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faEnvelope} />
                    </InputLeftElement>
                    <Input
                        id='contactemail' name='contactemail'
                        type='email' variant="outline"
                        placeholder='Contact Person Email'
                        required
                        onChange={handleInput}
                        value={formData.contactemail}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faMobileScreen} />
                    </InputLeftElement>
                    <Input
                        id='contactmobile' name='contactmobile'
                        type='text' variant="outline"
                        placeholder='Contact Person Mobile'
                        required
                        pattern='[6-9]{1}[0-9]{9}'
                        minLength={10}
                        maxLength={10}
                        onChange={handleInput}
                        value={formData.contactmobile}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faAddressBook} />
                    </InputLeftElement>
                    <Input
                        id='addr1' name='addr1'
                        type='text' variant="outline"
                        placeholder='Address Line 1'
                        required
                        onChange={handleInput}
                        value={formData.addr1}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faAddressBook} />
                    </InputLeftElement>
                    <Input
                        id='addr2' name='addr2'
                        type='text' variant="outline"
                        placeholder='Address Line 2'
                        required
                        onChange={handleInput}
                        value={formData.addr2}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faMapMarker} />
                    </InputLeftElement>
                    <Input
                        id='pincode' name='pincode'
                        type='text' variant="outline"
                        placeholder='Pincode'
                        required
                        pattern='[1-8]{1}[0-9]{5}'
                        onChange={handleInput}
                        value={formData.pincode}
                    />
                </InputGroup>

                <InputGroup size="md" className='mt-2'>
                    <InputLeftElement>
                        <FontAwesomeIcon size='lg' icon={faMapPin} />
                    </InputLeftElement>
                    <Input
                        id='state' name='state'
                        type='text' variant="outline"
                        placeholder='State'
                        required
                        onChange={handleInput}
                        value={formData.state}
                    />
                </InputGroup>
                <button type='submit' className='btn-grad'>Update</button>

            </form>

        </div>
    )
}

export default EditCustomer;