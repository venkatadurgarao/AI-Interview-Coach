import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from './layouts/AuthLayout.tsx';
import Login from './pages/auth/Login.tsx';
import { RouterProvider } from 'react-router/dom';

import './App.css'
import { Layout } from './layouts/Layout.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import ProtectedRoute from './routes/protectedRoute.tsx';
import { InterviewStart } from './pages/dashboard/InterviewStart.tsx';
import Register from './pages/auth/Register.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import InterviewActive from './pages/dashboard/InterviewActive.tsx';
import { InterviewSetup } from './pages/dashboard/InterviewSetup.tsx';
import InterviewHistory from './pages/dashboard/InterviewHistory.tsx';
import InterviewAnalytics from './pages/dashboard/InterviewAnalytics.tsx';

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
          path: "register",
          element: <ErrorBoundary fallback={<div>Register Page has some issues please try again</div>} ><Register /></ErrorBoundary>
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
            },
            {
              path: "/interview_start/:interview_id?",
              element: <InterviewStart />
            },
            {
              path: "interview_active",
              element: <InterviewActive />
            },
            {
              path: "interview_setup",
              element: <InterviewSetup />
            },
            {
              path: "interview_history",
              element: <InterviewHistory />
            },
            {
              path: "interview_analytics",
              element: <InterviewAnalytics />
            },

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
