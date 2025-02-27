import React from "react";
import { useState , useEffect } from "react";
import {useNavigate} from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();
  const [regState, updateRegState] = useState(false);

  const handleSubmit = (event)=>{
          event.preventDefault();
          console.log("Register")
          if(!regState){
              updateRegState(true);
              console.log("Logic to send otp");
              //send email
          }
          else if(regState){
              //create new user
              updateRegState(false);
              console.log("Logic to create new user");
          }
      }

      useEffect(() => {
        if (regState) {
            sendOtp();
        }
      }, [regState]);

    const sendOtp = ()=>{
        console.log("otp sent")
    }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dbcfc9] px-4">
      <div className="bg-white shadow-lg rounded-lg flex flex-col-reverse md:flex-row-reverse w-full max-w-md md:max-w-2xl overflow-hidden">
        
        {/* Welcome Section (Bottom on Mobile, Right on Desktop) */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-black flex flex-col justify-center items-center p-8 md:w-1/2 w-full 
          rounded-t-[50px] md:rounded-l-[80px] md:rounded-tr-none">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm md:text-base mb-4">Already have an account?</p>
          <button className="bg-white text-[#2DAA9E] px-6 py-2 rounded-lg font-semibold shadow-md"
            onClick={()=>navigate('/login',{ replace: true })}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                required
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
              />
            </div>
            
            {
                regState &&
                <div>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="OTP"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2DAA9E]"
                        />
                    </div>
                        <div className="text-right mb-4">
                        <button className="text-[#2DAA9E] text-sm" onClick={sendOtp}>Resend OTP</button>
                    </div>
                </div>
            }

            <button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-black py-3 rounded-lg font-semibold shadow-md">
              Register
            </button>
          </form>

          <p className="text-center text-gray-500 my-4">or register with social platforms</p>
          
          <div className="flex justify-center gap-4">
            <button className="bg-gray-100 p-3 rounded-full shadow-md">G</button>
            <button className="bg-gray-100 p-3 rounded-full shadow-md">F</button>
            <button className="bg-gray-100 p-3 rounded-full shadow-md">Git</button>
            <button className="bg-gray-100 p-3 rounded-full shadow-md">In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;