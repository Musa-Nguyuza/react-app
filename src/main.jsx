import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {HelmetProvider} from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { CallLogProvider } from './Pages/ContextPage/Context.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CallLogProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CallLogProvider>
    </StrictMode>
)
