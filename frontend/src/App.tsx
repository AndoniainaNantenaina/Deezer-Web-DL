import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider';
import { Main } from './pages/main';
import Home from './pages/home';
import Download from './components/Download';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/home',
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
