import React, { useEffect } from 'react';
import Provider from './i18n/Provider';

import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import history from './history';

import Home from './components/pages/home';
import Header from './components/ui/header';
import Login from './components/pages/login';
import Search from './components/pages/search';
import Product from './components/pages/product';
import Register from './components/pages/register';
import Dashboard from './components/pages/dashboard';
import NotFound from './components/pages/not-found';
import PublicRoutes from './components/access_to_routes/PublicRoutes';
import PrivateRoutes from './components/access_to_routes/PrivateRoutes';

import { getCategories } from './components/ui/header/actions';
import { getHomePageProducts } from './components/pages/home/actions';
import { getProducts } from './components/pages/product/actions';
import { defaultUrl } from './utils';

import { selectedLanguage } from './components/ui/header/selectors';

import './index.scss';

function App() {
  const dispatch = useDispatch();
  const language = useSelector(selectedLanguage);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getHomePageProducts());
    dispatch(getProducts(defaultUrl()));
  }, [dispatch]);

  return (
    <Provider locale={language}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <PublicRoutes exact path="/login" component={Login} />
          <PublicRoutes exact path="/register" component={Register} />
          <PrivateRoutes exact path="/dashboard" component={Dashboard} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/category/:category" component={Product} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
