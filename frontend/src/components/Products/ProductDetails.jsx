import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { backend_url } from "../../server";

export const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=hello");
  };

  if (!data) return null;

  return (
    <div className={`${styles.section} w-[90%] 800px:w-[80%] mx-auto py-10`}>
      <div className="flex flex-col 800px:flex-row gap-8">
        

        {/* LEFT SIDE - IMAGES */}
<div className="w-full 800px:w-[50%]">
  {/* Main Image Card */}
  <div className="bg-white rounded-2xl shadow-md border p-4 overflow-hidden">
    <img
      src={`${backend_url}/${data.images?.[select]}`}
      alt={data.name}
      className="w-full h-[350px] 800px:h-[500px] object-contain rounded-xl transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Thumbnail Gallery */}
  {data.images?.length > 0 && (
    <div className="flex flex-wrap gap-3 mt-5 justify-center">
      {data.images.map((img, index) => (
        <div
          key={index}
          onClick={() => setSelect(index)}
          className={`
            cursor-pointer
            rounded-xl
            overflow-hidden
            border-2
            transition-all
            duration-300
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
            ${
              select === index
                ? "border-[#3957db] scale-105"
                : "border-gray-200"
            }
          `}
        >
          <img
            src={`${backend_url}/${img}`}
            alt={`thumbnail-${index}`}
            className="w-[80px] h-[80px] object-cover"
          />
        </div>
      ))}
    </div>
  )}
</div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="w-full 800px:w-[50%]">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {data.name}
          </h1>

          <p className="text-gray-600 leading-7 mb-5">
            {data.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <h4 className={`${styles.productDiscountPrice}`}>
              ${data.discountPrice}
            </h4>

            {data.originalPrice && (
              <h3 className={`${styles.price}`}>
                ${data.originalPrice}
              </h3>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={decrementCount}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
            >
              <HiMinus size={16} />
            </button>

            <span className="text-lg font-semibold min-w-[30px] text-center">
              {count}
            </span>

            <button
              onClick={incrementCount}
              className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full"
            >
              <HiPlus size={16} />
            </button>
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className="font-medium">
              Stock: {data.stock || 0}
            </span>
          </div>

          {/* Add To Cart */}
          <button
            className={`${styles.button} rounded h-11 px-6 flex items-center justify-center`}
          >
            <span className="text-white flex items-center gap-2">
              Add to Cart
              <AiOutlineShoppingCart size={20} />
            </span>
          </button>

          {/* Contact Seller */}
          <button
            onClick={handleMessageSubmit}
            className="mt-4 border border-gray-300 px-6 h-11 rounded hover:bg-gray-100 transition"
          >
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
};