import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/AppRouter'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
