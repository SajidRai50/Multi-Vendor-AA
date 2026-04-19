import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.js";
import logo from "../../Assests/logo.svg";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";

export const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData([]);
      return;
    }

    const filteredProducts = productData.filter((product) =>
      product?.name?.toLowerCase().includes(term.toLowerCase()),
    );

    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Header */}
      <div className="w-full bg-white shadow-sm">
        <div
          className={`${styles.section} h-[80px] flex items-center justify-between`}
        >
          <div className="flex items-center">
            <Link to="/home">
              <img
                src={logo}
                alt="Logo"
                className="h-[55px] w-auto object-contain"
              />
            </Link>
          </div>

          <div className="w-[55%] relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[45px] pl-4 pr-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            <AiOutlineSearch
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            />

            {searchData.length > 0 && (
              <div className="absolute top-[52px] left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[320px] overflow-y-auto">
                {searchData.map((item, index) => {
                  const productName = item?.name || "No Name";
                  const productSlug = productName
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const productImage =
                    item?.image_Url?.[0]?.url ||
                    "https://via.placeholder.com/50";

                  return (
                    <Link to={`/product/${productSlug}`} key={index}>
                      <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition cursor-pointer border-b last:border-b-0">
                        <img
                          src={productImage}
                          alt={productName}
                          className="w-[50px] h-[50px] object-cover rounded-md border"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50";
                          }}
                        />
                        <span className="text-sm text-gray-800 line-clamp-2">
                          {productName}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.button}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium hidden lg:block">
              Welcome
            </span>
          </div>
        </div>
      </div>

      {/* Blue Navbar Row */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden lg:flex items-center w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} h-[70px] flex items-center justify-between`}
        >
          <div className="relative">
            <button
              onClick={() => setDropDown(!dropDown)}
              className="h-[50px] min-w-[220px] px-4 pr-10 flex items-center justify-start gap-3 bg-white rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <BiMenuAltLeft size={24} className="text-gray-700" />
              <span className="text-sm font-medium whitespace-nowrap text-gray-800">
                All Categories
              </span>
              <IoIosArrowDown
                size={18}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-transform duration-200 ${
                  dropDown ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropDown && (
              <div className="absolute top-[58px] left-0 w-[260px] bg-white rounded-md shadow-lg z-50">
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center">
            <Navbar active={activeHeading} />
          </div>

          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <div
              className="relative cursor-pointer"
              // onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={28} className="text-white/80" />

              <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-[18px] h-[18px] text-white text-[11px] flex items-center justify-center">
                {/* {wishlist && wishlist.length} */} 0
              </span>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              // onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={28} className="text-white/80" />

              <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-[18px] h-[18px] text-white text-[11px] flex items-center justify-center">
                {/* {cart && cart.length} */} 0
              </span>
            </div>

            {/* auth */}

            <div
              className="relative cursor-pointer"
              // onClick={() => setOpenWishlist(true)}
            >
              <Link to={"/login"}>
                <CgProfile size={28} className="text-white/80" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
