import React,{ useState, useEffect } from 'react'
import {
    PageHeader, Table
} from 'antd'


function AllProducts() {
    // eslint-disable-next-line
    const [ products, setProducts ] = useState([]) 
    const [dataSource, setDataSource]=useState([])
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";

    useEffect(() => {
        fetchAllProducts()
    },[])

    const fetchAllProducts = () => {
        fetch(URL+"/allproducts", {
            method : 'get',
        })
        .then(res => res.json())
        .then(products => {
            console.log(products)
            return setProducts(products)
        })
    }

    useEffect(() => {
        var data = products.map((product,i)=> {
            return {
                sno:i+1,
                key:i,
                id:product.id,
                name : product.name,
                price : product.price
            }
        })
        setDataSource(data)
    },[products])

    const removeProduct = id => {
        fetch(URL+"/deleteproduct", {
            method : "delete",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(res => fetchAllProducts())
    }

    const columns=[
        {
            title : "S.No",
            dataIndex: 'sno'
        },
        {
            title : "Name",
            dataIndex : 'name'
        },
        {
            title : "Price",
            dataIndex : 'price'
        },
        {
            title : "Action",
            render :(data) => 
                <p onClick={()=> removeProduct(data.id)}style={{textDecoration : "underline", color:"blue",cursor:"pointer" }}>Delete</p>
        }
    ]

    return (
        <div>
            <PageHeader
                title="All Products"
            />
            <Table dataSource={dataSource} columns={columns}/>
        </div>
    )
}

export default AllProducts
