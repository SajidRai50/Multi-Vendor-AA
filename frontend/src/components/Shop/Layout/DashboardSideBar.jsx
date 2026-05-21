// import React from "react";
// import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { RxDashboard } from "react-icons/rx";
// import { VscNewFile } from "react-icons/vsc";
// import { CiMoneyBill, CiSettings } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { HiOutlineReceiptRefund } from "react-icons/hi";

// const DashboardSideBar = ({ active }) => {
//   return (
//     <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
//       {/* single item */}
//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard" className="w-full flex items-center">
//           <RxDashboard
//             size={30}
//             color={`${active === 1 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 1 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Dashboard
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-orders" className="w-full flex items-center">
//           <FiShoppingBag
//             size={30}
//             color={`${active === 2 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 2 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Orders
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-products" className="w-full flex items-center">
//           <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 3 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Products
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link
//           to="/dashboard-create-product"
//           className="w-full flex items-center"
//         >
//           <AiOutlineFolderAdd
//             size={30}
//             color={`${active === 4 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 4 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Create Product
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-events" className="w-full flex items-center">
//           <MdOutlineLocalOffer
//             size={30}
//             color={`${active === 5 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 5 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Events
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-create-event" className="w-full flex items-center">
//           <VscNewFile
//             size={30}
//             color={`${active === 6 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 6 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Create Event
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link
//           to="/dashboard-withdraw-money"
//           className="w-full flex items-center"
//         >
//           <CiMoneyBill
//             size={30}
//             color={`${active === 7 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 7 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Withdraw Money
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-messages" className="w-full flex items-center">
//           <BiMessageSquareDetail
//             size={30}
//             color={`${active === 8 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 8 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Shop Inbox
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-coupouns" className="w-full flex items-center">
//           <AiOutlineGift
//             size={30}
//             color={`${active === 9 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 9 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Discount Codes
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-refunds" className="w-full flex items-center">
//           <HiOutlineReceiptRefund
//             size={30}
//             color={`${active === 10 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 10 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Refunds
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/settings" className="w-full flex items-center">
//           <CiSettings
//             size={30}
//             color={`${active === 11 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 11 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Settings
//           </h5>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DashboardSideBar;

import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="
      fixed bottom-0 left-0 w-full
      sm:static sm:w-[250px]
      h-[70px] sm:h-[90vh]
      bg-white shadow-lg sm:shadow-sm
      flex sm:flex-col
      justify-between sm:justify-start
      items-center sm:items-start
      px-2 sm:px-0
      z-50
    ">

      {/* Mobile: horizontal scroll */}
      <div className="flex sm:flex-col w-full overflow-x-auto sm:overflow-visible">

        {/* Item */}
        <SidebarItem
          to="/dashboard"
          Icon={RxDashboard}
          label="Dashboard"
          active={active === 1}
        />

        <SidebarItem
          to="/dashboard-orders"
          Icon={FiShoppingBag}
          label="All Orders"
          active={active === 2}
        />

        <SidebarItem
          to="/dashboard-products"
          Icon={FiPackage}
          label="All Products"
          active={active === 3}
        />

        <SidebarItem
          to="/dashboard-create-product"
          Icon={AiOutlineFolderAdd}
          label="Create Product"
          active={active === 4}
        />

        <SidebarItem
          to="/dashboard-events"
          Icon={MdOutlineLocalOffer}
          label="All Events"
          active={active === 5}
        />

        <SidebarItem
          to="/dashboard-create-event"
          Icon={VscNewFile}
          label="Create Event"
          active={active === 6}
        />

        <SidebarItem
          to="/dashboard-withdraw-money"
          Icon={CiMoneyBill}
          label="Withdraw Money"
          active={active === 7}
        />

        <SidebarItem
          to="/dashboard-messages"
          Icon={BiMessageSquareDetail}
          label="Shop Inbox"
          active={active === 8}
        />

        <SidebarItem
          to="/dashboard-coupouns"
          Icon={AiOutlineGift}
          label="Discount Coupons"
          active={active === 9}
        />

        <SidebarItem
          to="/dashboard-refunds"
          Icon={HiOutlineReceiptRefund}
          label="Refunds"
          active={active === 10}
        />

        <SidebarItem
          to="/settings"
          Icon={CiSettings}
          label="Settings"
          active={active === 11}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ to, Icon, label, active }) => {
  return (
    <Link
      to={to}
      className="flex flex-col sm:flex-row items-center justify-center sm:justify-start
      min-w-[70px] sm:min-w-full
      p-2 sm:p-4
      hover:bg-gray-100 transition rounded-md"
    >
      <Icon
        size={24}
        className={`${active ? "text-[crimson]" : "text-gray-600"}`}
      />

      <span
        className={`text-[12px] sm:text-[16px] sm:pl-3 mt-1 sm:mt-0 ${
          active ? "text-[crimson]" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default DashboardSideBar;