import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import { register } from "../api/authAPI";  // Import the register function from the API
import { UserRegister } from "../interfaces/UserRegister";  // Import the interface for UserRegister

const Register = () => {
  const [registerData, setRegisterData] = useState<UserRegister>({
    username: '',
    password: '',
  });
  
  const [successMessage, setSuccessMessage] = useState<string>(''); // State to store success message
  const [errorMessage, setErrorMessage] = useState<string>(''); // State to store error message
  
  const navigate = useNavigate();  // Get the navigate function for navigation
  
  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  // Handle form submission for registration
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the register API endpoint with registerData
      const data = await register(registerData);
      setSuccessMessage('Successfully registered, you are now logged in!');
      setErrorMessage('');
      navigate('/login');  // Redirect to the login page after successful registration
    } catch (err) {
      setErrorMessage('Registration failed. Please try again.');
      setSuccessMessage('');
      console.error('Failed to register', err);  // Log any errors that occur during registration
    }
  };

  return (
    <div className='form-container'>
      <form className='form register-form' onSubmit={handleSubmit}>
        <h1>Register</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={registerData.username || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={registerData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the register form */}
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Register;
