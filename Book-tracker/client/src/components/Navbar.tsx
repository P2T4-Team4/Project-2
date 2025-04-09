import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import auth from '../utils/auth.js';
import '../CSS/Navbar.css';
import SearchBar from './SearchBar.js';

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState<any[]>([]);

const navigate = useNavigate();

const isLoginPage = window.location.pathname === '/login';  // Check if the current page is the login page
  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };
  const handleSearch = (query: string) => {
    if (query) {
      navigate(`/search?q=${query}`); 
    }
  };
  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      <h1>Book Worm 🪱</h1>

      {/* Conditionally render the search bar if not on the login page */}
      {!isLoginPage && (
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      <div>
        {/* Only show the login button if not on the login page */}
        {!isLoginPage && !auth.loggedIn() && (
          <button className="btn" type="button">
            <Link to="/login">Login</Link>
          </button>
        )}

        {/* Conditionally render the navigation buttons based on login status */}
        {!isLoginPage && auth.loggedIn() && (
          <>
            <button className="btn" type="button">
              <Link to="/">Home🏡</Link>
            </button>
            <button className="btn" type="button">
              <Link to="/ReadPage">Books Read✔️</Link>
            </button>
            <button className="btn" type="button">
              <Link to="/WantToRead">Want to Read⭕</Link>
            </button>
            <button className="btn" type="button">
              <Link to="/Recommended">Recommended💡</Link>
            </button>
            <button className="btn" type="button">
              <Link to="/Bio">Bio📝</Link>
            </button>
            {/* Logout button */}
            <button className="btn" type="button" onClick={() => auth.logout()}>
              Logout
            </button>
          </>
        )}
      </div>
        </div>
      )};
  

export default Navbar;
