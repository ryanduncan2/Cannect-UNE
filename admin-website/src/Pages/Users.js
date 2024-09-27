import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Auth/api'; // Assuming this is the api instance
import Back from '../CommonComponents/Back';

const Users = () => {
  const [addingUser, setAddingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/account/getAll', {
          params: {
            count: 100,
            offset: 0,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('There has been a problem with your axios operation:', error);
        navigate('/'); // Navigate to login if there's an error
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleAddUser = () => {
    setAddingUser(!addingUser);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      const response = await api.post('/account/register', formData);

      console.log('User created:', response.data);
      alert('User created successfully!');
      setAddingUser(false);
      setFormData({
        username: '',
        password: '',
        email: '',
        
      });
      window.location.reload(); // Reload to see the new user
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <>
      <Back/>
      <h2>Users</h2>
      <button onClick={handleAddUser}>{!addingUser ? 'Add User' : 'Cancel'}</button>
      {addingUser && (
        <>
          <p>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </p>

          
          <p>
            <button onClick={handleCreateUser}>Create User</button>
          </p>
        </>
      )}
      <ul>
        {users.length > 0 ? (
          users.sort((a, b) => a.username.localeCompare(b.username)).map((user) => (
            <li key={user.public_id}>
              <p>
                <Link to={`${user.public_id}`}>
                  {user.username} ({user.email})
                </Link>
              </p>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
};

export default Users;


