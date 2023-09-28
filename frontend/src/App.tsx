import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider';
import LandingPage from './pages/Landing';
import AuthenticationPage from './pages/Authentication';
import Layout from './pages/layout';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/auth',
      element: <AuthenticationPage />
    },
    {
      path: '/dashboard',
      element: <Layout />,
      children: [
        {
          path: '/dashboard/',
          element: <h1>Dashboard</h1>
        },
        {
          path: '/dashboard/search',
          element: <h1>Search</h1>
        },
        {
          path: '/dashboard/profile',
          element: <h1>Profile</h1>
        }
      ]
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
