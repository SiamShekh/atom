import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './routes'
import WebApp from '@twa-dev/sdk'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from 'sonner'

WebApp.setHeaderColor("#000000");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen" data-theme="black">
      <Provider store={store}>
        <RouterProvider router={route} />
        <Toaster />
      </Provider>
    </div>
  </React.StrictMode>
)
