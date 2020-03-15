import React, {useState, useEffect} from 'react'
import {
    PageHeader, Table, Button
} from 'antd'

function UserManagement(props) {
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";
    const [users, setUsers] = useState([])

    useEffect(()=> {
        fetch(URL+"/fetchusersdata", {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({token : localStorage.getItem('adminToken')})
        })
        .then(res=>res.json())
        .then(data => setUsers(data))
    },[])

    const handleBlock = (userId) => {
        fetch(URL+"/handleblock/"+userId, {
            method : 'get'
        })
        .then(data => {
            setUsers(users => users.map(user => {
                // console.log(users)
                if(user.id === userId)
                    user.blocked = !user.blocked
                return user
            }))
        })
    }

    const columns = [
        {
            title : "UserId",
            dataIndex : 'id'
        },
        {
            title : "Mail",
            dataIndex : "mail"
        },
        {
            title : "Action",
            dataIndex : 'blocked',
            render:(blocked, data)=>   <Button type={blocked ? "" : "primary"} onClick={()=>handleBlock(data.id)}>{blocked ? "Unblock" : "Block"}</Button>
        }
    ]
    
    return (
        <div>
            <PageHeader
                title="User Management"
            />
            <Table
                dataSource={users}
                columns={columns}
            />
            {/* {
                users.map((user,i) => {
                    return <div style={{
                        minWidth:"300px"
                    }}>
                        {user.mail}
                    </div>
                })
            } */}
        </div>
    )
}

export default UserManagement
