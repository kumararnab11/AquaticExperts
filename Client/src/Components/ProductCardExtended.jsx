import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCardExtended = ({ id, images, name, price, description, details }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-[#dbcfc9] min-h-screen flex justify-center items-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row p-6 lg:p-8 max-h-screen lg:max-h-[90vh]">
        
        {/* Left Side: Image Slider (Sticky for Desktop) */}
        <div className="lg:w-1/2 w-full lg:sticky top-10">
          <div className="sticky top-0 bg-white z-10">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} className="flex justify-center">
                  <img src={img} alt={`Product ${index}`} className="w-full max-w-xs h-80 object-cover rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-4 mt-6">
            <button className="flex-1 bg-black font-bold text-[#66D2CE] py-3 rounded-lg shadow-md hover:bg-gray-900">
              Add to Cart
            </button>
            <button className="flex-1 bg-black font-bold text-[#66D2CE] py-3 rounded-lg shadow-md hover:bg-gray-900">
              Buy Now
            </button>
          </div>
        </div>

        {/* Right Side: Scrollable Details */}
        <div className="lg:w-1/2 w-full mt-6 lg:mt-0 lg:pl-8 overflow-y-auto max-h-full lg:max-h-[80vh] flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-lg text-gray-700 mt-2">{description}</p>
          <p className="text-xl font-semibold text-[#2DAA9E] mt-4">₹{price}</p>

          <h2 className="text-lg font-bold mt-6 text-gray-800">Product Details</h2>
          <ul className="list-disc pl-6 text-gray-600">
            {details.map((detail, index) => (
              <li key={index} className="mt-2">{detail}</li>
            ))}
          </ul>
        </div>

        {/* Mobile Buttons (Sticky at Bottom) */}
        <div className="lg:hidden w-full bg-white shadow-lg">
          <div className="sticky bottom-0 left-0 flex gap-4 p-4">
            <button className="flex-1 bg-black text-[#66D2CE] font-bold py-3 rounded-lg shadow-md hover:bg-gray-900">
              Add to Cart
            </button>
            <button className="flex-1 bg-black text-[#66D2CE] font-bold py-3 rounded-lg shadow-md hover:bg-gray-900">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dummy Data
const dummyProduct = {
  id: 1,
  images: [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300/ff7f7f",
    "https://via.placeholder.com/300/77ff7f",
  ],
  name: "Noise Smartwatch 1.69” Display",
  price: "1,099",
  description: "Bluetooth Calling, Built-in Games, AI Voice Assistant, Deep Wine Strap.",
  details: [
    "1.69” TFT LCD Display",
    "Bluetooth Calling with AI Voice Assistant",
    "Noise Health Suite™: Heart Rate, Blood Oxygen, Stress Monitor",
    "Multiple Sports Modes & Customizable Watch Faces",
    "Battery Life up to 7 Days",
    "Water Resistant (IP68)",
  ],
};

// Render Component
export default function App() {
  return <ProductCardExtended {...dummyProduct} />;
}
