
import React from "react";
import {
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  HiOutlineReceiptRefund,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const itemClass = (id) =>
    `flex items-center cursor-pointer w-full mb-5 sm:mb-8 transition`;

  return (
    <div className="w-full sm:w-[260px] bg-white-300 shadow-sm rounded-xl p-3 sm:p-4 pt-6 sm:pt-8 mt-6 ">

      {/* MENU ITEMS */}
      {[
        { id: 1, icon: RxPerson, label: "Profile" },
        { id: 2, icon: HiOutlineShoppingBag, label: "Orders" },
        { id: 3, icon: HiOutlineReceiptRefund, label: "Refunds" },
        { id: 4, icon: AiOutlineMessage, label: "Inbox", nav: "/inbox" },
        { id: 5, icon: MdOutlineTrackChanges, label: "Track Order" },
        { id: 6, icon: RiLockPasswordLine, label: "Password" },
        { id: 7, icon: TbAddressBook, label: "Address" },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.id);
              item.nav && navigate(item.nav);
            }}
            className={itemClass(item.id)}
          >
            <Icon size={20} color={active === item.id ? "red" : ""} />

            <span className={`pl-3 hidden sm:block ${active === item.id ? "text-red-500" : ""}`}>
              {item.label}
            </span>
          </div>
        );
      })}

      {/* ADMIN */}
      {user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div className="flex items-center mb-5 sm:mb-8">
            <MdOutlineAdminPanelSettings size={20} />
            <span className="pl-3 hidden sm:block">Admin</span>
          </div>
        </Link>
      )}

      {/* LOGOUT */}
      <div
        onClick={logoutHandler}
        className="flex items-center cursor-pointer"
      >
        <AiOutlineLogin size={20} />
        <span className="pl-3 hidden sm:block">Logout</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;