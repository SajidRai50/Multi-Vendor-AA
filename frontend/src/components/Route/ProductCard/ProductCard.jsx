import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

import { ProductDetailCard } from "../ProductDetailCard/ProductDetailCard";
import { backend_url } from "../../../server";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cart.action";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist.action";

import { toast } from "react-toastify";

export const ProductCard = ({ data }) => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [open, setOpen] = useState(false);

  if (!data) return null;

  const product_name = data?.name?.replace(/\s+/g, "-");

  // ==========================
  // Wishlist State
  // ==========================
  const isWishlisted = wishlist?.some((item) => item?._id === data?._id);

  // ==========================
  // Wishlist Handlers
  // ==========================
  const addToWishlistHandler = (product) => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist");
  };

  const removeFromWishlistHandler = (product) => {
    dispatch(removeFromWishlist(product));
    toast.success("Removed from wishlist");
  };

  // ==========================
  // Cart
  // ==========================
  const addToCartHandler = () => {
    const isItemExists = cart?.find((item) => item?._id === data?._id);

    if (isItemExists) {
      toast.error("Item already in cart");
      return;
    }

    dispatch(
      addToCart({
        ...data,
        qty: 1,
      }),
    );

    toast.success("Item added to cart");
  };
  const isInCart = cart?.some((item) => item?._id === data?._id);

  // return (
  //   <>
  //     <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative group border">

  //       {/* IMAGE */}
  //       <Link to={`/product/${product_name}`} className="block">
  //         <div className="w-full h-[190px] bg-gray-50 flex items-center justify-center overflow-hidden">
  //           <img
  //             src={
  //               data?.images?.length
  //                 ? `${backend_url}${data.images[0]}`
  //                 : "/no-image.png"
  //             }
  //             alt={data?.name}
  //             className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
  //           />
  //         </div>
  //       </Link>

  //       {/* DETAILS */}
  //       <div className="p-4">
  //         <Link to="/">
  //           <h5
  //             className={`${styles.shop_name} text-sm text-gray-500 hover:text-[#3957db]`}
  //           >
  //             {data?.shop?.name}
  //           </h5>
  //         </Link>

  //         <Link to={`/product/${product_name}`}>
  //           <h4 className="mt-2 text-[15px] font-semibold text-gray-800 leading-[1.4] min-h-[44px] hover:text-[#3957db] transition">
  //             {data?.name?.length > 40
  //               ? data.name.slice(0, 40) + "..."
  //               : data?.name}
  //           </h4>
  //         </Link>

  //         {/* STARS */}
  //         <div className="flex items-center mt-2">
  //           <AiFillStar size={16} className="text-[#f6ba00]" />
  //           <AiFillStar size={16} className="text-[#f6ba00]" />
  //           <AiFillStar size={16} className="text-[#f6ba00]" />
  //           <AiFillStar size={16} className="text-[#f6ba00]" />
  //           <AiOutlineStar size={16} className="text-[#f6ba00]" />
  //         </div>

  //         {/* PRICE */}
  //         <div className="mt-3 flex items-center justify-between">
  //           <div className="flex items-center gap-2">
  //             <h5 className="text-[#d02222] text-[18px] font-bold">
  //               ${data?.discountPrice}
  //             </h5>

  //             {data?.originalPrice && (
  //               <span className="text-gray-400 text-sm line-through">
  //                 ${data.originalPrice}
  //               </span>
  //             )}
  //           </div>

  //           <span className="text-[#68d284] text-sm font-medium">
  //             {data?.sold_out || 0} sold
  //           </span>
  //         </div>
  //       </div>

  //       {/* ACTION BUTTONS */}
  //       <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">

  //         {/* Wishlist */}
  //         {isWishlisted ? (
  //           <button
  //             onClick={() => removeFromWishlistHandler(data)}
  //             className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50 transition"
  //           >
  //             <AiFillHeart size={20} color="red" />
  //           </button>
  //         ) : (
  //           <button
  //             onClick={() => addToWishlistHandler(data)}
  //             className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
  //           >
  //             <AiOutlineHeart size={20} />
  //           </button>
  //         )}

  //         {/* Quick View */}
  //         <button
  //           onClick={() => setOpen(true)}
  //           className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition"
  //         >
  //           <AiOutlineEye size={20} />
  //         </button>

  //         {/* Add To Cart */}
  //         <button
  //           onClick={addToCartHandler}
  //           className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-green-50 transition"
  //         >
  //           <AiOutlineShoppingCart size={22} />
  //         </button>
  //       </div>
  //     </div>

  //     {/* Product Modal */}
  //     {open && (
  //       <ProductDetailCard
  //         setOpen={setOpen}
  //         data={data}
  //       />
  //     )}
  //   </>
  // );

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
        {/* Product Image */}
        <Link to={`/product/${product_name}`} className="block">
          <div className="relative w-full h-[260px] bg-gradient-to-b from-gray-50 to-white overflow-hidden flex items-center justify-center">
            <img
              src={
                data?.images?.length
                  ? `${backend_url}${data.images[0]}`
                  : "/no-image.png"
              }
              alt={data?.name}
              className="w-full h-full object-contain p-5 transition-all duration-700 group-hover:scale-110"
            />

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-all duration-500"></div>
          </div>
        </Link>

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-3 opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          {/* Wishlist */}
          {isWishlisted ? (
            <button
              onClick={() => removeFromWishlistHandler(data)}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 hover:bg-red-50 transition-all duration-300"
            >
              <AiFillHeart size={20} className="text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => addToWishlistHandler(data)}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 hover:bg-gray-100 transition-all duration-300"
            >
              <AiOutlineHeart size={20} />
            </button>
          )}

          {/* Quick View */}
          <button
            onClick={() => setOpen(true)}
            className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 hover:bg-blue-50 transition-all duration-300"
          >
            <AiOutlineEye size={20} />
          </button>

          {/* Add To Cart */}
          <button
            onClick={addToCartHandler}
            className={`w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
              isInCart
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-green-50 text-gray-700"
            }`}
          >
            <AiOutlineShoppingCart size={21} />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-5">
          {/* Shop */}
          <Link to="/">
            <p
              className={`${styles.shop_name} text-xs uppercase tracking-wider text-gray-400 hover:text-[#3957db] transition`}
            >
              {data?.shop?.name}
            </p>
          </Link>

          {/* Product Name */}
          <Link to={`/product/${product_name}`}>
            <h3 className="mt-2 text-[16px] font-semibold text-gray-800 leading-6 min-h-[52px] hover:text-[#3957db] transition-colors duration-300">
              {data?.name?.length > 50
                ? data.name.slice(0, 50) + "..."
                : data?.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-[2px] mt-3">
            <AiFillStar size={16} className="text-yellow-400" />
            <AiFillStar size={16} className="text-yellow-400" />
            <AiFillStar size={16} className="text-yellow-400" />
            <AiFillStar size={16} className="text-yellow-400" />
            <AiOutlineStar size={16} className="text-yellow-400" />

            <span className="ml-2 text-xs text-gray-500">(4.0)</span>
          </div>

          {/* Price Section */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-[24px] font-bold text-[#d02222] leading-none">
                ${data?.discountPrice}
              </h4>

              {data?.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${data.originalPrice}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="block text-xs text-gray-400">Sold</span>

              <span className="text-sm font-semibold text-green-600">
                {data?.sold_out || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {open && <ProductDetailCard setOpen={setOpen} data={data} />}
    </>
  );
};

export default ProductCard;
