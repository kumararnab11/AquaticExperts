import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Products = () => {
  const API_BASE_URL = "http://localhost:4000/api/v1";
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getallproduct`)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] underline underline-offset-4 mb-4">
        Products
      </h2>

      {/* Responsive Grid Layout - Like Flipkart */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 justify-items-center">
        {productData.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
