import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";

const categories = [
  { name: "Fish Foods", icon: "🐠",path:"fishfoods" },
  { name: "Soil", icon: "🪵",path:"soil" },
  { name: "Medicines", icon: "💊",path:"medicines" },
  { name: "Filter", icon: "⚙️",path:"filter" },
  { name: "Light", icon: "💡",path:"light" },
  { name: "CO2", icon: "🌿",path:"co2" },
  { name: "Accessories", icon: "🔧",path:"accessories" },
];

// Custom Next Arrow Component
const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 shadow-lg hover:bg-black/70 transition"
    onClick={onClick}
  >
    <ArrowRight size={24} className="text-white" />
  </button>
);

// Custom Previous Arrow Component
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 shadow-lg hover:bg-black/70 transition"
    onClick={onClick}
  >
    <ArrowLeft size={24} className="text-white" />
  </button>
);

const CategorySection = () => {
  const navigate=useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 ,arrows: false},
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3 ,arrows: false},
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative overflow-hidden">
      <Slider {...settings}>
        {categories.map(({ name, icon,path }, index) => (
          <div key={index} className="px-2">
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] text-white w-24 h-24 rounded-xl shadow-md"
              onClick={()=>navigate(path)}
            >
              <span className="text-3xl">{icon}</span>
              <span className="text-sm mt-2">{name}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySection;
