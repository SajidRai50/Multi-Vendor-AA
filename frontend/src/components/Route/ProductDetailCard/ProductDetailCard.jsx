// import React, { useState } from "react";
// import { createPortal } from "react-dom";
// import { RxCross1 } from "react-icons/rx";
// import styles from "../../../styles/styles";
// import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
// import { backend_url } from "../../../server";
// import { useDispatch, useSelector } from "react-redux";
// import {toast} from 'react-toastify'
// import { addToCart } from "../../../redux/actions/cart.action";

// export const ProductDetailCard = ({ setOpen, data }) => {
//   const dispatch = useDispatch()
//   const {cart} = useSelector((state) => state.cart)
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   // const [select, setSelect] = useState(false);
//   const handleMessageSubmit = () => {};

//   const addToWishlistHandler = (product) => {
//     setClick(true);

//     // get existing wishlist
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//     // check if already exists
//     const exists = wishlist.find((item) => item._id === product._id);
//     if (exists) return;

//     wishlist.push(product);

//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   };

//   const removeFromWishlistHandler = (product) => {
//     setClick(false);

//     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//     wishlist = wishlist.filter((item) => item._id !== product._id);

//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   };

//   const handleIncrement = () => {
//     console.log('h')
//     if (data.stock && count >= data.stock) return; // optional max limit
//     setCount((prev) => prev + 1);
//   };

//   const handleDecrement = () => {
//     if (count <= 1) return; // prevent 0 or negative
//     setCount((prev) => prev - 1);
//   };
//   if (!data) return null;
//   const imageSrc = data?.images?.[0]
//     ? `${backend_url}/${data.images[0]}`
//     : "/no-image.png";

//   // console.log(data);
//   // console.log(data.shop.avatar)


//   const addToCartHandler = (id)=>{
// const isItemExists = cart && cart.find((id)=> id._id === id)
// if(isItemExists){
// toast.error(' item alrady in cart')
// }
// else {
//   const cartData = {
//     ...data ,qty:count
//   }
//   dispatch(addToCart(cartData))
//   toast.success('item added to cart successfully')
// }
//   }

//   return createPortal(
//     <div
//       className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4"
//       onClick={() => setOpen(false)}
//     >
//       <div
//         className="relative bg-white w-full max-w-[950px] max-h-[85vh] overflow-y-auto rounded-lg shadow-2xl p-5"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute right-4 top-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white transition"
//         >
//           <RxCross1 size={20} />
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
//           {/* Left Side */}
//           <div>
//             <div className="w-full h-[320px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
//               {/* <img
//                 src={imageSrc}
//                 alt={data.name}

//                 className="w-full h-full object-contain"
//               /> */}
//             <img

//               src={
//                 // data?.images?.[0]
//                 //   ? `${backend_url}/${data.images[0]}`
//                 //   : "/no-image.png"
//                 data?.images?.[0] ||
//   data?.image_Url?.[0]?.url ||
//   data?.image_Url?.[0] ||
//   "/no-image.png"
//               }
//               alt={data.name}
//               className="w-full h-[170px] object-contain transition-transform duration-300 group-hover:scale-105"
//             />
//             </div>

//             {/* Shop Info */}
//             <div className="mt-5 flex items-center justify-between gap-4 border rounded-lg p-4">
//               <div className="flex items-center">
//                 {/* <img
//                   src={
//                     data?.shop?.avatar?.url
//                       ? data.shop.avatar.url
//                       : "/no-image.png"
//                   }
//                   alt=""
//                   className="w-[50px] h-[50px] rounded-full object-cover mr-3"
//                 /> */}
//                 <img

//   src={
//     data?.shop?.shop_avatar?.url
//       ? data.shop.shop_avatar.url
//       : "/no-image.png"
//   }
//   alt="shop"
//   className="w-[50px] h-[50px] rounded-full object-cover mr-3"
// />


//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     {data.shop.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     ({data.shop.ratings}) Ratings
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={handleMessageSubmit}
//                 className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-800 transition"
//               >
//                 Send message
//                 <AiOutlineMessage />
//               </button>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="pt-2">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               {data.name}
//             </h2>

//             <p className="text-gray-500 mt-3 leading-7">{data.description}</p>

//             <div className="mt-5 flex items-center gap-4">
//               <h3 className="text-2xl font-bold text-red-600">
//                 ${data.discount_price}
//               </h3>

