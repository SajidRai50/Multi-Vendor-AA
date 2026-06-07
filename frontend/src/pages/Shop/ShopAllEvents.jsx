// import React from 'react'
// import  {DashboardHeader}  from '../../components/Shop/Layout/DashboardHeader'
// import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
// import AllEvents from '../../components/Shop/AllEvents.jsx'
// export const ShopAllEvents = () => {
//   return (
//     <div>
//            <DashboardHeader />
//            <div className="flex  justify-between w-full">
//                <div className="w-[80px] 800px:w-[330px]">
//                  <DashboardSideBar active={5} />
//                </div>
//                <div className="w-full justify-center flex">
//                  <AllEvents/>
//                </div>
//              </div>
//        </div>
//   )
// }


import React from "react";
import { DashboardHeader } from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllEvents from "../../components/Shop/AllEvents.jsx";

export const ShopAllEvents = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />

      {/* MAIN LAYOUT */}
      <div className="flex">

        {/* Sidebar */}
        <div className="w-[360px] min-h-screen bg-white shadow-md">
          <DashboardSideBar active={5} />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex justify-center">
          <div className="w-full max-w-9xl">
            <AllEvents />
          </div>
        </div>

      </div>
    </div>
  );
};