import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
//import axios from 'axios';
//import { refreshAccessToken } from '../Auth/auth'; // Assuming this is the refresh token function
import api from '../Auth/api';
import Back from '../CommonComponents/Back';

const Feedback = () => {
 
  const [feedback, setFeedback] = useState([]);
 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/');
          return; // Exit early if no access token
        }

        const response = await api.get('/feedback/getAll', {
            params: { count: 100,
                offset: 0,
                sort_mode: 0, },
          });
        setFeedback(response.data);

        // const config = {
        //   params: {
        //     count: 100,
        //     offset: 0,
        //     sort_mode: 0,
        //   },
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // };

        //const response = await axios.get('http://3.24.169.3/api/feedback/getAll', config);

        //
        setFeedback(response.data);
      }
        catch (error) {
            console.error('There has been a problem with your axios operation:', error);
          } 
      
    };

    fetchFeedback();
  }, [navigate]);

 
  const handleDeleteMessage = async (id) => {
    try {
       
      const userConfirmed = window.confirm('Are you sure you want to delete this clinic?');
      if (!userConfirmed) {
        return;
      }
  
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     params: { feedback_id: id }, // Pass the body data inside 'data'
    //   };
        await api.delete('/feedback/deleteOther',{
            params: { feedback_id: id },
          });
        //console.log('feedback deleted:', response );
        window.location.reload();
        navigate('/admin/feedback');
      }
  
     catch (error) {
       
        console.error('Failed to delete clinic:', error);
      }
    
  };

  return (
    <>
        <Back></Back>
        <h2>Feedback</h2>
      
 
      <ul>
        {feedback.length > 0 ? (
          feedback.map((message) => (
            <li key={message.public_id}>
                <p>
               
                 {message.text}
              
              </p>
              <p>
               
                 {message.date_submitted}
              
              </p>
              <p><button onClick={()=>handleDeleteMessage(message.public_id)}>delete</button></p>
              
            </li>
          ))
        ) : (
          <p>No feedback</p>
        )}
      </ul>
    </>
  );
};

export default Feedback;
