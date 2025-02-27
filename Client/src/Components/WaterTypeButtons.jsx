import React from "react";
import { useNavigate } from "react-router";

const WaterTypeButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between m-4 gap-4 p-4 w-full max-w-6xl mx-auto">
      <button
        className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold border-2 border-teal-700 rounded-lg hover:from-teal-500 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex-1"
        onClick={() => navigate("/marine")}
      >
        Marine
      </button>
      <button
        className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold border-2 border-green-700 rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex-1"
        onClick={() => navigate("/planted")}
      >
        Planted
      </button>
      <button
        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold border-2 border-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex-1"
        onClick={() => navigate("/freshwater")}
      >
        Freshwater
      </button>
    </div>
  );
};

export default WaterTypeButtons;
