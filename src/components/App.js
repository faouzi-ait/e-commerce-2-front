import React from 'react';
import Provider from '../i18n/Provider';

import { useSelector } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { selectedLanguage } from '../redux/selectors';
import history from '../history';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PublicRoutes from '../PublicRoutes';
import PrivateRoutes from '../PrivateRoutes';

import Header from './ui/Header';

import '../sass/index.scss';

function App() {
  const language = useSelector(selectedLanguage);

  return (
    <Provider locale={language}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoutes exact path="/login" component={Login} />
          <PublicRoutes exact path="/register" component={Register} />
          <PrivateRoutes exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
