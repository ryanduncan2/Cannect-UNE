import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Auth/api'; // Use api instance with interceptor
import Back from '../CommonComponents/Back';

const Clinic = () => {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await api.get('/clinic/get/', {
          params: { id: id },
        });
        setClinic(response.data); // Store clinic data
      } catch (error) {
        console.error('Failed to fetch clinic:', error);
        navigate('/admin/clinics'); // Redirect on error
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };
    fetchClinic();
  }, [id, navigate]);

  const handleEditClinic = () => {
    navigate('edit');
  };

  const handleDeleteClinic = async () => {
    try {
      // Confirm with the user before proceeding
      const userConfirmed = window.confirm('Are you sure you want to delete this clinic?');
      if (!userConfirmed) {
        return; // Exit if user cancels
      }

      // Send delete request
      await api.delete('/clinic/delete', {
        params: { id: id },
      });

      console.log('Clinic deleted successfully');
      navigate('/admin/clinics', { replace: true });
    } catch (error) {
      console.error('Failed to delete clinic:', error);
    }
  };

  return (
    <>
    <Back to="/admin/clinics" />
    <div>
      {loading ? (
        <p>Loading clinic data...</p>
      ) : clinic ? (
        <div>
          <h2>{clinic.name}</h2>
          <>
            <p>Website: {clinic.website}</p>
            <p>Pharmacy Choice: {clinic.pharmacy_choice ? 'Yes' : 'No'}</p>
            <p>Referral Required: {clinic.referral_required ? 'Yes' : 'No'}</p>
            <p>Telehealth: {clinic.telehealth ? 'Yes' : 'No'}</p>
            <p>Concession Pricing: {clinic.concession_pricing ? 'Yes' : 'No'}</p>
            <p>Initial Consultation Fee: {clinic.initial_consultation_fee}</p>
            <p>Consultation Fee: {clinic.consultation_fee}</p>
            <p><button onClick={handleEditClinic}>Edit Clinic</button></p>
            <p><button onClick={handleDeleteClinic}>Delete Clinic</button></p>
          </>
        </div>
      ) : (
        <p>Failed to load clinic data</p>
      )}
    </div>
    </>
  );
};

export default Clinic;

