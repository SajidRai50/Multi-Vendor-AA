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
  SellerActivationPage,
  ShopLoginPage,
  ShopHomePage,
} from "./Routes/Routes.js";
import { ShopDashboardPage, ShopCreateProduct,ShopAllProducts ,ShopCreateEvents ,ShopAllEvents,ShopAllCoupouns } from "./Routes/ShopRoutes.js";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loadSeller } from "./redux/actions/user.action.js";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./Routes/SellerProtectedRoute.jsx";
import { getAllEvents } from "./redux/actions/event.action.js";

export const App = () => {
  const { loading } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllEvents())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:token" element={<ActivationPage />} />

        {/* ================= SELLER AUTH ================= */}
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />

        {/* ================= USER PROTECTED ================= */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute loading={loading}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* ================= SELLER PROTECTED ================= */}
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts/>
            </SellerProtectedRoute>
          }
        />

         <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents/>
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents/>
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns/>
            </SellerProtectedRoute>
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
