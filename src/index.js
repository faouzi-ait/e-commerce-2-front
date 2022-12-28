import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

import { PersistGate } from 'redux-persist/es/integration/react';
// import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { store, persistor } from './store';
// import history from './history';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      {/* </ConnectedRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
