import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Helmet} from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { CallLogProvider } from './Pages/ContextPage/Context.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CallLogProvider>
        <Helmet>
          <App />
        </Helmet>
      </CallLogProvider>
    </StrictMode>
)
