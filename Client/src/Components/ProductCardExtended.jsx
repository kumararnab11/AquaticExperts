import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  {useParams}  from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";

const ProductCardExtended = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const API_BASE_URL = "http://localhost:4000/api/v1";
  const { pid } = useParams();
  const [productData, setProductData] = useState({
    images:[],
    name:"",
    desc:"",
    keypoints:[],
    benefits:[],
    howToUse:[]
  });

  useEffect(() => {
    //console.log("called");
    axios.get(`${API_BASE_URL}/getproduct/${pid}`)
      .then(response => {
        //console.log(response.data.data)
        setProductData(response.data.data)
      })
      .catch(error => console.error("Error fetching product data:", error));
  }, [pid]);

  return (
    <div className="bg-[#dbcfc9] min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row p-6 lg:p-8 max-h-screen lg:max-h-[90vh]">
        
        <div className="lg:w-1/2 w-full lg:sticky top-10">
          <div className="sticky top-0 bg-white z-10">
            <Slider {...settings}>
              {productData.images.map((img, index) => (
                <div key={index} className="flex justify-center">
                  <img src={img} alt={`Product ${index}`} className="w-full max-w-xs h-80 object-cover rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>
          
          <div className="hidden lg:flex gap-4 mt-6">
            <button className="flex-1 bg-[#FFD814] text-black font-bold py-3 rounded-lg shadow-md hover:bg-[#F7CA00]">
              Add to Cart
            </button>
            <button className="flex-1 bg-[#FF9900] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#E68900]">
              Buy Now
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full mt-6 lg:mt-0 lg:pl-8 overflow-y-auto max-h-full lg:max-h-[80vh] flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{productData.name}</h1>
          <p className="text-lg text-gray-700 mt-2">{productData.desc}</p>
          <p className="text-xl font-semibold text-[#2DAA9E] mt-4">₹{productData.price}</p>

          <h2 className="text-lg font-bold mt-6 text-gray-800">Product Details</h2>
          <ul className="list-disc pl-6 text-gray-600">
            {productData.keypoints.map((detail, index) => (
              <li key={index} className="mt-2">{detail}</li>
            ))}
          </ul>
          {
            productData.benefits.length > 0 && (
              <>
                <h2 className="text-lg font-bold mt-6 text-gray-800">benefits</h2>
                <ul className="list-disc pl-6 text-gray-600">
                  {productData.benefits.map((detail, index) => (
                    <li key={index} className="mt-2">{detail}</li>
                  ))}
                </ul>
              </>
            )
          }
          {
            productData.howToUse.length > 0 && (
              <>
                <h2 className="text-lg font-bold mt-6 text-gray-800">How To Use</h2>
                <ul className="list-disc pl-6 text-gray-600">
                  {productData.howToUse.map((detail, index) => (
                    <li key={index} className="mt-2">{detail}</li>
                  ))}
                </ul>
              </>
            )
          }

        </div>

        <div className="lg:hidden w-full bg-white shadow-lg">
          <div className="sticky bottom-0 left-0 flex gap-4 p-4">
            <button className="flex-1 bg-[#FFD814] text-black font-bold py-3 rounded-lg shadow-md hover:bg-[#F7CA00]">
              Add to Cart
            </button>
            <button className="flex-1 bg-[#FF9900] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#E68900]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCardExtended;
