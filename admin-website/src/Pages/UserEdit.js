import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Auth/api'; // Importing the api instance
import Back from '../CommonComponents/Back';

const UserEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    new_username: '',
    new_password: '',
    new_email:'',
    new_isAdmin:false,
  });

  // Fetch the clinic data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/account/getOther/', {
          params: { account_id: id },
        });
        
        setFormData({
          new_username: response.data.username || '',
          new_password: '',
          new_email: response.data.email || '',
          new_isAdmin:response.data.permission_level>0 ||'',
          
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/admin/users');
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditClinic = async () => {
    try {
      const userConfirmed = window.confirm('Are you sure you want to change these user details?');
      if (!userConfirmed) {
        return; // Exit if user cancels
      }

      const updatedData = { account_id: id, ...formData };

      const response = await api.post('/account/updateOther', updatedData);
      if (response.status===200){
        console.log("we will try to add admin status");
        ///api/account/elevateAdmin
        //formData.new_isAdmin ? :
        const r = formData.new_isAdmin ?  
                    await api.post('/account/elevateAdmin', {account_id:id}) :
                    await api.post('/account/removeAdmin', {account_id:id}) ;

        console.log("successfully elevating/removing admin?: ",r.status);
      }



      console.log('User updated successfully:', response.data);
      navigate('/admin/users', { replace: true }); // Redirect after successful update
    } catch (error) {
      console.error('Failed to update clinic:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <> 
      <Back to={`/admin/users/${id}`} />
      <h2>Edit {formData.new_username}</h2>
      <p>
        <label>
          Name:
          <input type="text" name="new_username" value={formData.new_username} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Password:
          <input type="text" name="new_password" value={formData.new_password} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Email:
          <input type="text" name="new_email" value={formData.new_email} onChange={handleChange} />
        </label>
      </p>
      <p>
            <label>
              Admin:
              <input
                type="checkbox"
                name="new_isAdmin"
                checked={formData.new_isAdmin}
                onChange={handleChange}
              />
            </label>
          </p>
       
       
       
       
       
      <p>
        <button onClick={handleEditClinic}>Save Changes</button>
      </p>
    </>
  );
};

export default UserEdit;