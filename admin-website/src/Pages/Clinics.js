import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Auth/api'; // Use the api instance with interceptors
import Back from '../CommonComponents/Back';

const Clinics = () => {
  const [addingClinic, setAddingClinic] = useState(false);
  const [clinics, setClinics] = useState([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/');
          return; // Exit early if no access token
        }

        // Use the api instance with interceptors
        const response = await api.get('/clinic/search');
        setClinics(response.data);
      } catch (error) {
        console.error('There has been a problem with your axios operation:', error);
      }
    };
    fetchClinics();
  }, [navigate]);

  const handleAddClinic = () => {
    setAddingClinic(!addingClinic);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateClinic = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/');
        return;
      }

      const body = {
        ...formData,
        price_min: 0, // Always set to 0
        price_max: 0, // Always set to 0
      };

      // No need to manually set Authorization header; the interceptor will handle it
      const response = await api.post('/clinic/create', body);
      
      console.log('Clinic created:', response.data);
      alert('Clinic created successfully!');
      window.location.reload();

      // Optionally update the clinic list or reset the form
      //setClinics((prev) => [...prev, response.data]);
      setAddingClinic(false);
      setFormData({
        name: '',
        website: '',
        pharmacy_choice: false,
        referral_required: false,
        telehealth: false,
        concession_pricing: false,
        initial_consultation_fee: 0,
        consultation_fee: 0,
      });

    } catch (error) {
      console.error('Failed to create clinic:', error);
    }
  };

  return (
    <>
      <Back/>
      <h2>Clinics</h2>
      
      <button onClick={handleAddClinic}>{!addingClinic ? 'Add Clinic' : 'Cancel'}</button>
      {addingClinic && (
        <>
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
            <button onClick={handleCreateClinic}>Create Clinic</button>
          </p>
        </>
      )}
      <ul>
        {clinics.length > 0 ? (
          clinics.sort((a, b) => a.name.localeCompare(b.name)).map((clinic) => (
            <li key={clinic.public_id}>
              <p>
                <Link to={`${clinic.public_id}`}>
                  {clinic.name}
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

export default Clinics;


