import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by checking for the access token
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://3.24.169.3/api/account/login', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        
        
        //check if admin
        const responseGet = await axios.get('http://3.24.169.3/api/account/get/', {
             
            headers: {
              Authorization: `Bearer ${response.data.access}`,
            },
          });

        if(responseGet.data.permission_level!==1){
            console.log(" wrong permission: ", responseGet.data.permission_level);
            throw error(" wrong permission: ", responseGet.data.permission_level);
            
        }

        
        
        
        
        // Store the tokens
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);



        

        // Set logged-in state
        setIsLoggedIn(true);

        // Optionally, redirect the user to another page, like a dashboard
        console.log('Login successful!');
        navigate('/admin');
      }
    } catch (error) {
      setError('Invalid login credentials. Please try again.');
      console.error('Error logging in', error);
    }
  };

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Set logged-out state
    setIsLoggedIn(false);

    // Optionally, navigate to login or another page
    //navigate('/login');
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </p>
          <p>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;