//               {data.price && (
//                 <h4 className="text-lg text-gray-400 line-through">
//                   ${data.price}
//                 </h4>
//               )}
//             </div>

//             <p className="mt-3 text-green-500 font-medium">
//               {data.total_sell} sold
//             </p>

//             <div className="mt-6 flex items-center gap-4">
//               <button
//                 onClick={handleDecrement}
//                 className="w-9 h-9 rounded-full bg-gray-200 text-xl flex items-center justify-center hover:bg-gray-300"
//               >
//                 -
//               </button>

//               <span className="font-semibold text-lg">{count}</span>

//               <button
//                 onClick={handleIncrement}
//                 className="w-9 h-9 rounded-full bg-gray-200 text-xl flex items-center justify-center hover:bg-gray-300"
//               >
//                 +
//               </button>

//               {click ? (
//                 <button
//                   onClick={() => removeFromWishlistHandler(data)}
//                   className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50 transition"
//                   title="Remove from wishlist"
//                 >
//                   <AiFillHeart size={20} color="red" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => addToWishlistHandler(data)}
//                   className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
//                   title="Add to wishlist"
//                 >
//                   <AiOutlineHeart size={20} color="#333" />
//                 </button>
//               )}
//             </div>

//             <button className="mt-6 w-full bg-[#3b28cc] text-white py-3 rounded-lg font-medium hover:bg-[#2f1fb0] transition"
//             onClick={()=> addToCartHandler(data._id)}
//             >
//               Add to cart
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body,
//   );
// };

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart.action";

export const ProductDetailCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  if (!data) return null;

  // ✅ SAFE IMAGE HANDLING (supports all your formats)
  const imageSrc =
    data?.images?.[0]
      ? `${backend_url}/${data.images[0]}`
      : data?.image_Url?.[0]?.url ||
        data?.image_Url?.[0] ||
        "/no-image.png";

  // ✅ SHOP IMAGE FIX
  const shopImg =
    data?.shop?.shop_avatar?.url || "/no-image.png";

  // ✅ WISHLIST
  const addToWishlistHandler = (product) => {
    setClick(true);

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item?._id === product?._id);

    if (exists) return;

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const removeFromWishlistHandler = (product) => {
    setClick(false);

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter((item) => item?._id !== product?._id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  // ✅ QUANTITY
  const handleIncrement = () => {
    if (data.stock && count >= data.stock) return;
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  // ✅ FIXED CART HANDLER (NO CRASHES)
  const addToCartHandler = () => {
    if (!data) return;

    const isItemExists =
      cart &&
      cart.find(
        (item) =>
          item &&
          (item._id === data._id || item.id === data.id)
      );

    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      const cartData = {
        ...data,
        qty: count,
      };

      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-white w-full max-w-[950px] max-h-[85vh] overflow-y-auto rounded-lg shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white"
        >
          <RxCross1 size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {/* LEFT */}
          <div>
            <div className="w-full h-[320px] bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={imageSrc}
                alt={data?.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* SHOP */}
            <div className="mt-5 flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  src={shopImg}
                  alt="shop"
                  className="w-[50px] h-[50px] rounded-full object-cover mr-3"
                />

                <div>
                  <h3 className="font-semibold">
                    {data?.shop?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ({data?.shop?.ratings || 0}) Ratings
                  </p>
                </div>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center gap-1">
                Send message <AiOutlineMessage />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-2xl font-semibold">{data?.name}</h2>

            <p className="text-gray-500 mt-3">
              {data?.description}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <h3 className="text-2xl font-bold text-red-600">
                ${data?.discount_price}
              </h3>

              {data?.price && (
                <h4 className="text-gray-400 line-through">
                  ${data.price}
                </h4>
              )}
            </div>

            <p className="mt-3 text-green-500">
              {data?.total_sell} sold
            </p>

            {/* QUANTITY */}
            <div className="mt-6 flex items-center gap-4">
              <button onClick={handleDecrement}>-</button>
              <span>{count}</span>
              <button onClick={handleIncrement}>+</button>

              {click ? (
                <AiFillHeart
                  size={22}
                  color="red"
                  onClick={() =>
                    removeFromWishlistHandler(data)
                  }
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  onClick={() =>
                    addToWishlistHandler(data)
                  }
                />
              )}
            </div>

            {/* ADD TO CART */}
            <button
              className="mt-6 w-full bg-[#3b28cc] text-white py-3 rounded-lg"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};