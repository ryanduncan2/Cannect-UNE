import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Auth/api'; // Importing the api instance
import Back from '../CommonComponents/Back';

const ClinicEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    pharmacy_choice: false,
    referral_required: false,
    telehealth: false,
    concession_pricing: false,
    initial_consultation_fee: 0,
    consultation_fee: 0,
  });

  // Fetch the clinic data
  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await api.get('/clinic/get/', {
          params: { id: id },
        });
        
        setFormData({
          name: response.data.name || '',
          website: response.data.website || '',
          pharmacy_choice: response.data.pharmacy_choice || false,
          referral_required: response.data.referral_required || false,
          telehealth: response.data.telehealth || false,
          concession_pricing: response.data.concession_pricing || false,
          initial_consultation_fee: response.data.initial_consultation_fee || 0,
          consultation_fee: response.data.consultation_fee || 0,
        });
      } catch (error) {
        console.error('Failed to fetch clinic:', error);
        navigate('/admin/clinics');
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };
    fetchClinic();
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
      const userConfirmed = window.confirm('Are you sure you want to change this clinic?');
      if (!userConfirmed) {
        return; // Exit if user cancels
      }

      const updatedData = { clinic_id: id, ...formData };

      const response = await api.post('/clinic/update', updatedData);
      console.log('Clinic updated successfully:', response.data);
      navigate('/admin/clinics', { replace: true }); // Redirect after successful update
    } catch (error) {
      console.error('Failed to update clinic:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <>
      <Back to={`/admin/clinics/${id}`} />
      <h2>Edit {formData.name}</h2>
      <p>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Website:
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Pharmacy Choice:
          <input type="checkbox" name="pharmacy_choice" checked={formData.pharmacy_choice} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Referral Required:
          <input type="checkbox" name="referral_required" checked={formData.referral_required} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Telehealth:
          <input type="checkbox" name="telehealth" checked={formData.telehealth} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Concession Pricing:
          <input type="checkbox" name="concession_pricing" checked={formData.concession_pricing} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Initial Consultation Fee:
          <input type="number" name="initial_consultation_fee" value={formData.initial_consultation_fee} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Consultation Fee:
          <input type="number" name="consultation_fee" value={formData.consultation_fee} onChange={handleChange} />
        </label>
      </p>
      <p>
        <button onClick={handleEditClinic}>Save Changes</button>
      </p>
    </>
  );
};

export default ClinicEdit;




