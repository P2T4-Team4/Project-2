import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserLogin
import { getBookLists } from "../api/booksAPI";  // Import the function to get the books list


const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();  // Get the navigate function for navigation

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      Auth.login(data.token);  
      const bookLists = await getBookLists(data.token);
      localStorage.setItem('wantToRead', JSON.stringify(bookLists.wantToRead))  
      localStorage.setItem('readBooks', JSON.stringify(bookLists.readBooks))
      navigate('/');  // Redirect to the home page after successful login
    } catch (err) {
      setError('Invalid username or password');  // Set error message if login fails
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  // Handle navigation to the register page
  const handleRedirectToRegister = () => {
    navigate('/register');  // Navigate to the register page
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>

      {/* Redirect to Register page button */}
      <div className="form-group">
        <p>Don't have an account? <button className="btn btn-link" onClick={handleRedirectToRegister}>Register here</button></p>
      </div>
    </div>
  );
};

export default Login;

