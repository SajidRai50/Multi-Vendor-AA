import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";

export const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const [count ,setCount] = useState(0)
  const navigate = useNavigate();

  const incrementCount =() =>{
    setCount(count+ 1);
  };

   const decrementCount =() =>{
    if (count > 0)
    setCount(count - 1);
  };

  const handleMessageSubmit = () =>{
    navigate('/inbox?converstion=hello ,how are you?')
  }

  // console.log(data);
  // console.log(data?.image_Url);


  return (
    <div className="bg-white py-6">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] mx-auto`}>
          <div className="w-full">
            <div className="flex flex-col 800px:flex-row gap-8">
              {/* LEFT SIDE - IMAGES */}
              <div className="w-full 800px:w-[50%] flex flex-col gap-4">
                {/* Main Image */}
                <div className="w-full flex justify-center items-center">
                  <div className="w-full bg-gray-50 rounded-xl p-3 shadow-sm">
                    <img
                      src={data?.image_Url?.[select]?.url}
                      alt="product"
                      className="w-full h-[350px] 800px:h-[450px] object-contain rounded-lg transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="w-full">
                  {data?.image_Url?.length > 0 ? (
                    <div className="grid grid-cols-3 800px:grid-cols-2 gap-4">
                      {data?.image_Url?.[0] && (
                        <div
                          className={`cursor-pointer border rounded-lg p-2 transition hover:shadow-md ${
                            select === 0 ? "border-blue-500" : "border-gray-200"
                          }`}
                          onClick={() => setSelect(0)}
                        >
                          <img
                            src={data?.image_Url?.[0]?.url}
                            alt="image"
                            className="h-[120px] w-full object-cover rounded-md"
                          />
                        </div>
                      )}

                      {data?.image_Url?.[1] && (
                        <div
                          className={`cursor-pointer border rounded-lg p-2 transition hover:shadow-md ${
                            select === 1 ? "border-blue-500" : "border-gray-200"
                          }`}
                          onClick={() => setSelect(1)}
                        >
                          <img
                            src={data?.image_Url?.[1]?.url}
                            alt="image"
                            className="h-[120px] w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm text-center">
                      No more images available
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE - DETAILS */}
              <div className="w-full 800px:w-[50%] bg-gray-50 rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Product Details :
                </h1>
                <h2 className={`${styles.productTitle} pt-2`}>{data.name}</h2>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
              </div>

              {/* .......buttun...... */}
              <div className="w-full 800px:w-[50%] bg-gray-50 rounded-xl p-6 shadow-sm flex ">
                {/* <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>

                   <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>

                     <div>

                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => removeFromWishlistHandler(data)}
                        // color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />

                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => addToWishlistHandler(data)}
                        // color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />

                  </div>
                </div> */}

                <div className="flex items-center gap-2">
                        <button

                          className="w-[28px] h-[28px] flex items-center justify-center bg-gray-200 rounded-full"
                        >
                          <HiMinus size={16}
                          onClick={decrementCount}
                          />
                        </button>

                        <span className="min-w-[20px] text-center">{count}</span>

                        <button

                          className="w-[28px] h-[28px] flex items-center justify-center bg-[#e44343] text-white rounded-full"
                        >
                          <HiPlus size={16}
                          onClick={incrementCount}
                          />
                        </button>
                      </div>
              </div>

              <div className={`${styles.button} mt-6 rounded h-11 flex items-center`}>

                <span className="text-white flex items-center">
                   Add to Cart <AiOutlineShoppingCart/>

                </span>
              </div>

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
