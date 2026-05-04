import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage, Home,ProductsPage ,BestSellingPage,EventPage,FAQPage} from "./Routes.js";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server.js";

export const App = () => {
 return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/activation/:token" element={<ActivationPage />} />
        <Route path ="/products" element ={<ProductsPage/>}/>
        <Route path ='/best-selling' element ={<BestSellingPage/>}/>
        <Route path = '/events' element ={<EventPage/>}/>
        <Route path="/faq" element ={<FAQPage/>}/>
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
 )
};
