import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
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
