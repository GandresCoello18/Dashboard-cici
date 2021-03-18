/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import './app.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-multi-carousel/lib/styles.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { MeContextProvider } from './context/contextMe';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MeContextProvider>
        <App />
      </MeContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('#root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
