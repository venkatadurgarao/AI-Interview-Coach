import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'



import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { SnackbarContainer } from './components/SnackbarContainer.tsx'

createRoot(document.getElementById('root')!).render(
  // <RouterProvider router={router} />
  <StrictMode>
    <Provider store={store}>
      <App />

      <SnackbarContainer />
    </Provider>
  </StrictMode>,
)
