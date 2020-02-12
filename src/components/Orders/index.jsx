import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'


function Orders() {

    const [orders, setOrders] = useState([])
    const [otp, setOtp] = useState({})
    
    useEffect(() => {
        getPendingProducts()
    },[])

    const getPendingProducts = () => {
        fetch("http://localhost:4000/getpendingorders", {
            method : 'get'
        })
        .then(res => res.json())
        .then(res => setOrders(res))
    }

    const resolveBill = (orderId) => {
        fetch("http://localhost:4000/resolveorder", {
            method : 'post',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                token : localStorage.getItem('adminToken'),
                orderId
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return getPendingProducts()
        })
    }

    return (
        <div>
            {orders.map((order,i) => {
                console.log(order)
                return <div style={{boxShadow:"0px 0px 5px 3px lightgray",padding:"5px 12px", textAlign:"center",width:"320px",display:"inline-block",margin:"10px"}} key={i}>
                    <h2>
                        {`Bill No #${order.id}   |   Customer Id #${order.userId}`}
                        <hr style={{width:"90%",borderTop:"1px solid lightgray"}}/>
                        <table style={{padding:"3px",width:"100%",fontSize:"12px",margin:"10px 0px"}}>
                            <tr style={{backgroundColor:"lightgray"}}>
                                <th style={{padding:"3px"}}>S.No</th>
                                <th style={{padding:"3px"}}>Name</th>
                                <th style={{padding:"3px"}}>Quantity</th>
                            </tr>
                            {order.orderItems.map((item,i) => {
                                return <tr>
                                    <td style={{padding:"3px"}}>{i+1}</td>
                                    <td style={{padding:"3px"}}>{item.product.name}</td>
                                    <td style={{padding:"3px"}}>{item.quantity}</td>
                                </tr>
                            })}
                        </table>
                        <Input id={order.id} value={otp[order.id]?otp[order.id]:undefined} placeholder="OTP" style={{width:"100px",marginRight:"10px"}} onChange={(e)=> setOtp({
                            ...otp,
                            [e.target.id] : parseInt(e.target.value)
                        })}/><Button type="primary" onClick={()=>order.otp === otp[order.id]?resolveBill(order.id):alert("OTP incorrect")}>Close Order</Button>
                    </h2>
                </div>
            })}
        </div>
    )
}

export default Orders
