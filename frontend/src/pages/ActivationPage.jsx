import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

export const ActivationPage = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await axios.post(`${server}/user/activation`, {
          activation_token: token,
        });

        console.log(res.data);

        setLoading(false);

        // redirect to login after success
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (err) {
        console.log(err.response?.data);
        setError("Activation failed or token expired");
        setLoading(false);
      }
    };

    if (token) {
      activateUser();
    }
  }, [token, navigate]);

 if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Activating your account...
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we verify your email.
        </p>
      </div>
    </div>
  );

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Activation Failed
        </h2>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-4 rounded-full">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Account Activated 🎉
      </h2>
      <p className="text-gray-600">
        Redirecting you to login...
      </p>
    </div>
  </div>
);
};