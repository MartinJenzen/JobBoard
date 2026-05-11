import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  // Wrapper component to enforce best practices and catch potential issues, such as deprecated APIs, side effects in render, etc.
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
