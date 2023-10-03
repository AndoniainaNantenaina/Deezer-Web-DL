import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider';
import LandingPage from './pages/Landing';
import AuthenticationPage from './pages/Authentication';
import Layout from './pages/layout';
import { Profile } from './components/Profile';
import Dashboard from './pages/dashboard';
import Search from './components/Search';

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
          element: <Dashboard />
        },
        {
          path: '/dashboard/search',
          element: <Search />
        },
        {
          path: '/dashboard/profile',
          element: <Profile />
        },
        {
          path: '/dashboard/:type/:id',
          element: <h1>Detail</h1>
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
