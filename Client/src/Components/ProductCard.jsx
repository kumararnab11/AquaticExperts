import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const ProductCard = ({ image, desc, price, discount,name , _id}) => {
  const [quantity, setQuantity] = useState(0);

  // Calculate discount percentage
  const discountPercentage = discount;

  const navigate =useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[270px] border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-lg relative"
    onClick={()=>navigate(`/product/${_id}`)}>
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 bg-transparent text-red-600 text-xs font-bold px-2 py-1 rounded">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-t-2xl" />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{desc}</p>

        {/* Price & Cart Actions */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-teal-600 font-bold text-lg">${price}</span>

          {/* Cart Buttons */}
          {quantity === 0 ? (
            <button
              className="bg-[#FF9900] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#E68A00] transition"
              onClick={() => setQuantity(1)}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-300 px-2 py-1 rounded text-lg font-bold hover:bg-gray-400 transition"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="bg-gray-300 px-2 py-1 rounded text-lg font-bold hover:bg-gray-400 transition"
                onClick={() => setQuantity(quantity + 1)}
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
