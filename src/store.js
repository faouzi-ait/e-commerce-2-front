import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import { language, categories } from './components/ui/header/reducers';
import { theme } from './components/ui/toggles/reducers';
import { login } from './components/pages/login/reducers';
import { register } from './components/pages/register/reducers';
import { products } from './components/pages/product/reducers';
import { home_page_products } from './components/pages/home/reducers';
import { tokenRequest } from './components/ui/resend_token/reducers';
import { search } from './components/ui/ProductDisplay/pagination/reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import { sagas } from './saga';

const combinedReducers = combineReducers({
  language,
  theme,
  login,
  register,
  tokenRequest,
  categories,
  products,
  home_page_products,
  search,
});

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

export const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(logger, sagaMiddleware)
    // ADD CONDITION FOR DEV ENV
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(sagas);
export const persistor = persistStore(store);
