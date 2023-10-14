/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faLock, faMobileScreen, faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { Input, Switch } from "@chakra-ui/react";


const Profile = ({ onClose }) => {
    const userInfo = JSON.parse(localStorage.getItem("orders_user"))
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('')
    const [updatePwd, setUpdatePwd] = useState(false)
    const [passwordType, setPasswordType] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        type: "",
        department: "",
        password: '',
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_])[A-Za-z\d!@#$%&*_]{8,}$/;
        if (formData.password && !regex.test(formData.password)) {
            showDialog("Please enter a valid password")
            return;
        }

        const response = await fetch(`${apiEndpoint}/user/update`, {
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

    const showDialog = (text) => {
        setDialogText(text)
        setDialogOpen(true)
        setTimeout(() => {
            setDialogOpen(false);
        }, 2000)
    }

    const fetchProfile = async () => {
        const response = await fetch(`${apiEndpoint}/user/profile/${userInfo.user}`);
        const data = await response.json();

        setFormData({ ...data, password: "" });
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleClose = () => {
        onClose()
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (btnDisabled) {
            setBtnDisabled(false)
        }

        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="flex w-screen h-screen select-none font-lato fixed top-0 left-0 justify-center items-center z-50" id='profile'>
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

            <form className='profile bg-white box-shadow' onSubmit={handleSubmit}>
                <div className='flex justify-between  py-2 '>
                    <p className='px-4text-lg lg:text-xl font-bold tracking-wider'>Edit Profile</p>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='px-2 bg-blue-400 text-white'>X</button>
                </div>
                <div className='flex items-center py-2'>
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
                    <FontAwesomeIcon icon={faEnvelope} className='icons' />
                    <Input
                        id='email' name='email'
                        type='text' variant="outline"
                        disabled
                        defaultValue={formData.email}
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

                <div className='flex items-center py-2 gap-5'>
                    <p>Update Password</p>
                    <Switch onChange={() => {
                        setUpdatePwd(!updatePwd)
                        setFormData({ ...formData, password: "" })
                    }} />

                </div>

                <div className='flex items-center py-2 relative'>
                    <FontAwesomeIcon icon={faLock} className='icons' />
                    <Input
                        id='password' name='password'
                        type={passwordType ? 'password' : 'text'}
                        variant="outline"
                        placeholder='Enter a new password'
                        disabled={!updatePwd}
                        minLength={8}
                        required={updatePwd}
                        onChange={handleInput}
                        value={formData.password}
                    />
                    <FontAwesomeIcon
                        icon={faEye}
                        className="absolute right-3 top-4 text-xl cursor-pointer z-10"
                        onClick={() => setPasswordType(!passwordType)}
                    />
                </div>
                <div className="pwd-rules">
                    <span className="">Password must be contain atleast</span>
                    <span className="">8 Characters</span>
                    <span className="">1 Capital Letter</span>
                    <span className="">1 Small Letter</span>
                    <span className="">1 Number</span>
                    <span>1 Special Character ( ! @ # $ % & * _ )</span>
                </div>


                <button
                    disabled={btnDisabled}
                    type='submit' className='btn-grad'>Update</button>
            </form>
        </div>
    )
}
export default Profile;