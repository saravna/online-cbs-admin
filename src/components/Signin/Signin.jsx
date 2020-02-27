import React,{useState} from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
// import { withRouter } from 'react-router-dom'

function Signin(props) {
    const [mail,setMail] = useState('')
    const [password,setPassword] = useState('')
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";

    const handleSubmit = () => {
        if(mail.trim().length===0 || password.trim().length===0)
            return
        
        fetch(URL+"/signin",{
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                mail,
                password
            })
        })
        .then(res=>res.json())
        .then(res => {
            console.log(res)
            if(res.authToken){
                localStorage.setItem("adminToken",res.authToken)
                props.history.push('/home')
            } else {
                notification.error({
                    message : "Not a valid Admin User",
                    duration : 2
                })
            }
        })
    }

    return (
        <div>
            <h1 style={{fontWeight:"1000", fontSize : "45px"}}>ADMIN SITE</h1>
            <div style={{
                    minWidth : "30vw",
                    backgroundColor:"#9c46ff",
                    padding : "30px",
                    borderRadius:"8px",
                    position:"absolute",
                    left:"50%",
                    transform:"translateX(-50%)"
                }}>
                <h1 style={{color:"white"}}>Login</h1>
                <Form className="login-form">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onChange={(e)=> setMail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button  onClick={handleSubmit} htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Signin


