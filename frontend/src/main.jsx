import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TokenProvider from './TokenProvider.jsx'
import axios from 'axios'

axios.defaults.baseURL =import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
    <App />
    </TokenProvider>
  </StrictMode>,
)
