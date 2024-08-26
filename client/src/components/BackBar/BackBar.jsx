import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import './BackBar.css';

const BackBar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="back-bar">
      <button className="back-button" onClick={handleBackClick}>
        <IoIosArrowBack />
      </button>
    </div>
  );
};

export default BackBar;
