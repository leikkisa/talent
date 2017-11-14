import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise'
import { BrowserRouter, Route, browserHistory} from 'react-router-dom';

import routes from '../shared/routes'
import reducers from '../shared/reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.hydrate(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
