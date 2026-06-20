import React, { useState } from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";

import { backend_url } from "../../../server";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { addToCart } from "../../../redux/actions/cart.action";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist.action";

export const ProductDetailCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();

const { cart } = useSelector((state) => state.cart);
const { wishlist } = useSelector((state) => state.wishlist);

const [count, setCount] = useState(1);

if (!data) return null;

const isWishlisted = wishlist?.some(
  (item) => item?._id === data?._id
);

const isInCart = cart?.some(
  (item) => item?._id === data?._id
);

  if (!data) return null;

  // IMAGE
  const imageSrc =
    data?.images?.length > 0
      ? `${backend_url}${data.images[0]}`
      : data?.image_Url?.[0]?.url || data?.image_Url?.[0] || "/no-image.png";

  const shopImg =
    data?.shop?.avatar || data?.shop?.shop_avatar?.url || "/no-image.png";

  // WISHLIST
 const addToWishlistHandler = (product) => {
  dispatch(addToWishlist(product));
  toast.success("Added to wishlist");
};

const removeFromWishlistHandler = (product) => {
  dispatch(removeFromWishlist(product));
  toast.success("Removed from wishlist");
};

  // QUANTITY
  const handleIncrement = () => {
    if (count >= data.stock) return;
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  // CART (FIXED)
  const addToCartHandler = () => {
  if (!data || !data._id) {
    toast.error("Invalid product");
    return;
  }

  const isItemExists = cart?.find(
    (item) => item?._id === data?._id
  );

  if (isItemExists) {
    toast.error("Item already in cart");
    return;
  }

  dispatch(
    addToCart({
      ...data,
      qty: count,
    })
  );

  toast.success("Item added to cart");
};
  // console.log(data)
  // console.log("SHOP DATA:", data?.shop);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-white w-full max-w-[950px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white flex items-center justify-center"
        >
          <RxCross1 />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* LEFT */}
          <div>
            <img
              src={imageSrc}
              alt={data.name}
              className="w-full h-[350px] object-contain"
            />

            {/* SHOP */}
            <div className="mt-5 border p-4 flex justify-between items-center rounded-lg">
              <div className="flex items-center">
                <img
                  src={data?.shop?.avatar?.url || "/default-avatar.png"}
                  className="w-14 h-14 rounded-full mr-3"
                  alt="shop"
                />
                <div>
                  <h4 className="font-semibold">{data?.shop?.name}</h4>
                  <p className="text-sm text-gray-500">
                    Rating: {data?.shop?.ratings || 0}
                  </p>
                </div>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                Message <AiOutlineMessage />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-3xl font-bold">{data.name}</h2>

            <p className="mt-4 text-gray-600">{data.description}</p>

            <div className="mt-6 flex gap-4">
              <h3 className="text-3xl text-red-600 font-bold">
                ${data.discountPrice}
              </h3>
              {data.originalPrice && (
                <h4 className="line-through text-gray-400">
                  ${data.originalPrice}
                </h4>
              )}
            </div>

            <div className="text-green-600 mt-2">{data.sold_out || 0} sold</div>

            {/* QTY */}
           <div className="mt-6 flex items-center gap-4">

  <button
    onClick={handleDecrement}
    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
  >
    -
  </button>

  <span className="text-lg font-semibold">
    {count}
  </span>

  <button
    onClick={handleIncrement}
    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
  >
    +
  </button>

  {isWishlisted ? (
    <button
      onClick={() =>
        removeFromWishlistHandler(data)
      }
      className="ml-3 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center hover:scale-110 transition-all duration-300"
    >
      <AiFillHeart
        size={24}
        className="text-red-500"
      />
    </button>
  ) : (
    <button
      onClick={() =>
        addToWishlistHandler(data)
      }
      className="ml-3 w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition-all duration-300"
    >
      <AiOutlineHeart size={24} />
    </button>
  )}
</div>

            <button onClick={addToCartHandler}
            className="mt-8 w-full bg-blue-700 text-white py-3 rounded-lg"
            >
Add To Cart
            </button>

            <p className="mt-3 text-sm text-gray-500">Stock: {data.stock}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
