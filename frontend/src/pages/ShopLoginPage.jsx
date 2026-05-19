import React from 'react'
import {ShopLogin} from '../components/Shop/ShopLogin.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const ShopLoginPage = () => {
  const navigate = useNavigate();
    const {isSeller,seller} = useSelector((state)=>state.seller);
  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, navigate]);
  return (
    <div>
    <ShopLogin/>
    </div>
  )
}
