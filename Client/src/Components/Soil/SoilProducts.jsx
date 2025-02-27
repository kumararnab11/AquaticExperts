import React from "react";
import ProductCard from "../ProductCard";

const dummyProducts = [
  {
    id: 1,
    image: "https://via.placeholder.com/270",
    title: "Premium Fish Food",
    price: "12.99",
    description: "High-quality fish food to keep your fish healthy and vibrant."
  },
  {
    id: 2,
    image: "https://via.placeholder.com/270",
    title: "Aquarium Soil",
    price: "8.50",
    description: "Nutrient-rich soil for a lush and beautiful planted tank."
  },
  {
    id: 3,
    image: "https://via.placeholder.com/270",
    title: "Water Filter System",
    price: "29.99",
    description: "Advanced filtration system for crystal-clear aquarium water."
  },
  {
    id: 4,
    image: "https://via.placeholder.com/270",
    title: "LED Aquarium Light",
    price: "18.75",
    description: "Enhance the beauty of your aquarium with vibrant LED lighting."
  },
  {
    id: 5,
    image: "https://via.placeholder.com/270",
    title: "Aquarium CO2 Kit",
    price: "35.00",
    description: "Complete CO2 kit to promote plant growth and tank balance."
  }
];

const SoilProducts = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] underline underline-offset-8 mb-6">
        Aquarium Soil
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SoilProducts;