import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DepositContextProvider } from "./context/DepositContext";
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DepositContextProvider>
        <App />
      </DepositContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);