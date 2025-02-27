import React from "react";

const ProductCard = ({ image, title, price, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[270px] border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-t-2xl" />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>

        {/* Price & Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-teal-600 font-bold text-lg">${price}</span>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
