import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Layout from './pages/layout';
import Donate from './pages/donate';
import About from './pages/about';

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
          path: 'about',
          element: <About />
        },
        {
          path: 'donate',
          element: <Donate />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
