import Menu from '../../Layout/Menu'
import Topbar from '../../Layout/Topbar';
import { apiEndpoint } from '../../ApiUtils/apiendpoint';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

const ListUser = () => {
    const [userData,setuserData] = useState(false)
    const fetchUsers = async()=>{
        const response = await fetch(`${apiEndpoint}/user/list`);
        const data = await response.json();
        
        let tableData = [];
        data.map((item)=>{
            const {username,email,department,active} = item;
            const isActive = active===true?"yes":"no"
            tableData.push({username,email,department,isActive})
        })
        setuserData(tableData)
        console.log(tableData)
    }
    const columns = [
        {   id: 'Username',
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {   id: 'Email',
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {id: 'Department',
            name: 'Department',
            selector: row => row.department,
            sortable: true,
        },
        {id: 'Active',
            name: 'Active',
            selector: row => row.isActive,
        },

    ];
    const customStyles = {
        rows: {
            style: {
                fontSize: '16px',
            },
        },
        headRow: {
            style:{
                fontSize: '18px',
                fontWeight:'bold',
            }
        }
    };
    useEffect(()=>{
        fetchUsers()
    },[])
    return (
        <div className="flex w-screen h-screen select-none font-lato">
            <Menu />
            <div className='flex flex-col grow bg-white'>
                <Topbar />
                {userData && (
                    <div className='p-2'>
                    <DataTable
                    columns={columns}
                    data={Object.values(userData)}
                    responsive
                    pagination
                    highlightOnHover
                    noDataComponent="No User Data found"
                    defaultSortFieldId={1}
                    customStyles={customStyles}
                    paginationComponentOptions={{
                        selectAllRowsItem:true
                    }}
                    onRowClicked={(row,event)=>{
                        console.log(row)
                        console.log(event)
                    }}
                    />
                    </div>
                    
                )}
            </div>
        </div>
    )
};
export default ListUser;