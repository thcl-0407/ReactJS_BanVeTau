import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import LichTrinhContextProvider from "./contexts/LichTrinhContext"
import VeContextProvider from "./contexts/VeContext"

ReactDOM.render(
  <React.StrictMode>
    <LichTrinhContextProvider>
      <VeContextProvider>
        <App></App>
      </VeContextProvider>
    </LichTrinhContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

