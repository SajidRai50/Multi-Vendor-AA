import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState("");

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!seller?._id) return;

    setIsLoading(true);

    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCoupouns(res.data.couponCodes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [seller?._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Coupon code deleted successfully!");

        // ✅ update UI without reload
        setCoupouns((prev) => prev.filter((c) => c._id !== id));
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Delete failed");
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shop: seller,
        },
        { withCredentials: true },
      )

      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);

        // update UI without reload
        setCoupouns((prev) => [...prev, res.data.coupounCode]);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.6,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {/* Main Card */}
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">Coupon Codes</h2>

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            + Create Coupon
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md overflow-hidden">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-6 relative">
            <RxCross1
              size={25}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            />

            <h3 className="text-xl font-semibold text-center mb-4">
              Create Coupon Code
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter coupon name..."
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Discount */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Discount %</label>
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter discount..."
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Min Amount */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Min Amount</label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmout(e.target.value)}
                  placeholder="Minimum cart value..."
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Max Amount */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Max Amount</label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Maximum discount..."
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Product */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Selected Product
                </label>
                <select
                  value={selectedProducts}
                  onChange={(e) => setSelectedProducts(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a product</option>
                  {products &&
                    products.map((i) => (
                      <option value={i.name} key={i.name}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Submit */}
              <input
                type="submit"
                value="Create Coupon"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md cursor-pointer transition"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCoupons;
