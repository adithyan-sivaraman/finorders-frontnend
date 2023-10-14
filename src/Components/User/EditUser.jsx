/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */

import { Input, Select } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdBadge,  faMobileScreen, faPeopleGroup, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { useState } from 'react';

const EditUser = ({userData,onClose}) => {
    

    const deptOptions = ["NA","Capital Markets","M&A","Direct Taxes","Indirect Taxes","Compliance",
    "Human Resources","Accounting","Forensic Audit","Operations Management","Due Diligence"]

    const [formData, setFormData] = useState(userData)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiEndpoint}/user/edit`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.message === "user updated") {

            setDialogText(`User updated successfully`)
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
    const handleClose=() =>{
        onClose()
    }
    

    return (
        <div className="flex w-screen h-screen select-none font-lato fixed top-0 left-0 justify-center items-center z-50" id='editUser'>
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
                 
                <form className='editUser bg-white box-shadow' onSubmit={handleSubmit}>
                <div className='flex justify-between  py-2 '>
                <p className='px-4text-lg lg:text-xl font-bold tracking-wider'>Edit User</p>
                <button 
                type='button'
                    onClick={handleClose}
                    className='px-2 bg-blue-400 text-white'>X</button>
                </div>
                
                <div className='flex items-center'>
                        <FontAwesomeIcon icon={faUser} className='icons' />
                        <Input
                            id='username' name='username'
                            type='text' variant="outline"
                            placeholder='User Name'
                            disabled
                            defaultValue={formData.username}
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
                            disabled
                            defaultValue={formData.email}
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
                            disabled
                        >
                        <option value={formData.type}>{formData.type}</option>
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


                        <button type='submit' className='btn-grad'>Update</button>

                </form>
            
        </div>
    )
}

export default EditUser;