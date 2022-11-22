import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';

import {
  language,
  categories,
  productsBySearch,
} from './components/components/header/reducers';

import { search } from './components/components/product_display/pagination/reducers';
import { basket } from './components/components/product_display/row/reducers';
import { tokenRequest } from './components/components/resend_token/reducers';
import { home_page_products } from './components/pages/home/reducers';
import { theme } from './components/components/toggles/reducers';
import { relatedProducts } from './components/ui/modal/reducer';
import { register } from './components/pages/register/reducers';
import { products } from './components/pages/product/reducers';
import { billing } from './components/pages/payment/reducers';
import { login, tokens } from './components/pages/login/reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import history from './history';
import { sagas } from './saga';

const combinedReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    language,
    theme,
    login,
    tokens,
    register,
    tokenRequest,
    categories,
    productsBySearch,
    products,
    home_page_products,
    relatedProducts,
    search,
    basket,
    billing,
  });

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

export const persistedReducer = persistReducer(
  persistConfig,
  combinedReducers(history)
);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(logger, sagaMiddleware, routerMiddleware(history))
    // ADD CONDITION FOR DEV ENV
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(sagas);
export const persistor = persistStore(store);
