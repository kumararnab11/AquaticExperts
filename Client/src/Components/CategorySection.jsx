import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import fishFoodImg from "../assets/FishFoodImg.jpg";
import SoilImg from "../assets/SoilImg.jpg";
import FilterImg from "../assets/FilterImg.jpg";
import LightImg from "../assets/LightImg.jpg";
import ToolsImg from "../assets/ToolsImg.jpg";

const categories = [
  { name: "Fish Foods", image: fishFoodImg, path: "fishfoods" },
  { name: "Soil & Substrates", image: SoilImg, path: "soil" },
  { name: "Filter & Media", image: FilterImg, path: "filter" },
  { name: "Light", image: LightImg, path: "light" },
  { name: "Tools", image: ToolsImg, path: "tools" },
];

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full shadow-md border border-gray-200 hover:bg-white/80 transition-all z-10"
    onClick={onClick}
  >
    <ChevronRight size={18} />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full shadow-md border border-gray-200 hover:bg-white/80 transition-all z-10"
    onClick={onClick}
  >
    <ChevronLeft size={18} />
  </button>
);

const CategorySection = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 1.2, arrows: false } },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 relative px-4">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] underline underline-offset-8 mb-6">
        Explore Categories
      </h2>

      <Slider {...settings}>
        {categories.map(({ name, image, path }, index) => (
          <div key={index} className="px-3">
            <div
              className="group relative flex flex-col items-center justify-center w-48 h-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg cursor-pointer overflow-hidden transition-all hover:scale-105"
              onClick={() => navigate(path)}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-2xl transition-all group-hover:opacity-90"
              />
              <span className="absolute bottom-2 text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-md transition-all group-hover:bg-black/70">
                {name}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySection;