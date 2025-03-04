import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import GoldfishImg from "../../assets/GoldfishImg.jpg";
import BettaImg from "../../assets/BettaImg.jpg";
import CichlidsImg from "../../assets/CichlidsImg.jpg";
import TetraImg from "../../assets/TetraImg.png";
import ArowanaImg from "../../assets/ArowanaImg.jpg";
import GuppyImg from "../../assets/GuppyImg.png";
import KoiImg from "../../assets/KoiImg.png";
import ShrimpImg from "../../assets/ShrimpImg.png";
import BottomFeederImg from "../../assets/BottomFeederImg.jpg";

const fishCategories = [
  { name: "Goldfish", image: GoldfishImg, path: "goldfish" },
  { name: "Betta", image: BettaImg, path: "betta" },
  { name: "Cichlids", image: CichlidsImg, path: "cichlids" },
  { name: "Tetra", image: TetraImg, path: "tetra" },
  { name: "Arowana", image: ArowanaImg, path: "arowana" },
  { name: "Guppy", image: GuppyImg, path: "guppy" },
  { name: "Koi", image: KoiImg, path: "koi" },
  { name: "Shrimp", image: ShrimpImg, path: "shrimp" },
  { name: "Bottom Feeder", image: BottomFeederImg, path: "bottom-feeder" },
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
        {fishCategories.map(({ name, image, path }, index) => (
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

export default CategorySection;
