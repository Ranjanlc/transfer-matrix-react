import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CollegeContextProvider } from './store/college-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <CollegeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CollegeContextProvider>
  // </React.StrictMode>
);
