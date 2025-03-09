import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:4000/api/v1";

const Register = () => {
  const navigate = useNavigate();
  const [regState, updateRegState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");

  // ✅ Function to send OTP
  const sendOtp = async (userEmail) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sendotp`, { email: userEmail });
  
      if (response.data.success) {
        console.log("OTP Sent Successfully:", response.data);
        toast.success(response.data.message || "OTP sent! Check your email.");
      } else {
        toast.error(response.data.message || "Failed to send OTP!");
      }
    } catch (error) {
      console.error("Error Sending OTP:", error);
  
      if (error.response) {
        // Server responded with an error status
        toast.error(error.response.data?.message || "Failed to send OTP!");
      } else if (error.request) {
        // No response received from the server
        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verifyotp`, { email, otp });
  
      if (response.data.success) {
        console.log("OTP Verified Successfully:", response.data);
        toast.success(response.data.message || "OTP Verified Successfully!");
        updateRegState(false);
        await createUser(); // Ensure user is created only after OTP verification
        return response.data;
      } else {
        toast.error(response.data.message || "OTP verification failed!");
      }
    } catch (error) {
      console.error("Error Verifying OTP:", error);
  
      if (error.response) {
        // Server responded with an error status
        toast.error(error.response.data?.message || "OTP verification failed!");
      } else if (error.request) {
        // No response received from the server
        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred.");
      }
  
      throw error; // Rethrow the error for further handling if needed
    }
  };
  

  // ✅ Function to create a user
  const createUser = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, { name, email, password });
  
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      console.error("Error Creating User:", error);
  
      if (error.response) {
        // Server responded with an error status
        toast.error(error.response.data?.message || "Registration failed!");
      } else if (error.request) {
        // No response received from server
        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  // ✅ Handle Register Form Submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Register");

    if (!regState) {
      if (!email) {
        toast.error("Please enter your email first!");
        return;
      }
      updateRegState(true);
      console.log("Sending OTP...");
      sendOtp(email);
    } else {
      verifyOtp();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dbcfc9] px-4">
      <ToastContainer /> {/* ✅ Include ToastContainer here */}
      <div className="bg-white shadow-lg rounded-lg flex flex-col-reverse md:flex-row-reverse w-full max-w-md md:max-w-2xl overflow-hidden">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-black flex flex-col justify-center items-center p-8 md:w-1/2 w-full 
          rounded-t-[50px] md:rounded-l-[80px] md:rounded-tr-none">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm md:text-base mb-4">Already have an account?</p>
          <button className="bg-white text-[#2DAA9E] px-6 py-2 rounded-lg font-semibold shadow-md"
            onClick={() => navigate('/login', { replace: true })}
          >
            Login
          </button>
        </div>

        {/* Register Form */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black">Register</h2>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
              />
            </div>

            {/* OTP Section */}
            {regState && (
              <div>
                <div className="mb-4">
                  <input
                    type="number"
                    placeholder="OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
                  />
                </div>
                <div className="text-right mb-4">
                  <button
                    type="button"
                    className="text-[#2DAA9E] text-sm"
                    onClick={() => sendOtp(email)}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-black py-3 rounded-lg font-semibold shadow-md">
              {regState ? "Verify OTP" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
