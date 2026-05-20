import React, { useEffect } from 'react'
import {ShopRegistration} from '../components/Shop/ShopRegistration.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const ShopCreate = () => {
  const navigate = useNavigate();
    const {isSeller,seller} = useSelector((state)=>state.seller);
  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, navigate]);
  return (
    <div>
<ShopRegistration />

    </div>
  )
}
