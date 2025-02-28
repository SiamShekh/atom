import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './routes'
import WebApp from '@twa-dev/sdk'

WebApp.setHeaderColor("#000000");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen" data-theme="black">
      <RouterProvider router={route} />
    </div>
  </React.StrictMode>,
)
