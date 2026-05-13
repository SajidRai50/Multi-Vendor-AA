import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import {
  AiOutlineAlert,
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import styles from "../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";

export const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmitt = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setZipcode(user.zipcode || "");
      setAddress1(user.address1 || "");
      setAddress2(user.address2 || "");
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center px-4 py-6 h-[calc(100vh-80px)]">
      {/* .........Profile........ */}
      {active === 1 && (
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex">
          {/* LEFT SIDE - PROFILE INFO */}
          <div className="w-[35%] bg-gradient-to-b from-[#3a24db] to-[#5b4bff] p-6 text-white flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar?.url}`}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <label
                htmlFor="image"
                className="absolute bottom-1 right-1 bg-white text-black w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow"
              >
                <AiOutlineCamera size={14} />
                <input type="file" id="image" className="hidden" />
              </label>
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {name || "Your Name"}
            </h2>

            <p className="text-xs text-white/80">{email}</p>

            <div className="mt-6 text-center text-xs text-white/70">
              Manage your profile settings
              <br />
              and personal information
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="w-[65%] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Settings
              </h2>

              <div className="grid grid-cols-2 gap-10">
                <input
                  placeholder="Full Name"
                  className="h-11 px-3 rounded-lg bg-gray-100 focus:bg-white border focus:border-[#3a24db] outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Email"
                  className="h-11 px-3 rounded-lg bg-gray-100 focus:bg-white border focus:border-[#3a24db] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  placeholder="Phone"
                  className="h-11 px-3 rounded-lg bg-gray-100 focus:bg-white border focus:border-[#3a24db] outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  placeholder="Zip Code"
                  className="h-11 px-3 rounded-lg bg-gray-100 focus:bg-white border focus:border-[#3a24db] outline-none"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />

                <input
                  placeholder="Address 1"
                  className="h-11 px-3 rounded-lg bg-gray-100 focus:bg-white border focus:border-[#3a24db] outline-none col-span-2"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />

                <input
                  placeholder="Address 2"
                  className="h-11 px-3 rounded-lg bg-gray-100 focus:bg-white border focus:border-[#3a24db] outline-none col-span-2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                onClick={handleSubmitt}
                className="px-6 py-2 rounded-lg bg-[#3a24db] text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* .......Orders ........... */}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* .......Refund ........... */}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* ............Track ORDER .......... */}

      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* ............PAYMENT METHOD .......... */}

      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* ............user Address .......... */}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfhfbtrt28820221",
      orderItems: [
        {
          name: "iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7463hvbfhfbtrt28820221",
      orderItems: [
        {
          name: "iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "7463hvbfhfbtrt28820221",
      orderItems: [
        {
          name: "iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Payment Methods
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage cards options</p>
        </div>

        {/* Right */}
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 active:scale-95 transition">
          + Add New
        </button>
      </div>

      {/* Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Card Icon */}
          <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr0fajOiUNkZ3Fb4li_CwsC-eVYhXHDgYOppf-qbkwcQ&s"
              alt="card"
              className="h-8 object-contain"
            />
          </div>

          {/* Card Info */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900">Rai</h5>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span className="tracking-wider">**** **** 4543</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-md">08/27</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <button className="p-2 rounded-lg hover:bg-red-50 group transition">
          <AiOutlineDelete
            size={20}
            className="text-gray-400 group-hover:text-red-500 transition"
          />
        </button>
      </div>
    </div>
  );
};



const Address = () => {
  return (
    <div className="w-full px-5 py-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Saved Addresses
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your delivery locations
          </p>
        </div>

        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 active:scale-95 transition">
          + Add New
        </button>
      </div>

      {/* Address Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-start justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

        {/* Left Section */}
        <div className="flex gap-4">

          {/* Icon */}
          <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center">
            📍
          </div>

          {/* Info */}
          <div className="space-y-1">

            {/* Name + Default badge */}
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900">
                Home
              </h3>
              <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-600 rounded-full font-medium">
                Default
              </span>
            </div>

            {/* Address */}
            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
              House 12, Street 4, Phase 5, DHA Lahore, Punjab, Pakistan
            </p>

            {/* Phone */}
            <p className="text-xs text-gray-500">
              📞 +92 300 1234567
            </p>
          </div>
        </div>

        {/* Right Section */}
        <button className="p-2 rounded-lg hover:bg-red-50 group transition">
          <AiOutlineDelete
            size={20}
            className="text-gray-400 group-hover:text-red-500 transition"
          />
        </button>
      </div>

    </div>
  );
};

export default PaymentMethod;





