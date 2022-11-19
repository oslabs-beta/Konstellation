import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logout.scss';

const logout = () => {
  const navigate = useNavigate();

  const buttonClicked = () => {
    console.log('button clicked!');
    navigate('/', { state: { autoLoad: false } });
  };

  return (
    <button type="submit" className="logout-button" onClick={buttonClicked}>
      Log Out
    </button>
  );
};

export default logout;
