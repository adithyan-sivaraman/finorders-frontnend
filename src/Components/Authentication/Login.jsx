/* eslint-disable react/prop-types */
import { faEye, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useState } from "react";
import { apiEndpoint } from "../../ApiUtils/apiendpoint";
import { Navigate, useNavigate } from "react-router-dom";
import { Divider, Switch } from "@chakra-ui/react";
import Loader from "../../Layout/Loader";

const UserLogin = ({onLogin}) => {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [login, setLogin] = useState({
        username: "",
        password: "",
        cpassword: "",
    })
    const [passwordType, setPasswordType] = useState(true);
    const [cpasswordType, setcPasswordType] = useState(true);
    const [firstLogin, setFirstLogin] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
        if (name === 'cpassword' && login.password && login.password !== value) {
            setError("Passwords not matching");
        } else if (name === 'cpassword' && login.password === value) {
            setError(false);
        }

        if (name === 'password' && login.cpassword && login.cpassword !== value) {
            setError("Passwords not matching");
        } else if (name === 'password' && login.cpassword === value) {
            setError(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_])[A-Za-z\d!@#$%&*_]{8,}$/;

        if (firstLogin && login.password && !regex.test(login.password)) {

            setDialogText("Please Enter a valid password");
            setDialogOpen(true)
            setTimeout(() => {
                setDialogOpen(false);
            }, 2000)
            return;
        }
        setLoader(true)
        const response = await fetch(`${apiEndpoint}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ data: login, fLogin: firstLogin }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        

        if (data.message === "valid login") {
            setLoader(false)
            const { user, type } = data;
            onLogin();
            localStorage.setItem("orders_user", JSON.stringify({ user: user, type: type }));
            navigate('dashboard');
        }

        if (data.message === "user not active") {
            setLoader(false)
            setDialogText("User has not been activated. Please use First Time Login option")
            setDialogOpen(true)
            setTimeout(() => {
                setDialogOpen(false);
            }, 2000)
        }

        if (data.message === "invalid login") {
            setLoader(false)
            setDialogText("Username or password is invalid")
            setDialogOpen(true)
            setTimeout(() => {
                setDialogOpen(false);
            }, 2000)
        }

    }

    if (localStorage.getItem("orders_user") && JSON.parse(localStorage.getItem("orders_user"))) {
        onLogin();
        return <Navigate to={'/dashboard'} replace />
    }


    return (
        <div className="container select-none ml-2 mr-2 sm:ml-0 sm:mr-0" id="loginForm">
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
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 flex items-center flex-col ">

                <img width="96" height="96" src="https://img.icons8.com/fluency/48/login-rounded-right.png" alt="login-rounded-right" />
                <p className="text-center text-base sm:text-xl  lg:text-2xl font-bold">Welcome to FinOrders</p>
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
                        placeholder={firstLogin ? "New Password" : "******************"} />
                    <FontAwesomeIcon
                        icon={faEye}
                        className="absolute right-3 top-2 text-xl cursor-pointer"
                        onClick={() => setPasswordType(!passwordType)}
                    />
                </div>
                {firstLogin && (
                    <div className="mt-4 flex flex-row w-full items-center relative ">
                        <FontAwesomeIcon icon={faLock} className="login-icon" />
                        <input className="login-input"
                            onInput={handleInput}
                            value={login.cpassword}
                            name="cpassword"
                            id="cpassword"
                            required
                            autoComplete="on"
                            type={cpasswordType ? 'password' : 'text'}
                            placeholder="Confirm Password" />
                        <FontAwesomeIcon
                            icon={faEye}
                            className="absolute right-3 top-2 text-xl cursor-pointer"
                            onClick={() => setcPasswordType(!cpasswordType)}
                        />
                    </div>
                )}

                {firstLogin && error && <span className="error-message">* {error}</span>}

                {firstLogin && (
                    <div className="pwd-rules">
                        <span className="">Password must be contain atleast</span>
                        <span className="">8 Characters</span>
                        <span className="">1 Capital Letter</span>
                        <span className="">1 Small Letter</span>
                        <span className="">1 Number</span>
                        <span>1 Special Character ( ! @ # $ % & * _ )</span>
                    </div>
                )}
                <div className="flex flex-row mt-4 w-full gap-3">
                    <p
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                        First Time Login
                    </p>
                    <Switch
                        onChange={() => {
                            setFirstLogin(!firstLogin)
                            setError(false)
                        }}
                        name="flogin"
                        size="md" colorScheme="red" />
                </div>

                <button
                    disabled={error}
                    className="btn-grad"
                    type="submit">
                    Sign In
                </button>
                <Divider />
                <p
                    onClick={() => navigate('/reset')}
                    className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800 cursor-pointer">
                    Forgot Password? <span className="underline">Reset</span>
                </p>

            </form>
        </div>
    )
};
export default UserLogin;