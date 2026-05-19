
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  LoginPage,
  SignupPage,
  ActivationPage,
  Home,
  ProductsPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  ProductDetailPage,
  ProfilePage,
  ShopCreate,
  SellerActivationPage,ShopLoginPage,ShopHomePage
} from "./Routes.js";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { loadUser , loadSeller} from "./redux/actions/user.action.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SellerProtectedRoute from "./SellerProtectedRoute.jsx";
// import { isSeller } from "../../backend/middleware/auth.js";

export const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const { isSeller} = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop-login" element={<ShopLoginPage/>} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/activation/:token" element={<ActivationPage />} />
        <Route path="/seller/activation/:activation_token" element={<SellerActivationPage/>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route path="/shop/:id" element={
          <SellerProtectedRoute
          isSeller={isSeller}
         >
            <ShopHomePage/>
          </SellerProtectedRoute>
        } />

        {/* 🔐 Protected Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loading={loading}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </BrowserRouter>
  );
};