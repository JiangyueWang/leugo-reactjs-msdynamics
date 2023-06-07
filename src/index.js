import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './context/authConfig';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import './assets/index.css';
import { AuthProvider } from './context/UserAuthContext';
const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </MsalProvider>
  </React.StrictMode>
);

