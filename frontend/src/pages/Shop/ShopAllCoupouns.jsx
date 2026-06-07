import React from 'react'
import  {DashboardHeader}  from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllCoupons from '../../components/Shop/AllCoupons.jsx'
export const ShopAllCoupouns = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />

      {/* MAIN LAYOUT */}
      <div className="flex">

        {/* Sidebar (fixed) */}
        <div className="w-[260px] min-h-screen bg-white shadow-md">
          <DashboardSideBar active={9} />
        </div>

        {/* Content (NO OVERLAP) */}
        <div className="flex-1 p-6 flex justify-center">
          <div className="w-full max-w-5xl">
            <AllCoupons />
          </div>
        </div>

      </div>
    </div>
  );
};