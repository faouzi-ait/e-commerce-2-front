import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.login);

  if (loggedIn) {
    return <Route {...rest} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
