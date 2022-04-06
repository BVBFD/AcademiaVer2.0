import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import HttpService from './service/http.js';
import { UserProvider } from './components/Context/Context.js';

const baseURL = process.env.REACT_APP_BASE_URL;
const httpService = new HttpService(baseURL);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App httpService={httpService} />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
