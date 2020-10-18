import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import reducer from './store/reducer'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(reducer, composeWithDevTools()); 

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/'

axios.interceptors.request.use(request => {
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
  return Promise.reject(error)
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
