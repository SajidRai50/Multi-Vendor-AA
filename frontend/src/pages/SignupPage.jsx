import React, { useEffect } from 'react';
import { Signup } from '../components/Login/signup/Signup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SignupPage = () => {
    const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.user);

useEffect(() => {
  if (isAuthenticated) {
    navigate('/');
  }
}, [isAuthenticated, navigate]);

  return (
    <div>
        <Signup/>
    </div>
  )
}
