import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Signin from './components/Signin/Signin'
import Addproduct from './components/Products/AddProduct'
import AllProducts from './components/Products/AllProducts'
import AvailableToday from './components/Products/AvailableToday'
import Orders from './components/Orders'
import Report from './components/Report'

function AppRouter() {
    return (
        <div>   
            <Router>
                <Switch>
                    <Route exact path="/" component={Signin}/>
                    <PrivateRoute path="/home" component={()=> <h1>Hello</h1>}/>
                    <PrivateRoute path="/allproducts" component={AllProducts}/>
                    <PrivateRoute path='/addproduct' component={Addproduct}/>
                    <PrivateRoute path='/availabletoday' component={AvailableToday}/>
                    <PrivateRoute path='/orders' component={Orders}/>
                    <PrivateRoute path='/report' component={Report}/>
                    {/* <PrivateRoute path='/addadmin' component={AddAdmin}/>
                    <PrivateRoute path='/manageusers' component={Users}/> */}
                </Switch>
            </Router>
        </div>
    )
}


export default AppRouter
