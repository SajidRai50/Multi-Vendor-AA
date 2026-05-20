import React from 'react'
import {ShopLogin} from '../components/Shop/ShopLogin.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const ShopLoginPage = () => {
  const navigate = useNavigate();
    const {isSeller,isLoading} = useSelector((state)=>state.seller);
  useEffect(() => {
    if (isSeller) {
      navigate('/dashboard');
    }
  }, [isSeller,isLoading]);
  return (
    <div>
    <ShopLogin/>
    </div>
  )
}
