import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login");
    //validation
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dbcfc9] px-4">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-md md:max-w-2xl overflow-hidden">
        
        {/* Welcome Section */}
        <div className="bg-teal-400 text-black flex flex-col justify-center items-center p-8 md:w-1/2 w-full 
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
            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                required
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
              className="w-full bg-teal-400 text-black py-3 rounded-lg font-semibold shadow-md"
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
    </div>
  );
};

export default Login;
