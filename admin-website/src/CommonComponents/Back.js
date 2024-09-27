import React from 'react';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Back = ({ to = '/' }) => {
    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(to)} style={{ cursor: 'pointer', display: 'inline-block' }}>
            <IoReturnUpBackOutline size="3em" />
        </span>
    );
}

export default Back;
