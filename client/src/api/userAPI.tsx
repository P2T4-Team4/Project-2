// Assuming `Auth` utility is being used to retrieve the token.
// import Auth from '../utils/auth.js';
// import { UserLogin } from "../interfaces/UserLogin";

const retrieveUsers = async () => {
  try {
    // Get the token from localStorage (or Auth utility)
    const token = localStorage.getItem('jwtToken');  // Alternatively, use `Auth.getToken()`

    // If there's no token, return an empty array or handle it appropriately
    if (!token) {
      throw new Error('No token found! Please log in.');
    }

    // Send a request to the backend with the Authorization header
    const response = await fetch('/api/users', {  // Make sure URL is correct
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      }
    });

    const data = await response.json();


    if (!response.ok) {
      throw new Error(`Error fetching users: ${data.message}`);
    }

    return data;  // Return the fetched data

  } catch (err) {
    console.log('Error from data retrieval:', err);  // Log error
    return [];  
  }
}





export { retrieveUsers };

