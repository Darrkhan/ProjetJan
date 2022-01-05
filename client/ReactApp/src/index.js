import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <div className='fill-window'>
        <App />
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);