

import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.js";
import logo from "../../Assests/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft, BiX } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server.js";

import axios from "axios";
import { toast } from "react-toastify";

import Cart from "../Cart/Cart.jsx";
import  Wishlist  from "../Wishlist/Wishlist.jsx";

export const Header = ({ activeHeading }) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchData([]);
      return;
    }

    const filtered = productData.filter((p) =>
      p?.name?.toLowerCase().includes(value.toLowerCase()),
    );

    setSearchData(filtered);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);

        setMobileMenu(false);

        setTimeout(() => {
          window.location.href = "/login";
        }, 200);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <div className="w-full bg-white shadow-sm">
        <div
          className={`${styles.section} h-[70px] flex items-center justify-between gap-3`}
        >
          {/* logo + menu */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileMenu(true)}>
              <BiMenuAltLeft size={28} />
            </button>

            <Link to="/">
              <img src={logo} className="h-[45px]" />
            </Link>
          </div>

          {/* SEARCH + SELLER BUTTON */}
          <div className="flex-1 flex items-center gap-3 mx-3 justify-between">
            {/* SEARCH */}
            <div className="relative w-full max-w-[420px]">
              <input
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full h-[42px] pl-4 pr-10 border rounded-md"
              />

              <AiOutlineSearch className="absolute right-3 top-3 text-gray-500" />

              {searchData.length > 0 && (
                <div className="absolute w-full bg-white shadow-lg mt-2 max-h-[320px] overflow-y-auto z-50 rounded-md border">
                  {searchData.map((item, i) => (
                    <Link
                      key={i}
                      to={`/product/${item.name
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      onClick={() => setSearchTerm("")}
                    >
                      <div className="flex items-center gap-3 p-2 hover:bg-gray-100">
                        <img
                          src={
                            item?.image_Url?.[0]?.url ||
                            "https://via.placeholder.com/50"
                          }
                          className="w-[40px] h-[40px] rounded object-cover"
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* BECOME SELLER */}
            <Link
              to="/shop-create"
              className="hidden sm:flex px-4 py-2 bg-black text-white rounded-md text-sm whitespace-nowrap"
            >
              Become Seller
            </Link>
          </div>

          {/* icons (mobile only here) */}
          <div className="flex items-center gap-4 lg:hidden">
            <AiOutlineHeart size={24} onClick={() => setOpenWishlist(true)} />
            <AiOutlineShoppingCart
              size={24}
              onClick={() => setOpenCart(true)}
            />

            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={`${backend_url}${user?.avatar?.url}`}
                  className="w-[35px] h-[35px] rounded-full"
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= DESKTOP NAV ================= */}
      <div
        className={`hidden lg:flex w-full bg-[#3321c8] h-[70px] items-center ${
          active ? "fixed top-0 z-10" : ""
        }`}
      >
        <div className={`${styles.section} flex items-center justify-between`}>
          {/* categories */}
          <div className="border rounded-xl p-2 bg-white">
            <button
              onClick={() => setDropDown(!dropDown)}
              className="flex items-center justify-between px-2 py-3 font-medium"
            >
              All Categories
              <IoIosArrowDown
                className={`${dropDown ? "rotate-180" : ""} transition`}
              />
            </button>

            {dropDown && (
              <div className="mt-2 max-h-[300px] overflow-y-auto border bg-white rounded-lg shadow-sm">
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              </div>
            )}
          </div>

          {/* NAV + ICONS */}
          <div className="flex items-center gap-8 text-white">
            <Navbar active={activeHeading} />

            {/* RIGHT ICONS (MOVED HERE) */}
            <div className="flex items-center gap-4">
              {/* Wishlist */}
              <div
                className="cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={24} />
              </div>

              {/* Cart */}
              <div className="cursor-pointer" onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart size={24} />
              </div>

              {/* Profile */}
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${backend_url}${user?.avatar?.url}`}
                    className="w-[32px] h-[32px] rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenu(false)}
          />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-[82%] bg-white shadow-xl flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <BiX size={28} onClick={() => setMobileMenu(false)} />
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
              {/* SHOP */}
              <div>
                <p className="text-xs text-gray-400 mb-2 uppercase">Shop</p>

                <div className="border rounded-xl overflow-hidden">
                  <Link
                    onClick={() => setMobileMenu(false)}
                    to="/"
                    className="block px-4 py-3 border-b"
                  >
                    Home
                  </Link>

                  <Link
                    onClick={() => setMobileMenu(false)}
                    to="/products"
                    className="block px-4 py-3 border-b"
                  >
                    Products
                  </Link>

                  <Link
                    onClick={() => setMobileMenu(false)}
                    to="/events"
                    className="block px-4 py-3 border-b"
                  >
                    Events
                  </Link>

                  <Link
                    onClick={() => setMobileMenu(false)}
                    to="/seller"
                    className="block px-4 py-3"
                  >
                    Become Seller
                  </Link>
                </div>
              </div>

              {/* SUPPORT */}
              <div>
                <p className="text-xs text-gray-400 mb-2 uppercase">Support</p>

                <div className="border rounded-xl overflow-hidden">
                  <Link
                    onClick={() => setMobileMenu(false)}
                    to="/faq"
                    className="block px-4 py-3 border-b"
                  >
                    FAQ
                  </Link>

                  {!isAuthenticated ? (
                    <Link
                      onClick={() => setMobileMenu(false)}
                      to="/login"
                      className="block px-4 py-3 text-blue-600 font-medium"
                    >
                      Login
                    </Link>
                  ) : (
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-3 text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART */}
      {openCart ? (<Cart setOpenCart={setOpenCart}/>
    ) : null
    }

      {/* WISHLIST */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};
