// import React from "react";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { RxPerson } from "react-icons/rx";
// import { AiOutlineRollback } from "react-icons/ai";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { MdOutlineTrackChanges, MdOutlinePayment, MdOutlineLocationOn } from "react-icons/md";
// import { FiLogOut } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import { server } from "../../server";
// import { toast } from "react-toastify";

// export const ProfileSidebar = ({ active, setActive }) => {
//   const navigate = useNavigate();

//   const menu = [
//     { id: 1, label: "Profile", icon: RxPerson,  },
//     { id: 2, label: "Orders", icon: HiOutlineShoppingBag,},
//     { id: 3, label: "Refunds", icon: AiOutlineRollback,  },
//     { id: 4, label: "Inbox", icon: BiMessageSquareDetail,  },
//     { id: 5, label: "Track Order", icon: MdOutlineTrackChanges,  },
//     { id: 6, label: "Payment Methods", icon: MdOutlinePayment,  },
//     { id: 7, label: "Address", icon: MdOutlineLocationOn, },
//     { id: 8, label: "Logout", icon: FiLogOut, path: "/login", isLogout: true },
//   ];

//   const menuItemClass = (isActive, isLogout) =>
//     `flex items-center cursor-pointer w-full mb-5 p-2 rounded-lg transition ${
//       isLogout
//         ? "text-gray-600 hover:bg-red-50 hover:text-red-500"
//         : isActive
//         ? "bg-red-50 text-red-500"
//         : "hover:bg-gray-100"
//     }`;
//     const handleClick = async () => {
//   try {
//     // call backend logout API
//     await fetch("http://localhost:8000/api/v2/logout", {
//       method: "GET",
//       credentials: "include", // IMPORTANT for cookie-based auth
//     });

//     // clear frontend storage
//     localStorage.removeItem("token");

//     // reset UI state
//     setActive(null);

//     // redirect
//     navigate("/login", { replace: true });

//   } catch (error) {
//     console.log("Logout error:", error);
//   }
// };



//   return (
//    <div className="mt-8 ">

//      <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
//       {menu.map((item) => {
//         const Icon = item.icon;

//         return (
//           <div
//             key={item.id}
//             className={menuItemClass(active === item.id, item.isLogout)}
//             onClick={() => handleClick(item)}
//           >
//             <Icon
//               size={24}
//               color={active === item.id || item.isLogout ? "red" : ""}
//             />
//             <span className="pl-3 pt-1 font-medium">
//               {item.label}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//    </div>
//   );

// };


import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
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
      .get(`${server}/user/logout` ,
        { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
      console.log(error.response.data.message)
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[red]" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;