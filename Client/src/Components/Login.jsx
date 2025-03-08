import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const API_BASE_URL = "http://localhost:4500/api/v1";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

      if (response.data.success) {
        console.log("Login Successful:", response.data);
        toast.success(response.data.message || "Login Successful!");
        // Redirect the user after successful login
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message || "Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Error Logging In:", error);

      if (error.response) {
        toast.error(error.response.data?.message || "Invalid email or password!");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dbcfc9] px-4">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-md md:max-w-2xl overflow-hidden">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-black flex flex-col justify-center items-center p-8 md:w-1/2 w-full 
          rounded-b-[50px] md:rounded-r-[80px] md:rounded-bl-none">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Hello, Welcome!</h2>
          <p className="text-sm md:text-base mb-4">Don't have an account?</p>
          <button
            className="bg-white font-semibold text-teal-500 px-6 py-2 rounded-lg shadow-md"
            onClick={() => navigate("/register", { replace: true })}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black">Login</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-[#5DEECB] text-black"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-[#5DEECB] text-black"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <a href="#" className="text-teal-700 text-sm">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-black py-3 rounded-lg font-semibold shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 my-4">or login with social platforms</p>
          
          <div className="flex justify-center gap-4">
            <button className="bg-gray-200 p-3 rounded-full shadow-md text-black">G</button>
            <button className="bg-gray-200 p-3 rounded-full shadow-md text-black">F</button>
            <button className="bg-gray-200 p-3 rounded-full shadow-md text-black">Git</button>
            <button className="bg-gray-200 p-3 rounded-full shadow-md text-black">In</button>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
