import axios from 'axios';

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post('http://3.24.169.3/api/account/refresh', {
      refresh: refreshToken, // Send refresh token
    });
    const newAccessToken = response.data.access;
    // Store new access token in localStorage
    localStorage.setItem('access_token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null; // Return null if refresh fails
  }
};