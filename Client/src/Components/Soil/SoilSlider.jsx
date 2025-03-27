import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import PlantedSoilImg from "../../assets/PlantedSoilImg.jpg";
import SandSubstrateImg from "../../assets/SandSubstrateImg.jpg";
import GravelSubstrateImg from "../../assets/GravelSubstrateImg.jpg";
import CoralAragoniteImg from "../../assets/CoralAragoniteImg.jpg";
import ShrimpTankImg from "../../assets/ShrimpTankImg.png";

const soilCategories = [
  { name: "Planted Tank Soil", image: PlantedSoilImg, path: "planted-tank-soil" },
  { name: "Sand Substrate", image: SandSubstrateImg, path: "sand-substrate" },
  { name: "Gravel Substrate", image: GravelSubstrateImg, path: "gravel-substrate" },
  { name: "Coral & Aragonite Substrate", image: CoralAragoniteImg, path: "coral-aragonite-substrate" },
  { name: "Shrimp Tank Substrate", image: ShrimpTankImg, path: "shrimp-tank-substrate" },
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

const SoilSlider = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
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
        settings: { slidesToShow: 3, arrows: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, arrows: false },
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 relative overflow-hidden px-4">
      <Slider {...settings}>
        {soilCategories.map(({ name, image, path }, index) => (
          <div key={index} className="px-2">
            <div
              className="flex flex-col items-center justify-center bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] text-white w-36 h-44 rounded-xl shadow-md cursor-pointer p-2"
              onClick={() => navigate(path)}
            >
              <div className="w-32 h-36 overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-fill rounded-lg" />
              </div>
              <span className="text-sm mt-1 text-center">{name}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SoilSlider;
