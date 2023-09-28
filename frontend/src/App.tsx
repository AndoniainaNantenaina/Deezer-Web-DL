import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider';
import { Main } from './pages/main';
import Home from './pages/home';
import Download from './components/Download';
import LandingPage from './pages/Landing';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/auth',
      element: <h1>Authentication</h1>
    },
    {
      path: '/dashboard',
      element: <Home />,
      children: [
        {
          path: 'download',
          element: <Download />
        },
        {
          path: 'about',
          element: <h1>About</h1>
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
