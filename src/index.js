import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { PersistGate } from 'redux-persist/es/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { store, persistor } from './store';
import history from './history';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
