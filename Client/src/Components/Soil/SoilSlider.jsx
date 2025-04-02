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

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full shadow-md border border-gray-200 hover:bg-white/80 transition-all z-10"
    onClick={onClick}
  >
    <ArrowRight size={18} />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full shadow-md border border-gray-200 hover:bg-white/80 transition-all z-10"
    onClick={onClick}
  >
    <ArrowLeft size={18} />
  </button>
);

const SoilSlider = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
      <Slider {...settings}>
        {soilCategories.map(({ name, image, path }, index) => (
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

export default SoilSlider;
