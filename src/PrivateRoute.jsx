import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation';

const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={props => (
        localStorage.getItem('adminToken') 
        ? (
      <Navigation content={Component} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    ))
    }
  />
);

export default PrivateRoute;
