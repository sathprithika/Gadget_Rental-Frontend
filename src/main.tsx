import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Auth0Provider
        domain="dev-z2yi34ld63oonr6k.us.auth0.com"
        clientId="FB59ITmWgswYOVCFyKENNnPpySd5Hgtn"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >
      <App />
    </Auth0Provider>
    
  </React.StrictMode>,
)
