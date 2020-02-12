import React, {useState} from 'react'
import axios from 'axios'
import {
    Input, Button, PageHeader
} from 'antd'
import {withRouter} from 'react-router-dom'

function AddProduct(props) {
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [file, setFile] = useState({})

    const handleProductAdd = async () => {
        const reg = /^-?[0-9]*(\.[0-9]*)?$/;
        var image =''
        if(price.trim().length!==0 && name.trim().length!==0 && reg.test(price)){
            var formData = new FormData()
            formData.append('profile',file)
            await axios.post("http://localhost:4000/profile",formData,{
                headers : { 'Content-Type' : 'multipart/form-data' }           
            })
            .then(response => {
                image = "http://localhost:4000/uploads/"+ response.data.filename
                return
            })

            fetch("http://localhost:4000/addproduct", {
                method : "post", 
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify({name,price,image})
            })
            .then(res=>res.json())
            .then(res=> {
                if(res.id)
                    props.history.push('/allproducts')
                else{
                    alert("Product Adding Failed")
                }
            })
        } else 
            alert("Enter Valid Product Details")
    }
    return (
        <div>
            <PageHeader
                title="Add New Product"
            />
            <div>
                <label>Name</label>
                <Input style={{ width:"300px", margin:"20px"}} onChange={(e)=>setName(e.target.value)}></Input>
            </div>
            <div>
                <label>Price</label>
                <Input addonBefore={<span> ₹ </span>}  style={{ verticalAlign:"top",width:"300px", margin:"0px 20px 20px 20px"}} onChange={(e)=>setPrice(e.target.value)} type="integer"></Input>
            </div>
            <div>
                <label>Image</label>
                <Input type="file" onChange={(e)=>setFile(e.target.files[0])} style={{ width:"300px",height : "40px",border : "none", margin:"5px 20px 5px 15px"}}/>
            </div>
            <Button type="primary" onClick={handleProductAdd}>Add</Button>
        </div>
    )
}

export default withRouter(AddProduct)
