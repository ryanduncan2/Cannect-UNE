import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
///import Cannect_logo_updated from '../CommonComponents/Cannect_logo_updated.png'
import Home from '../CommonComponents/Home';

const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in by checking for the access token
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/');
        }
      }, [navigate]);

      const handleLogout = () => {
 
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
 
        navigate('/');
      };





  return (
    <>
    {/* <span   style={{  display: 'inline-block' }}>
    <img src={Cannect_logo_updated} alt="Description" style={{ width: '50px', height: '50px' }} />
    </span> */}
    <Home></Home>
    <h2>Admin Tools</h2>
    <div style={styles.style2}> 
        <p><Link to="users">users</Link></p>
        <p><Link to="clinics">clinics</Link></p>
        <p><Link to="feedback">feedback</Link></p>
        
        <p><button onClick={handleLogout}>Logout</button></p>
        
        </div>
        </>
  )
}

/** @type {React.CSSProperties} */
const styles = {
    style1:{
        display: 'flex',
        flexDirection:'column',
    }
};



export default Admin