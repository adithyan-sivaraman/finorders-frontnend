/* eslint-disable react/no-children-prop */
import Topbar from '../../Layout/Topbar';
import { Input, Select } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdBadge,  faMobileScreen, faPeopleGroup, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { useState } from 'react';
import Loader from '../../Layout/Loader';

const AddUser = () => {
    const initialValues = {
        username:"",
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        type: "",
        department: "",
    }

    const deptOptions = ["NA","Capital Markets","M&A","Direct Taxes","Indirect Taxes","Compliance",
    "Human Resources","Accounting","Forensic Audit","Operations Management","Due Diligence"]

    const [formData, setFormData] = useState(initialValues)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [loader,setLoader] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const response = await fetch(`${apiEndpoint}/user/add`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        
        if (data.message === "user created") {
            const { userId } = data
            setFormData(initialValues)
            setTimeout(() => {
                showDialog(`User with ID ${userId} created successfully`)
                setLoader(false);
            }, 1500)
            return;
        }

        if (data.message === "user exists") {
            setTimeout(() => {
                showDialog(`Username or Email already exists`)
                setLoader(false);
            }, 1500)
            return;
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
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
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
                <p className='px-4 py-2 text-lg lg:text-xl font-bold tracking-wider'>Add an User</p>
                <form className='addUser' onSubmit={handleSubmit}>
                <div className='flex items-center'>
                        <FontAwesomeIcon icon={faUser} className='icons' />
                        <Input
                            id='username' name='username'
                            type='text' variant="outline"
                            placeholder='User Name'
                            required
                            onChange={handleInput}
                            value={formData.username}
                        />
                    </div>
                    <div className='flex items-center py-2'>
                        <FontAwesomeIcon icon={faPerson} className='icons' />
                        <Input
                            id='fname' name='fname'
                            type='text' variant="outline"
                            placeholder='First Name'
                            required
                            onChange={handleInput}
                            value={formData.fname}
                        />
                    </div>

                    <div className='flex items-center py-2'>
                    <FontAwesomeIcon icon={faPerson} className='icons' />
                        <Input
                            id='lname' name='lname'
                            type='text' variant="outline"
                            placeholder='Last Name'
                            required
                            onChange={handleInput}
                            value={formData.lname}
                        />
                    </div>

                    <div className='flex items-center py-2'>
                    <FontAwesomeIcon icon={faEnvelope} className='icons' />
                        <Input
                            id='email' name='email'
                            type='email' variant="outline"
                            placeholder='Email Address'
                            required
                            onChange={handleInput}
                            value={formData.email}
                        />
                    </div>

                    <div className='flex items-center py-2'>
                    <FontAwesomeIcon icon={faMobileScreen} className='icons' />
                        <Input
                            id='mobile' name='mobile'
                            type='text' variant="outline"
                            placeholder='Mobile Number'
                            required
                            pattern='[6-9]{1}[0-9]{9}'
                            minLength={10}
                            maxLength={10}
                            onChange={handleInput}
                            value={formData.mobile}
                        />
                    </div>

                    <div className='flex items-center py-2'>
                    <FontAwesomeIcon icon={faIdBadge} className='icons' />
                        <Select
                            id='type' name='type'
                            required
                            onChange={handleInput}
                            value={formData.type}
                        >
                        <option value="">None</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        </Select>
                        </div>

                        <div className='flex items-center py-2'>
                        <FontAwesomeIcon icon={faPeopleGroup} className='icons' />
                        <Select
                            id='department' name='department'
                            required
                            onChange={handleInput}
                            value={formData.department}
                        >
                        <option value="">None</option>
                        {deptOptions.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                        ))}
                        </Select>
                        </div>


                        <button  type='submit' className='btn-grad'>Create</button>

                </form>
            </div>
        </div>
    )
}

export default AddUser;