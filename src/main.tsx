import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Ensure TypeScript knows that the element exists and is not null
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Ensure your HTML file has <div id="root"></div>');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
