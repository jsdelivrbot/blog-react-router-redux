import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './routes';
import promise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(
// promise cuida das promises antes delas chegarem ao reducers
  promise
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router />
  </Provider>
  , document.querySelector('.container'));
