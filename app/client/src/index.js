import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='fill-window'>
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);