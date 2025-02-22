import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store.js";
import { Provider } from "react-redux";

import { Auth0Provider } from '@auth0/auth0-react';

// auth0 database information removed for security reasons
const AUTH0_DOMAIN = "";
const AUTH0_CLIENT_ID = "";

createRoot(document.getElementById('root')).render(
  <>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <Provider store={store}>
        <ToastContainer position="top-center" />
        <App />
      </Provider>
    </Auth0Provider>
  </>
);
