import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Auth/api'; // Assuming this is the api instance
import Back from '../CommonComponents/Back';
//import Home from '../CommonComponents/Home';
//import { refreshAccessToken } from '../Auth/auth';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/account/getOther', {
          params: {
            account_id: id
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('There has been a problem with your axios operation:', error);
        navigate('/'); // Navigate to login if there's an error
      }
      finally{
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id,navigate]);



  const handleEditUser = () => {
    navigate('edit');
  };

  const handleDeleteUser = async () => {
    try {
        const userConfirmed = window.confirm('Are you sure you want to delete this user?');
        if (!userConfirmed) {
            return
        }
        const deleteData = {
          account_id: id
      };
        console.log("delete data is :", deleteData);
        const response = await api.delete('/account/deleteOther', {
          data: deleteData, // This correctly sends the body data
      });        
            console.log(response);
            console.log('Clinic updated deleted:', response.data);
            navigate('/admin/users');
          } catch (error) {
            console.error('There has been a problem with your axios operation:', error);
            navigate('/'); // Navigate to login if there's an error
          }
  };

  return (
    <> <Back to="/admin/users" /> 
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        user ? (
          <div>
            <h2>{user.username}</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>User Level: {user.permission_level===1 ? 'Admin':'User'}</p>
            <p>
              <button onClick={handleEditUser}>Edit User</button>
            </p>
            <p>
              <button onClick={handleDeleteUser}>Delete User</button>
            </p>
          </div>
        ) : (
          <p>Failed to load user data</p>
        )
      )}
    </div>
    </>
  );
};

export default User;




