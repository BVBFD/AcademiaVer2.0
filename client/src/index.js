import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import HttpService from './service/http.js';

const baseURL = process.env.REACT_APP_BASE_URL;
const httpService = new HttpService(baseURL);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App httpService={httpService} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
