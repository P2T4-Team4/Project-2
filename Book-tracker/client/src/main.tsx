import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import BookRecommendations from './pages/Recommend.tsx';
import WantToRead from './pages/WantToRead.tsx';
import ErrorPage from './pages/Bio.tsx';
import ReadPage from './pages/ReadPage.tsx';
import Bio from './pages/Bio.tsx';
import Register from './pages/register.tsx';
import { Navigate } from 'react-router-dom';
import Auth from './utils/auth.js'; // Import the Auth utility for managing authentication state
import SearchResultsPage from './pages/Search.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: Auth.loggedIn() ? <Home /> : <Navigate to="/login" />,
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/home',
        element: Auth.loggedIn() ? <Home /> : <Navigate to="/login" />,
      },
      {
        path: '/Recommended',
        element: Auth.loggedIn() ? <BookRecommendations /> : <Navigate to="/login" />,
      },
      {
        path: '/ReadPage',
        element: Auth.loggedIn() ? <ReadPage /> : <Navigate to="/login" />,
      },
      {
        path: '/WantToRead',
        element: Auth.loggedIn() ? <WantToRead /> : <Navigate to="/login" />,
      },
      {
        path: '/Bio',
        element: Auth.loggedIn() ? <Bio /> : <Navigate to="/login" />,
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/Search',
        element: Auth.loggedIn() ? <SearchResultsPage /> : <Navigate to="/login" />,
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
};


