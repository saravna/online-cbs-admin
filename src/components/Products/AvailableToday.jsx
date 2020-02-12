import React, {useEffect, useState} from 'react'
import {
    Table, Input, Button, PageHeader
} from 'antd'


function AvailableToday() {
    const [ products, setProducts ] = useState([]) 
    const [ dataSource, setDataSource] = useState([])
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";

    useEffect(() => {
        var data = products.map((product,i) => {
            return {
                sno : i+1,
                name : product.name,
                key : product.id,
                quantity : product.menu.quantity
            }
        })
        setDataSource(data)
    },[products])

    const columns = [
        {
            title : 'S.No',
            dataIndex : 'sno',
            width : '10%'
        },
        {
            title : 'Name',
            dataIndex : 'name',
            width : '30%'
        },
        {
            title : "Quantity",
            dataIndex : 'quantity'
        },
        {
            title : 'New Quantity',
            render : (data) => {
                return <Input onChange={(e)=>handleQuantityChange(e.target.value,data.key)}  />
            },
            width : '30%'
        }
    ]

    const newQuantity ={}

    const handleQuantityChange = (value, id) => {
        newQuantity[id]=value
    }

    const handleSubmit = () => {
        // console.log(newQuantity)
        var keys = Object.keys(newQuantity)
        var values = Object.values(newQuantity)
        // console.log(keys,values)
        var bodyData = keys.map((key,i) => {
            return {
                productId : key,
                quantity : values[i]
            }
        })
        // console.log(bodyData)   
        fetch(URL+"/updatequantity", {
            method : "put",
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({newQuantity : bodyData})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return fetchAllMenu()
        })
    }

    useEffect(() => {
        fetchAllMenu()
    },[])

    const fetchAllMenu = () => {
        console.log("Hit")
        fetch(URL+"/allproductswithquantity", {
            method : 'get',
        })
        .then(res => res.json())
        .then(products => setProducts(products))    
    }

    useEffect(() => {
        
    })
    
    return (
        <div>
            <PageHeader
                title="Available Today"
            />
            <Table
                dataSource = {dataSource}
                columns = {columns}
                style={{width : "600px"}}
                pagination={false}
            />
            <Button onClick={handleSubmit} type="primary" style={{marginTop:"30px"}}>Submit</Button>
            {/* {products.map(product => {
                return <div>
                    <h1>{product.id}</h1>
                    <p>{product.name}</p>
                    <p>{product.menu.quantity}</p>
                </div>
            })} */}
        </div>
    )
}

export default AvailableToday
