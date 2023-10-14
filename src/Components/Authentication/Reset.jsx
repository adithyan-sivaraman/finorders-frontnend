import { faEnvelope, faEye, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { Navigate, useNavigate } from "react-router-dom";

const ResetPassword = () => {
const navigate = useNavigate()
const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const intialValues = {
        username: "",
        email:"",
        password: "",
        confirmpwd:"",
    }
    const [login, setLogin] = useState(intialValues)
    const [passwordType, setPasswordType] = useState(true);
    const [cpasswordType, setCPasswordType] = useState(true);
    const [userValid,setUserValid] = useState(false);
    const [error,setError] = useState(false);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });

        if (name === 'confirmpwd' && login.password !== value) {
            setError("Passwords not matching");
        } else if (name === 'confirmpwd' && login.password === value) {
            setError(false);
        }

        if (name === 'password' && login.confirmpwd !== value) {
            setError("Passwords not matching");
        } else if (name === 'password' && login.confirmpwd === value) {
            setError(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
           const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_])[A-Za-z\d!@#$%&*_]{8,}$/;
           
        if (login.password && !regex.test(login.password)) {
            
            showDialog("Please enter a valid password")
            return;
        }
        const response = await fetch(`${apiEndpoint}/user/reset`, {
            method: 'POST',
            body: JSON.stringify(login),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (data.message === "valid user") {
            setUserValid(true)
        }

        if (data.message === "invalid user") {
            showDialog("User does not exist. Please enter a valid username")
        }

        if (data.message === "updated") {
            showDialog("Password has been updated. Please login with new password")
            setUserValid(false)
            setLogin(intialValues)
        }

    }

    const showDialog = (text)=>{
        setDialogText(text)
        setDialogOpen(true)
        setUserValid(false)
        setTimeout(() => {
            setDialogOpen(false);
        }, 2000)
    }

    if (localStorage.getItem("orders_user") && JSON.parse(localStorage.getItem("orders_user"))) {
        return <Navigate to={'/dashboard'} replace />
    }


    return (
        <div className="container select-none ml-2 mr-2 sm:ml-0 sm:mr-0" id="loginForm">
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
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 flex items-center flex-col ">

                <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/forgot-password.png" alt="forgot-password"/>

                <p className="text-center text-base sm:text-xl  lg:text-2xl font-bold">Forgot Password</p>
                <div className="mt-4 flex flex-row w-full items-center">
                    <FontAwesomeIcon icon={faUser} className="login-icon" />
                    <input className="login-input"
                        onInput={handleInput}
                        value={login.username}
                        name="username"
                        id="username"
                        type="text"
                        autoComplete="on"
                        required
                        placeholder="User Name" />
                </div>

                <div className="mt-4 flex flex-row w-full items-center">
                <FontAwesomeIcon icon={faEnvelope} className="login-icon" />
                <input className="login-input"
                    onInput={handleInput}
                    value={login.email}
                    name="email"
                    id="email"
                    type="text"
                    autoComplete="on"
                    required
                    placeholder="Email Address" />
            </div>

                {userValid && (
                    <div className="mt-4 flex flex-row w-full items-center relative ">
                    <FontAwesomeIcon icon={faLock} className="login-icon" />
                    <input className="login-input"
                        onInput={handleInput}
                        value={login.password}
                        name="password"
                        id="password"
                        required
                        autoComplete="on"
                        type={passwordType ? 'password' : 'text'}
                        placeholder="Enter new password" />
                    <FontAwesomeIcon
                        icon={faEye}
                        className="absolute right-3 top-2 text-xl cursor-pointer"
                        onClick={() => setPasswordType(!passwordType)}
                    />
                </div>
               
                )}
                {userValid && (
                    <div className="mt-4 flex flex-row w-full items-center relative ">
                    <FontAwesomeIcon icon={faLock} className="login-icon" />
                    <input className="login-input"
                        onInput={handleInput}
                        value={login.confirmpwd}
                        name="confirmpwd"
                        id="confirmpwd"
                        required
                        autoComplete="on"
                        type={cpasswordType ? 'password' : 'text'}
                        placeholder="Confirm new password" />
                    <FontAwesomeIcon
                        icon={faEye}
                        className="absolute right-3 top-2 text-xl cursor-pointer"
                        onClick={() => setCPasswordType(!cpasswordType)}
                    />
                </div>
               
                )}
                {error && <span className="error-message">* {error}</span>}
                {userValid && (
                    <div className="pwd-rules">
                        <span className="">Password must be contain atleast</span>
                        <span className="">8 Characters</span>
                        <span className="">1 Capital Letter</span>
                        <span className="">1 Small Letter</span>
                        <span className="">1 Number</span>
                        <span>1 Special Character ( ! @ # $ % & * _ )</span>
                    </div>
                )}

                

                <button
                    className="btn-grad"
                    type="submit">
                    {userValid ? "Update":"Validate"}
                </button>
                
                <p
                onClick={() => navigate('/')}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                Have an account? <span className="underline">Login</span>
            </p>
            </form>
        </div>
    )
};
export default ResetPassword;