import React from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Home = ({ to = '/' }) => {
    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(to)} style={{ cursor: 'pointer', display: 'inline-block'  }}>
            <IoHomeSharp size="3em" />
        </span>
    );
}

export default Home;
