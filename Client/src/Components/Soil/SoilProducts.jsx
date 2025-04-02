import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { useSelector } from "react-redux";

const SoilProducts = () => {
  const user = useSelector((state)=>state.user);
  const API_BASE_URL = "http://localhost:4000/api/v1";
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    //console.log("refreshed")
    axios.post(`${API_BASE_URL}/getcategoryproduct`,{category:'Aquarium Soil & Substrate'})
      .then(response => {
        //console.log(response.data.data)
        setProductData(response.data.data)
      })
      .catch(error => console.error("Error fetching product data:", error));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#5657ba] to-[#000817] underline underline-offset-4 mb-4">
        Aquarium Soil
      </h2>

      {/* Responsive Grid Layout - Like Flipkart */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 justify-items-center">
        {productData.map((product) => (
          <ProductCard key={product._id} {...product} user={user}/>
        ))}
      </div>
    </div>
  );
};

export default SoilProducts;
