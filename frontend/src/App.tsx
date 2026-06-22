import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from './layouts/AuthLayout.tsx';
import Login from './pages/auth/Login.tsx';
import { RouterProvider } from 'react-router/dom';

import './App.css'
import { Layout } from './layouts/Layout.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import ProtectedRoute from './routes/protectedRoute.tsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: "login",
          element: <Navigate to={'/'} />
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />
            }
          ]
        }
      ]
    }
  ]
)

function App() {

  return <RouterProvider router={router} />
}

export default App
