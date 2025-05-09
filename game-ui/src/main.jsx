import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

const msalConfig = {
  auth: {
    clientId: "e0f00df6-96ff-4ec6-ba12-2d5db367c482", // ton App ID
    authority: "https://login.microsoftonline.com/d5f60241-0fe3-4112-b218-a129fdb11b22",
    redirectUri: "https://8d6a-20-234-154-181.ngrok-free.app"
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
);