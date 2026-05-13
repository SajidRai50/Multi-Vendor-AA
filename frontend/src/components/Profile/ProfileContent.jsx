
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

/* ---------------- PROFILE CONTENT ---------------- */

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
    <div className="w-full flex justify-center px-3 sm:px-4 py-5 sm:py-6 h-auto sm:h-[calc(100vh-80px)]">

      {/* PROFILE */}
      {active === 1 && (
        <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT */}
          <div className="w-full md:w-[35%] bg-gradient-to-b from-[#3a24db] to-[#5b4bff] p-6 text-white flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar?.url}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <label className="absolute bottom-1 right-1 bg-white text-black w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer shadow">
                <AiOutlineCamera size={14} />
                <input type="file" className="hidden" />
              </label>
            </div>

            <h2 className="mt-4 text-base sm:text-lg font-semibold text-center">
              {name || "Your Name"}
            </h2>

            <p className="text-xs text-white/80 text-center break-all">
              {email}
            </p>

            <p className="mt-4 text-xs text-white/70 text-center">
              Manage profile settings
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-[65%] p-4 sm:p-6 flex flex-col justify-between">

            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Profile Settings
              </h2>

              {/* GRID RESPONSIVE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input className="input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="input" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className="input" placeholder="Zip Code" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                <input className="input sm:col-span-2" placeholder="Address 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                <input className="input sm:col-span-2" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmitt}
                className="w-full sm:w-auto px-6 py-2 bg-[#3a24db] text-white rounded-lg text-sm"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE WRAPPER FIX (mobile scroll) */}
      {active !== 1 && (
        <div className="w-full overflow-x-auto">
          {active === 2 && <AllOrders />}
          {active === 3 && <AllRefundOrders />}
          {active === 5 && <TrackOrder />}
          {active === 6 && <PaymentMethod />}
          {active === 7 && <Address />}
        </div>
      )}
    </div>
  );
};

/* ---------------- TABLES (UNCHANGED LOGIC + RESPONSIVE WRAP) ---------------- */

const AllOrders = () => {
  const orders = [{ _id: "1", orderItems: [{}], totalPrice: 120, orderStatus: "Processing" }];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7 },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
    {
      field: "action",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button><AiOutlineArrowRight size={20} /></Button>
        </Link>
      ),
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    total: "US$ " + item.totalPrice,
    status: item.orderStatus,
  }));

  return (
    <div className="w-full overflow-x-auto">
      <DataGrid rows={rows} columns={columns} autoHeight />
    </div>
  );
};

/* Same wrapper applied for Refund + Track */
const AllRefundOrders = AllOrders;
const TrackOrder = AllOrders;

/* ---------------- SIMPLE UI COMPONENTS ---------------- */




const PaymentMethod = () => {
  const cards = [
    {
      id: 1,
      name: "Talha",
      last4: "4242",
      expiry: "08/27",
      brand: "visa",
    },
  ];

  const handleDelete = (id) => {
    console.log("Delete card:", id);
    // later: call API
  };

  return (
    <div className="w-full px-4 sm:px-6 py-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Payment Methods
          </h1>
          <p className="text-xs text-gray-500">
            Manage your saved cards
          </p>
        </div>

        <button className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
          + Add New Card
        </button>
      </div>

      {/* CARD LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-gradient-to-r from-[#1a1f71] to-[#2d3a8c] text-white rounded-2xl p-5 shadow-lg overflow-hidden"
          >

            {/* VISA LOGO */}
            <div className="flex justify-between items-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCaYaD6ZcZx4s7oeVLyD14bZmNnkzF-1SKTA&s"
                alt="visa"
                className="w-12 sm:w-14 object-contain bg-white p-1 rounded"
              />

              <button
                onClick={() => handleDelete(card.id)}
                className="text-white/80 hover:text-red-400 transition"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>

            {/* CARD NUMBER */}
            <div className="mt-6 tracking-widest text-lg sm:text-xl font-medium">
              **** **** **** {card.last4}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between mt-6 text-xs sm:text-sm text-white/80">
              <div>
                <p className="text-[10px] uppercase">Card Holder</p>
                <p className="font-medium">{card.name}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase">Expires</p>
                <p className="font-medium">{card.expiry}</p>
              </div>
            </div>

            {/* DECORATION */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};


const Address = () => {
  const addresses = [
    {
      id: 1,
      title: "Home",
      address:
        "House 12, Street 4, Phase 5, DHA Lahore, Punjab, Pakistan",
      phone: "+92 300 1234567",
      isDefault: true,
    },
  ];

  const handleDelete = (id) => {
    console.log("Delete address:", id);
    // later: API call
  };

  return (
    <div className="w-full px-4 sm:px-6 py-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Saved Addresses
          </h1>
          <p className="text-xs text-gray-500">
            Manage delivery locations
          </p>
        </div>

        <button className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
          + Add New Address
        </button>
      </div>

      {/* ADDRESS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {addresses.map((item) => (
          <div
            key={item.id}
            className="relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-start">

              {/* TITLE */}
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h2>

                {item.isDefault && (
                  <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-600 rounded-full">
                    Default
                  </span>
                )}
              </div>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <AiOutlineDelete size={18} />
              </button>
            </div>

            {/* ADDRESS */}
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              {item.address}
            </p>

            {/* PHONE */}
            <p className="text-xs text-gray-500 mt-3">
              📞 {item.phone}
            </p>

            {/* DECORATION */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-100 rounded-full opacity-40" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* INPUT STYLE (reused) */
const inputBase =
  "h-10 sm:h-11 px-3 rounded-lg bg-gray-100 border focus:bg-white focus:border-[#3a24db] outline-none text-sm";
