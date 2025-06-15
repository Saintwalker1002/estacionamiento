import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReservaProvider } from './context/ReservaContext';

createRoot(document.getElementById('root')).render(
  <ReservaProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </ReservaProvider>
)
