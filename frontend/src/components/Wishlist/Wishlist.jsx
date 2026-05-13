import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiMinus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";



const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "iPhone 14 Pro",
      description: "256 GB - Deep Purple",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    },
    {
      name: "Samsung S23 Ultra",
      description: "256 GB - Phantom Black",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    },
    {
      name: "Google Pixel",
      description: "128 GB - Hazel",
      price: 870,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    },
    {
      name: "OnePlus",
      description: "256 GB - Green",
      price: 760,
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400",
    },

    {
      name: "iPhone 14 Pro",
      description: "256 GB - Deep Purple",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    },
    {
      name: "Samsung S23 Ultra",
      description: "256 GB - Phantom Black",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    },
    {
      name: "Google Pixel",
      description: "128 GB - Hazel",
      price: 870,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    },
    {
      name: "OnePlus",
      description: "256 GB - Green",
      price: 760,
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400",
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50">
      {/* Cart Drawer */}
      <div className="fixed top-0 right-0 h-full w-[85%] sm:w-[60%] lg:w-[25%] bg-white flex flex-col shadow-lg">
        {/* Close Button */}
        <div className="fixed top-4 right-4 z-50">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {/* Header */}
        <div className={`${styles.normalFlex} p-4 border-b`}>
          <AiOutlineHeart size={25} />
          <h5 className="pl-2 text-[20px] font-[500]">
            {cartData.length} items
          </h5>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartData.map((item, index) => (
            <CartSingle key={index} data={item} />
          ))}
        </div>

        {/* Footer (Subtotal + Checkout) */}
        <div className="p-4 border-t">
          <Link to={"/Checkout"}>
            <button
              className="w-full bg-[#e44343] text-white py-3 rounded-md font-[600]
hover:bg-[#c73737] hover:shadow-md hover:scale-[1.02]
transition-all duration-200"
            >
              Checkout Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);

  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <RxCross1/>
        {/* IMAGE */}
        <img
          src={data.image}
          alt={data.name}
          className="w-[60px] h-[60px] object-cover rounded"
        />

        {/* TEXT */}
        <div>
          <h4 className="font-[500]">{data.name}</h4>
          <p className="text-gray-500 text-sm">{data.description}</p>
          <p className="text-[#e44343] font-[600] mt-1">${totalPrice}</p>
        </div>
      </div>

 <div>
      <FaCartPlus
        style={{ cursor: "pointer" }}
        size={20}
        title=" Add to cart"
      />
    </div>


    </div>
  );
};

export default Wishlist;

