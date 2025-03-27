import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const BestSellersSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 , arrows:false },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 3, arrows:false },
      },
    ],
  };

  const products = [
    { image: "https://via.placeholder.com/300", title: "Stylish Sneakers", price: "49.99", description: "Comfortable and stylish sneakers for all-day wear." },
    { image: "https://via.placeholder.com/300", title: "Wireless Headphones", price: "99.99", description: "High-quality sound with noise cancellation." },
    { image: "https://via.placeholder.com/300", title: "Smart Watch", price: "149.99", description: "Track your fitness and stay connected." },
    { image: "https://via.placeholder.com/300", title: "Gaming Mouse", price: "29.99", description: "Ergonomic design with customizable buttons." },
    { image: "https://via.placeholder.com/300", title: "Mechanical Keyboard", price: "79.99", description: "RGB backlight and responsive switches." },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] underline underline-offset-8 mb-6">
        Best Sellers
      </h2>


      {/* Slider */}
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="px-2">
            <ProductCard {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellersSlider;
