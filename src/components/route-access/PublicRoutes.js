import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loginStatus } from './selectors';

const PublicRoutes = ({ component, ...rest }) => {
  const isLoggedIn = useSelector(loginStatus);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Route {...rest} component={component} />;
  }
};

export default PublicRoutes;
