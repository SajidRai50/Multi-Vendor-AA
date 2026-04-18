import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/user/login-user`,
        { email, password },
        { withCredentials: true },
      );

      toast.success("Login successful 🎉");
      navigate("/home");
    } catch (error) {
      console.log("Login error:", error);
      console.log("Response data:", error?.response?.data);
      console.log("Status:", error?.response?.status);

      toast.error(error?.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex-col justify-center pt-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* .....email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-meduim text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* .........password......... */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-meduim text-gray-700"
              >
                Enter Your Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                >
                  {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="
                checkbox" name="remember-me" id="remember-me"
                />
              </div>

            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />

                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forget Password?
                </a>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full h- [40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-700 "
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="flex items-center w-full ">
              <h4>Not Have an Account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign-Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
