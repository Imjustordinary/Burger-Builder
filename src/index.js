import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BurgerReducer from './Store/BurgerReducer'
import OrderReducer from './Store/OrderReducer'
import {createStore, applyMiddleware,compose,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import AuthReducer from './Store/Auth'
import createSagaMiddleware from 'redux-saga'
import {watchAuth} from './Store/Saga/watchAuth'

const SageMiddleware = createSagaMiddleware()


const reducer = combineReducers({
  BurgerReducer:BurgerReducer,
  OrderReducer:OrderReducer,
  Auth: AuthReducer
})
const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null 
                          || compose
const Store = createStore(reducer,composeEnhancers(applyMiddleware(thunk,SageMiddleware)))

SageMiddleware.run(watchAuth)

ReactDOM.render(
  <Provider store={Store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
