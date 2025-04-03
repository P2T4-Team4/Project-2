import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import BookRecommendations from './pages/Recommend.tsx';
import WantToRead from './pages/WantToRead.tsx';
import ErrorPage from './pages/Bio.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/Recommended',
        element: <BookRecommendations />
      },
      {
        path: '/ReadPage',
        element: <ErrorPage />
      },
      {
        path: '/WantToRead',
        element: <WantToRead />
      },
      {
        path: '/Bio',
        element: <ErrorPage />
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
};


