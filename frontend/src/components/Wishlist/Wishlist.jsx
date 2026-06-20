import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { removeFromWishlist } from "../../redux/actions/wishlist.action";
import { backend_url } from "../../server";
import { FaCartPlus } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { addToCart } from "../../redux/actions/cart.action";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  }

  const totalPrice = wishlist.reduce(
    (acc, item) => acc + (item?.discountPrice || 0),
    0
  );

  return (
    <div className="w-full h-full flex flex-col bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <AiOutlineHeart size={22} />
          <h5 className="text-lg font-semibold">
            Wishlist ({wishlist.length})
          </h5>
        </div>

        <RxCross1
          size={22}
          className="cursor-pointer hover:text-red-500 transition"
          onClick={() => setOpenWishlist(false)}
        />
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <div className="text-5xl">💔</div>

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Your Wishlist is Empty
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            Save items you love and find them here later.
          </p>

          <Link
            to="/products"
            className="mt-5 px-6 py-2 rounded-full text-white
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:scale-105 transition"
          >
            Explore Products →
          </Link>
        </div>
      ) : (
        <>
          {/* LIST */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlist.map((item, index) => (
              <CartSingle
                key={item._id || index}
                data={item}
                removeFromWishlistHandler={removeFromWishlistHandler}
                 addToCartHandler={addToCartHandler}
              />
            ))}
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-500">Total Value</span>
              <span className="font-bold text-red-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout">
              <button
                className="w-full bg-red-500 text-white py-3 rounded-lg
                font-semibold hover:bg-red-600 hover:shadow-md
                hover:scale-[1.02] transition-all"
              >
                Checkout Now
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler ,addToCartHandler }) => {
  const totalPrice = data?.discountPrice || 0;

  return (
    <div className="flex items-center justify-between p-3 border rounded-xl hover:shadow-md transition bg-white">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <img
          src={`${backend_url}${data?.images?.[0]}`}
          alt={data?.name}
          className="w-16 h-16 object-cover rounded-lg border"
        />

        <div>
          <h4 className="text-sm font-medium line-clamp-1">
            {data?.name}
          </h4>

          <p className="text-xs text-green-600">In Stock</p>

          <p className="text-sm font-bold text-red-600">
            ${data?.discountPrice}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-3">


        <div className="flex items-center gap-3">

  <button
    onClick={() => addToCartHandler(data)}
    className="p-1 text-gray-500 hover:text-black transition"
    title="Add to cart"
  >
    <BsCartPlus size={18} />
  </button>

  <button
    onClick={() => removeFromWishlistHandler(data)}
    className="text-gray-300 hover:text-red-500 transition"
  >
    <RxCross1 size={14} />
  </button>

</div>

        <span className="text-sm font-bold">
          ${totalPrice}
        </span>
      </div>
    </div>
  );
};

export default Wishlist;


