import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth.js';
import '../CSS/Navbar.css';
const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      <h1>
        Book Tracker📖
      </h1>
      <div>
        <button className="btn" type='button'>
          <Link to="/">Home🏡</Link>
        </button>
        <button className="btn" type='button'>
          <Link to="/ReadPage">Books Read✔️</Link>
        </button>
        <button className="btn" type='button'>
          <Link to="/WantToRead">Want to Read⭕</Link>
        </button>
        <button className="btn" type='button'>
          <Link to="/Recommended">Recommended💡</Link>
        </button>
        <button className="btn" type='button'>
          <Link to="/Bio">Bio📝</Link>
        </button>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            // Render login button if user is not logged in
            <button className="btn" type='button'>
              <Link to='/login'>Login</Link>
            </button>
          ) : (
            // Render logout button if user is logged in
            <button className="btn" type='button' onClick={() => {
              auth.logout();  // Call logout() method from auth utility on button click
            }}>Logout</button>
          )
        }
      </div>

    </div>
  )
}

export default Navbar;
