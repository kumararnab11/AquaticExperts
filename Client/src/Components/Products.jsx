import React from "react";
import ProductCard from "./ProductCard";
import axios from 'axios';
import { useState,useEffect } from "react";


const Products = () => {
  const API_BASE_URL = "http://localhost:4000/api/v1";
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    //console.log("refreshed")
    axios.get(`${API_BASE_URL}/getallproduct`)
      .then(response => {
        //console.log(response.data.data)
        setProductData(response.data.data)
      })
      .catch(error => console.error("Error fetching product data:", error));
  }, []);


  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#3d0160] to-[#7ca4f4] underline underline-offset-8 mb-6">
        Products
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {productData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;