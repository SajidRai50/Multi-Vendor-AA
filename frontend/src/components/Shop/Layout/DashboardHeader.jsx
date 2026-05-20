


import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const navItems = [
  { to: "/dashboard/coupons", icon: AiOutlineGift },
  { to: "/dashboard-events", icon: MdOutlineLocalOffer },
  { to: "/dashboard-products", icon: FiShoppingBag },
  { to: "/dashboard-orders", icon: FiPackage },
  { to: "/dashboard-messages", icon: BiMessageSquareDetail },
];

export const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <header className="w-full h-[60px] bg-white shadow-md sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6">

      {/* Logo */}
      <Link to="/dashboard" className="flex items-center">
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt="logo"
          className="h-[30px] sm:h-[40px] object-contain"
        />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-5">

        {/* Icons (Hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-5">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.to}>
                <div className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition">
                  <Icon
                    className="text-gray-600 hover:text-black transition"
                    size={20}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Profile */}
        <Link to={`/shop/${seller?._id}`}>
          <img
            src={seller?.avatar?.url || "/default-avatar.png"}
            alt="profile"
            className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-full object-cover border hover:scale-105 transition"
          />
        </Link>
      </div>
    </header>
  );
};