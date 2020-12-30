import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({ component, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.login);

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Route {...rest} component={component} />;
  }
};

export default PublicRoutes;
