import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ images, desc, price, discount, name, _id ,user}) => {
  const q = user ? user.cart.find((q) => q._id === _id) : null;
  const [quantity, setQuantity] = useState(q ? q.quantity : 0);

  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:4000/api/v1";
  const createDb = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/additemcart`,
        {
          user: user._id,
          item:{ _id, quantity:1}
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);

      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  const deleteDb = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteitemcart`,
        {
          user: user._id,
          item:{ _id, quantity:0}
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);

      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  const updateDb = async (q) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/updateitemcart`,
        {
          user: user._id,
          item:{ _id, quantity:q}
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);

      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  const handleCart = (q,ind) =>{
    if(ind==1){
      createDb();
    }
    else if(ind==2){
      if(q==0){
        deleteDb();
      }
      else{
        updateDb(q);
      }
    }
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[120px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg relative flex flex-col cursor-pointer"
      onClick={() => navigate(`/product/${_id}`)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-[2px] rounded-md shadow-md">
          {discount}% OFF
        </div>
      )}

      {/* Product Image (Fixed Aspect Ratio) */}
      <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden p-2">
        <img
          src={images?.[0] || "/placeholder.jpg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-grow">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 truncate">
          {name}
        </h2>
        <p className="text-gray-2000 text-[10px] sm:text-xs md:text-sm mt-1 truncate">
          {desc}
        </p>

        {/* Price & Cart Actions */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-teal-600 font-bold text-sm sm:text-base md:text-lg">
            ₹{price}
          </span>

          {/* Cart Buttons */}
          {quantity === 0 ? (
            <button
              className="bg-[#FF9900] text-black px-3 py-[4px] rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-[#E68A00] transition-shadow shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(1);
                handleCart(1,1);
              }}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-300 px-3 py-[4px] rounded-md text-xs sm:text-sm md:text-base font-bold hover:bg-gray-400 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  const newQuantity=quantity-1;
                  setQuantity(newQuantity);
                  handleCart(newQuantity,2);
                }}
              >
                −
              </button>
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                {quantity}
              </span>
              <button
                className="bg-gray-300 px-3 py-[4px] rounded-md text-xs sm:text-sm md:text-base font-bold hover:bg-gray-400 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  const newQuantity=quantity + 1
                  setQuantity(newQuantity);
                  handleCart(newQuantity,2);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
