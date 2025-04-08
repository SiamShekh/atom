import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './routes'
import WebApp from '@twa-dev/sdk'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from 'sonner'
import ContextUri from './utils/ContextUri'

WebApp.setHeaderColor("#000000");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen" data-theme="black">
      <Provider store={store}>
        <ContextUri>
          <RouterProvider router={route} />
          <Toaster />
        </ContextUri>
      </Provider>
    </div>
  </React.StrictMode>
)
