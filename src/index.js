import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RadioProvider } from './utils/context/RadioContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RadioProvider>
      <App />
    </RadioProvider>
  </React.StrictMode>
);
