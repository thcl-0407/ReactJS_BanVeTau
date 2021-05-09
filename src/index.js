import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import LichTrinhContextProvider from "./contexts/LichTrinhContext"

ReactDOM.render(
  <React.StrictMode>
    <LichTrinhContextProvider>
      <App></App>
    </LichTrinhContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

