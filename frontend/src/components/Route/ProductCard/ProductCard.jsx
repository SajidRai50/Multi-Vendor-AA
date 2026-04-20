// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import { AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";

// export const ProductCard = ({ data }) => {
//   const [click, setClick] = useState(false);
//   const [open, setOpen] = useState(false);

//   const d = data.name;
//   const product_name = d.replace(/\s+/g, "-");
//   return (
//     <>
//       <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
//         <div className="flex justify-end"></div>

//         <Link to={`/product/${product_name}`}>
//           <img
//             src={data.image_Url[0].url}
//             alt=""
//             className="w-full h-[170px] object-contain"
//           />
//         </Link>

//         <Link to="/">
//           <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
//         </Link>

//         <Link to={`/product/${product_name}`}>
//           <h4 className="pb-3 font-[500]">
//             {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//           </h4>
//           {/* ..........rating......... */}
//           <div className="flex">
//             <AiFillStar
//               size={20}
//               className="mr-2 cursor-pointer color='#F6BA00'"
//             />
//             <AiFillStar
//               size={20}
//               className="mr-2 cursor-pointer color='#F6BA00'"
//             />
//             <AiFillStar
//               size={20}
//               className="mr-2 cursor-pointer color='#F6BA00'"
//             />
//             <AiFillStar
//               size={20}
//               className="mr-2 cursor-pointer color='#F6BA00'"
//             />
//             <AiOutlineStar
//               size={20}
//               className="mr-2 cursor-pointer color='#F6BA00'"
//             />
//           </div>

//           {/* ..........price and solled.............. */}

//           <div className="py-2 flex items-center justify-between">
//             <div className="flex">
//               <h5 className={`${styles.productDiscountPrice}`}>
//                 ${data.discount_price}
//               </h5>

//               <h4 className={`${styles.price}`}>
//                 {data.discount_price < data.price ? `$${data.price}` : null}
//               </h4>
//             </div>
//             <span className="font-[400] text-[17px] text-[#68d284]">
//               {data.total_sell} sold
//             </span>
//           </div>

// {/*
//           ..........side options................ */}




//         </Link>



//         <div>

//  {click ? (
//             <AiFillHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => removeFromWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Remove from wishlist"
//             />
//           ) : (
//             <AiOutlineHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => addToWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Add to wishlist"
//             />
//           )}


//            <AiOutlineEye
//             size={22}
//             className="cursor-pointer absolute right-2 top-14"
//             onClick={() => setOpen(!open)}
//             color="#333"
//             title="Quick view"
//           />
//           <AiOutlineShoppingCart
//             size={25}
//             className="cursor-pointer absolute right-2 top-24"
//             onClick={() => addToCartHandler(data._id)}
//             color="#444"
//             title="Add to cart"
//           />

//         </div>
//       </div>
//     </>
//   );
// };



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

export const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div className="group relative w-full h-[390px] bg-white rounded-xl border border-gray-200 shadow-sm p-3 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <Link to={`/product/${product_name}`} className="block">
          <div className="w-full h-[190px] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={data.image_Url[0].url}
              alt={data.name}
              className="w-full h-[170px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="pt-3">
          <Link to="/" className="block">
            <h5 className={`${styles.shop_name} text-sm text-gray-500 hover:text-[#3957db] transition-colors`}>
              {data.shop.name}
            </h5>
          </Link>

          <Link to={`/product/${product_name}`} className="block">
            <h4 className="pt-1 pb-2 font-[500] text-[16px] text-[#333] leading-[1.4] hover:text-[#3957db] transition-colors">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </h4>

            <div className="flex items-center mb-2">
              <AiFillStar size={18} className="mr-1 text-[#f6ba00]" />
              <AiFillStar size={18} className="mr-1 text-[#f6ba00]" />
              <AiFillStar size={18} className="mr-1 text-[#f6ba00]" />
              <AiFillStar size={18} className="mr-1 text-[#f6ba00]" />
              <AiOutlineStar size={18} className="mr-1 text-[#f6ba00]" />
            </div>

            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h5 className={`${styles.productDiscountPrice} text-[18px] font-semibold text-[#d02222]`}>
                  ${data.discount_price}
                </h5>

                <h4 className={`${styles.price} text-[14px] text-gray-400 line-through`}>
                  {data.discount_price < data.price ? `$${data.price}` : null}
                </h4>
              </div>

              <span className="font-[500] text-[15px] text-[#68d284]">
                {data.total_sell} sold
              </span>
            </div>
          </Link>
        </div>

        <div className="absolute right-3 top-4 flex flex-col gap-3 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          {click ? (
            <button
              onClick={() => removeFromWishlistHandler(data)}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50 transition"
              title="Remove from wishlist"
            >
              <AiFillHeart size={20} color="red" />
            </button>
          ) : (
            <button
              onClick={() => addToWishlistHandler(data)}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
              title="Add to wishlist"
            >
              <AiOutlineHeart size={20} color="#333" />
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition"
            title="Quick view"
          >
            <AiOutlineEye size={20} color="#333" />
          </button>

          <button
            onClick={() => addToCartHandler(data._id)}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-green-50 transition"
            title="Add to cart"
          >
            <AiOutlineShoppingCart size={22} color="#444" />
          </button>
        </div>
      </div>
    </>
  );
};
