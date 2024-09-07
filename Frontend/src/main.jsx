import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { LoginProvider } from './Context/loginContext.jsx'
import { CookieProvider } from './Context/cookieContext.jsx'
import { CurrentSongProvider } from './Context/currentSongContext.jsx'
import { useReducer } from 'react'
import { AppProvider } from './Context/appContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AppProvider>
      <CurrentSongProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </CurrentSongProvider>
    </AppProvider>
  </>
)
