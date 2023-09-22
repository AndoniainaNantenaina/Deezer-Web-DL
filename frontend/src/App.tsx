import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Layout from './pages/layout';
import Donate from './pages/donate';
import About from './pages/about';
import AuthProvider from './provider/AuthProvider';
import AuthPage from './pages/auth';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'auth',
          element: <AuthPage />
        },
        {
          path: 'download',
          element: <Home />,
        },
        {
          path: 'donate',
          element: <Donate />
        },
        {
          path: 'about',
          element: <About />
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
