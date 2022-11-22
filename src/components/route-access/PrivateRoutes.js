import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loginStatus } from './selectors';

const PrivateRoute = ({ component, ...rest }) => {
  const isAuthenticated = useSelector(loginStatus);

  if (isAuthenticated) {
    return <Route component={component} {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
