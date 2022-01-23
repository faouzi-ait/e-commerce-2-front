import React, { useEffect } from 'react';
import Provider from './i18n/Provider';

import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
// import history from './history';

import Cart from './components/pages/cart';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Search from './components/pages/search';
import Payment from './components/pages/payment';
import Product from './components/pages/product';
import Register from './components/pages/register';
import NotFound from './components/pages/not-found';
import Header from './components/components/header';
import Dashboard from './components/pages/dashboard';
import PublicRoutes from './components/route-access/PublicRoutes';
import PrivateRoutes from './components/route-access/PrivateRoutes';

import { getCategories } from './components/components/header/actions';
import { getHomePageProducts } from './components/pages/home/actions';
import { getProducts } from './components/pages/product/actions';
import { defaultUrl } from './utils';

import { selectedLanguage } from './components/components/header/selectors';

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
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/checkout" component={Cart} />
          <Route exact path="/search" component={Search} />
          <PrivateRoutes exact path="/payment" component={Payment} />
          <PublicRoutes exact path="/login" component={Login} />
          <PublicRoutes exact path="/register" component={Register} />
          <Route exact path="/category/:category" component={Product} />
          <PrivateRoutes exact path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
