import Topbar from '../../Layout/Topbar';
import { apiEndpoint } from '../../ApiUtils/apiendpoint';
import { useEffect, useState } from 'react';
import EditUser from './EditUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react';

const ListUser = () => {
    const [userData, setuserData] = useState(false)
    const [filterData, setFilterData] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [userToUpdate, setuserToUpdate] = useState('');
    const [actionType, setActionType] = useState("");
    const [spinner, setSpinner] = useState(false)
    const fetchUsers = async () => {
        setSpinner(true)
        const response = await fetch(`${apiEndpoint}/user/list`);
        const data = await response.json();
        if (data) {
            setTimeout(() => {
                setSpinner(false)
                setuserData(data);
            }, 1500)
        }


    }
    const filterUser = (username) => {
        const data = userData.filter((item) => item.username === username)[0]
        setFilterData(data);
        setShowForm(true);
    }

    const handleClose = () => {
        setShowForm(!showForm)
    }

    const handleDelete = async () => {

        //for delete action use this endpoint
        if (actionType === "delete") {
            const response = await fetch(`${apiEndpoint}/user/delete/${userToUpdate}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.message === "user deleted") {
                setuserToUpdate("")
                const updatedUsers = userData.filter((item) => item.username !== userToUpdate)
                setuserData(updatedUsers)
                setDialogText(`User Deleted successfully`)
                setDialogOpen(true)
                setTimeout(() => {
                    setDialogOpen(false);
                }, 2000)
            }
        }

        //for deactivation and activation action use this endpoint
        else {
            const action = actionType === "deactivate" ? "deactivate" : "activate";
            const response = await fetch(`${apiEndpoint}/user/${action}/${userToUpdate}`, {
                method: 'PUT',
            });
            const data = await response.json();
            let updatedUsers = "";
            if (data.message === "user deactivated") {

                updatedUsers = userData.map((user) => {
                    if (user.username === userToUpdate) {
                        return { ...user, active: false }
                    }
                    return user;
                })
                setuserToUpdate("")
                showDialog(`User Deactivated successfully`)

            }
            else if (data.message === "user activated") {

                updatedUsers = userData.map((user) => {
                    if (user.username === userToUpdate) {
                        return { ...user, active: true }
                    }
                    return user;
                })
                setuserToUpdate("")
                showDialog(`User Activated successfully`)

            }
            setuserData(updatedUsers)

        }

    }

    const showDialog = (text) => {
        setDialogText(text)
        setDialogOpen(true)
        setTimeout(() => {
            setDialogOpen(false);
        }, 2000)
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const handleAction = (action, username) => {

        if (action === "delete") {
            setDialogText("Are you sure to delete this user? Click confirm to delete")
        }
        else if (action === "deactivate") {
            setDialogText(`Are you sure to deactivate this user? Click confirm to deactivate`)
        }
        else {
            setDialogText(`Are you sure to activate this user? Click confirm to activate`)
        }

        setDialogOpen(true)
        setActionType(action)
        setuserToUpdate(username)
    }

    return (
        <div className="flex w-screen h-screen select-none font-lato">
            {dialogOpen && (

                <dialog
                    className="dialog-parent font-lato">
                    <div className="dialog">
                        <p className="text-xl font-bold py-2">Alert !</p>
                        <p className="text-lg  py-2">{dialogText}</p>
                        <div className={userToUpdate ? 'flex justify-evenly w-full' : "hidden"}>
                            <button
                                className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                                onClick={handleDelete}
                                type="button">Confirm</button>
                            <button
                                className="bg-blue-500 text-white tracking-wider rounded-md px-4 py-1 mt-2"
                                onClick={() => setDialogOpen(false)}
                                type="button">Cancel</button>
                        </div>

                    </div>

                </dialog>
            )}

            <div className='flex flex-col grow bg-white'>
                <Topbar />
                {showForm && <EditUser userData={filterData} onClose={handleClose} />}

                {spinner && (
                    <div className='p-2 h-full overflow-y-auto w-full items-center justify-center flex gap-5'>
                        <p className='text-lg font-bold loading'>Loading</p>
                        <Spinner
                            speed='0.7s'
                            thickness='4px'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </div>
                )}

                {!spinner && (
                    <div className='p-2 h-full overflow-y-auto'>
                        <p className='py-2 text-lg lg:text-xl font-bold tracking-wider font-lato'>List of Users</p>
                        <table className='w-full'>
                            <thead>
                                <tr >
                                    <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Username</th>
                                    <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Email</th>
                                    <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Department</th>
                                    <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400'>Active</th>
                                    <th className='border border-indigo-500 px-2 text-sm lg:text-base bg-gray-400 text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.map((item, index) => (
                                    <tr

                                        key={index} className='hover:bg-blue-500 hover:text-white' >
                                        <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.username}</td>
                                        <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.email}</td>
                                        <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.department}</td>
                                        <td className='border-b border-indigo-500 px-2 p-1 text-sm lg:text-base'>{item.active ? "active" : "inactive"}</td>
                                        <td className='border-b border-indigo-500  p-1 text-sm lg:text-base text-center'>
                                            <FontAwesomeIcon
                                                onClick={() => filterUser(item.username)}
                                                icon={faPenToSquare} className='px-2 cursor-pointer' title='click to edit user' />
                                            <FontAwesomeIcon
                                                title='click to delete user'
                                                onClick={() => {
                                                    handleAction('delete', item.username)
                                                }}
                                                icon={faTrashCan} className='px-2 cursor-pointer' />
                                            <FontAwesomeIcon
                                                onClick={() => {
                                                    if (item.active) {
                                                        handleAction('deactivate', item.username)
                                                    }
                                                    else {
                                                        handleAction('activate', item.username)
                                                    }
                                                }}
                                                title={item.active ? 'click to deactivate user' : 'click to activate user'}
                                                icon={item.active ? faBan : faCheck} className='px-2 cursor-pointer' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


            </div>
        </div>
    )
};
export default ListUser;