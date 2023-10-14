/* eslint-disable react/no-children-prop */
import Topbar from '../../Layout/Topbar';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCircleUser, faEnvelope, faG, faMapMarker, faMapPin, faMobileScreen, faUser } from '@fortawesome/free-solid-svg-icons';
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { useState } from 'react';
import Loader from '../../Layout/Loader';

const AddCustomer = () => {
    const initialValues = {
        custname:"",
        custgst:"",
        contactname:"",
        contactemail:"",
        contactmobile:"",
        addr1:"",
        addr2:"",
        pincode:"",
        state:"",
    
    }
    const [formData,setFormData] = useState(initialValues)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [loader,setLoader] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const response = await fetch(`${apiEndpoint}/customer/add`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        
        if (data.message === "customer created") {
            const {custId} = data;
            setFormData(initialValues)
            setTimeout(() => {
                showDialog(`Customer with id ${custId} Created successfully`)
                setLoader(false);
            }, 1500)
        }

    }
    const showDialog=(text)=>{
        setDialogText(text)
        setDialogOpen(true)
        setTimeout(() => {
            setDialogOpen(false);
        }, 2000)
    }

    const handleInput = (e) => {
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }

    return (
        <div className="flex w-screen h-screen select-none">
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
                <p className='px-4 py-2 text-lg lg:text-xl font-bold tracking-wider'>Add Customer</p>
                <form className='addCustomer' onSubmit={handleSubmit}>

                    <InputGroup size="md" className='mt-2'>
                        <InputLeftElement>
                            <FontAwesomeIcon size='lg' icon={faCircleUser} />
                        </InputLeftElement>
                        <Input
                            id='custname' name='custname'
                            type='text' variant="outline"
                            placeholder='Customer Name'
                            required
                            onChange={handleInput}
                            value={formData.custname}
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
                            required
                            maxLength={15}
                            minLength={15}
                            pattern="[0-3]{1}[0-9]{1}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[Z]{1}[0-9A-Za-z]{1}"
                            onChange={handleInput}
                            value={formData.custgst.toUpperCase()}
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
                            minLength={6}
                            maxLength={6}
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
                    <button  type='submit' className='btn-grad'>Create</button>

                </form>
            </div>
        </div>
    )
}

export default AddCustomer;