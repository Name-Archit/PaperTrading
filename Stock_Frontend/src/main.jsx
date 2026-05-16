import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StockProvider } from './context/StockContext'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StockProvider>
        <App />
      </StockProvider>
    </BrowserRouter>
  </React.StrictMode>,
)