import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorHandle = () => {



    const navigate = useNavigate();

    useEffect(() => {

        navigate('/');

    },[navigate]);



  return (
    <div>ErrorHandle</div>
  )
}

export default ErrorHandle