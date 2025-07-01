import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from './store.js';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH0_DOMAIN = "";      // removed for security reasons
const AUTH0_CLIENT_ID = "";   // removed for security reasons

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer position="top-center"/>
            <App />
          </PersistGate>
        </Provider>
    </Auth0Provider>
  </>,
)
