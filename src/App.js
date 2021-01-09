import React from 'react';
import Provider from './i18n/Provider';

import { useSelector } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { selectedLanguage } from './redux/selectors';
import history from './history';

import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import Dashboard from './components/pages/dashboard/Dashboard';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import Header from './components/ui/header/Header';

import './sass/index.scss';

function App() {
  const language = useSelector(selectedLanguage);

  return (
    <Provider locale={language}>
      <Router history={history}>
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
