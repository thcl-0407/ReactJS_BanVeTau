import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
      <CookiesProvider>
          <App></App>
      </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

