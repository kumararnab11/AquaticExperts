import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, desc, price, discount, name, _id }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-md shadow-sm overflow-hidden w-full max-w-[100px] sm:max-w-[130px] md:max-w-[150px] lg:max-w-[180px] xl:max-w-[200px] border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-md relative flex flex-col"
      onClick={() => navigate(`/product/${_id}`)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-1 left-1 bg-red-500 text-white text-[9px] sm:text-xs font-bold px-1 sm:px-2 py-[1px] rounded">
          {discount}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px] xl:h-[170px] flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-2 flex flex-col flex-grow">
        <h2 className="text-[9px] sm:text-xs md:text-sm font-semibold text-gray-800 truncate">
          {name}
        </h2>
        <p className="text-gray-500 text-[8px] sm:text-xs md:text-sm mt-1 truncate">
          {desc}
        </p>

        {/* Price & Cart Actions */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-teal-600 font-bold text-xs sm:text-sm md:text-base">
            ${price}
          </span>

          {/* Cart Buttons */}
          {quantity === 0 ? (
            <button
              className="bg-[#FF9900] text-black px-2 py-[2px] sm:px-3 sm:py-1 rounded text-[8px] sm:text-xs md:text-sm font-bold hover:bg-[#E68A00] transition"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(1);
              }}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center space-x-1">
              <button
                className="bg-gray-300 px-2 py-[2px] sm:px-3 sm:py-1 rounded text-[9px] sm:text-xs md:text-sm font-bold hover:bg-gray-400 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <span className="text-xs sm:text-sm md:text-base font-semibold">
                {quantity}
              </span>
              <button
                className="bg-gray-300 px-2 py-[2px] sm:px-3 sm:py-1 rounded text-[9px] sm:text-xs md:text-sm font-bold hover:bg-gray-400 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
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
