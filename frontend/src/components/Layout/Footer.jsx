import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-12">

      {/* 🔵 Subscribe Section */}
      <div className="bg-gradient-to-r from-[#3b28cc] to-[#5b4cff] py-12 px-6 sm:px-10 rounded-xl mb-10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Text */}
          <div className="text-center md:text-left md:w-[50%]">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              <span className="text-[#56d879]">Subscribe</span> for latest updates
            </h1>
            <p className="text-gray-200 mt-3 text-sm">
              Get news, events and exclusive offers directly in your inbox.
            </p>
          </div>

          {/* Input + Button */}
          <div className="w-full md:w-[45%]">
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl overflow-hidden shadow-lg">

              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full px-4 py-3 text-gray-700 text-sm outline-none"
              />

              <button
                className="bg-[#56d879] hover:bg-[#3ccf5e] text-white font-semibold
                           px-6 py-3 transition-all duration-200
                           hover:shadow-md"
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ⚫ Main Footer */}
      <div className="bg-black">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="ShopO"
              className="h-[42px] brightness-0 invert"
            />

            <p className="text-gray-400 text-sm leading-6 mt-5 max-w-[260px]">
              The home and elements needed to create beautiful products.
            </p>

            <div className="flex items-center gap-4 mt-5">
              {[AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillYoutube].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#56d879] hover:text-black transition cursor-pointer"
                  >
                    <Icon size={18} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Company */}
          <ul>
            <h1 className="font-semibold mb-4 text-[#56d879] uppercase text-sm tracking-wide">
              Company
            </h1>
            {footerProductLinks.map((link, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={link.link}
                  className="text-gray-400 hover:text-[#56d879] text-sm transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Shop */}
          <ul>
            <h1 className="font-semibold mb-4 text-[#56d879] uppercase text-sm tracking-wide">
              Shop
            </h1>
            {footercompanyLinks.map((link, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={link.link}
                  className="text-gray-400 hover:text-[#56d879] text-sm transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Support */}
          <ul>
            <h1 className="font-semibold mb-4 text-[#56d879] uppercase text-sm tracking-wide">
              Support
            </h1>
            {footerSupportLinks.map((link, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={link.link}
                  className="text-gray-400 hover:text-[#56d879] text-sm transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ⚫ Bottom Bar */}
      <div className="border-t border-gray-800 bg-black">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center text-gray-400 text-sm">

          <span>© 2026 Becodemy. All rights reserved.</span>

          <span className="hover:text-white transition cursor-pointer">
            Terms · Privacy Policy
          </span>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop"
              alt="payment"
              className="max-w-[200px] object-contain rounded"
            />
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;