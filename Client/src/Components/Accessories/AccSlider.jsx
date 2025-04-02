import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import AlgaeScrapersImg from "../../assets/AlgaeScrapersImg.jpg";
import AquascapingToolsImg from "../../assets/AquascapingToolsImg.jpg";
import WaterTestingKitImg from "../../assets/WaterTestingKitImg.jpg";
import FishNetsCatchingToolImg from "../../assets/FishNetsCatchingToolImg.jpg";
import WaterChangersSiphonsImg from "../../assets/WaterChangersSiphonsImg.jpg";
import CO2SystemsImg from "../../assets/CO2SystemsImg.jpg";

const toolsCategories = [
  { name: "Algae Scrapers", image: AlgaeScrapersImg, path: "algae-scrapers" },
  { name: "Aquascaping Tools", image: AquascapingToolsImg, path: "aquascaping-tools" },
  { name: "Water Testing Kit", image: WaterTestingKitImg, path: "water-testing-kit" },
  { name: "Fish Nets & Catching Tool", image: FishNetsCatchingToolImg, path: "fish-nets-catching-tool" },
  { name: "Water Changers & Siphons", image: WaterChangersSiphonsImg, path: "water-changers-siphons" },
  { name: "CO₂ Systems", image: CO2SystemsImg, path: "co2-systems" },
];

// Custom Next Arrow Component
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

const AccSlider = () => {
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
        {toolsCategories.map(({ name, image, path }, index) => (
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

export default AccSlider;
