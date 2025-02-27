import React, { useRef } from "react";
import Slider from "react-slick";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    image: "https://via.placeholder.com/1200x600",
    heading: "50% Discount",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/1200x600",
    heading: "New Arrivals",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/1200x600",
    heading: "Limited Time Offer",
  },
];

const SliderCard = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6">
      <Slider ref={sliderRef} {...settings}>
        {slides.map(({ id, image, heading }) => (
          <div key={id} className="relative w-full h-64 md:h-80">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold">{heading}</h2>
              <button className="mt-4 px-6 py-3 bg-teal-500 text-lg font-semibold rounded-lg shadow-md hover:bg-teal-600 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Manual Previous Button */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-3 rounded-full shadow-md hover:bg-teal-600 transition md:block hidden"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Manual Next Button */}
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-3 rounded-full shadow-md hover:bg-teal-600 transition md:block hidden"
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default SliderCard;
