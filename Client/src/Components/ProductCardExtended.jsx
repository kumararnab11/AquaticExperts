import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  {useParams}  from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";

const ProductCardExtended = () => {
  const navigate=useNavigate();
  const user = useSelector((state)=>state.user);
  const dispatch=useDispatch();
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
    price:"",
    discount:"",
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

  const q = user ? user.cart.find((q) => q._id === pid) : null;
  const [quantity, setQuantity] = useState(q ? (q.quantity?q.quantity:0 ): 0);

  const createDb = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/additemcart`,
        {
          user: user._id,
          item:{ _id:pid, quantity:q,image:productData.images?.[0],name:productData.name,price:productData.price,discount:productData.discount}
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);
      dispatch(update(response.data.updatedUser))
      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  const deleteDb = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteitemcart`,
        {
          user: user._id,
          item:{ _id:pid, quantity:0}
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);
      dispatch(update(response.data.updatedUser))
      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  const updateDb = async (q) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/updateitemcart`,
        {
          user: user._id,
          item:{ _id:pid, quantity:q,image:productData.images?.[0],name:productData.name,price:productData.price,discount:productData.discount}
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);
      dispatch(update(response.data.updatedUser))
      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  const handleCart = (q,ind) =>{
    if(ind==1){
      createDb();
    }
    else if(ind==2){
      if(q==0){
        deleteDb();
      }
      else{
        updateDb(q);
      }
    }
  }

  const handleBuy = ()=>{
    const order={
      pid:pid,
      count:1,
      price:productData.price
    }
    navigate('/checkout/address', { state: { order } });
  }


  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row p-6 lg:p-8 max-h-screen lg:max-h-[90vh]">
        
        <div className="lg:w-1/2 w-full lg:sticky top-10">
          <div className="sticky top-0 bg-white z-10">
          <Slider {...settings}>
            {productData.images.length > 1
              ? productData.images.map((img, index) => (
                  <div key={index} className="flex justify-center">
                    <img src={img} alt={`Product ${index}`} className="w-full max-w-xs h-80 object-cover rounded-lg" />
                  </div>
                ))
              : [...Array(3)].map((_, index) => (
                  <div key={index} className="flex justify-center">
                    <img src={productData.images[0]} alt={`Product`} className="w-full max-w-xs h-80 object-cover rounded-lg" />
                  </div>
                ))}
          </Slider>

          </div>
          
          <div className="hidden lg:flex gap-4 mt-6">
            {/* Cart Buttons */}
              {quantity === 0 ? (
                <button
                  className="bg-[#FFD814] text-black px-3 py-[4px] rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-[#F7CA00] transition-shadow shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(1);
                    handleCart(1, 1);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-2 w-1/2">
                  <button
                    className="bg-gray-300 px-3 py-[4px] rounded-md text-xs sm:text-sm md:text-base font-bold hover:bg-gray-400 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newQuantity = quantity - 1;
                      setQuantity(newQuantity);
                      handleCart(newQuantity, 2);
                    }}
                  >
                    −
                  </button>
                  <span className="text-sm sm:text-base md:text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    className="bg-gray-300 px-3 py-[4px] rounded-md text-xs sm:text-sm md:text-base font-bold hover:bg-gray-400 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newQuantity = quantity + 1;
                      setQuantity(newQuantity);
                      handleCart(newQuantity, 2);
                    }}
                  >
                    +
                  </button>
                </div>
              )}

            <button className="flex-1 bg-[#FF9900] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#E68900] max-w-48"
              onClick={(e)=>{
                e.stopPropagation();
                handleBuy();
              }}
            >
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
            {quantity === 0 ? (
              <button
                className="flex-1 bg-[#FFD814] text-black font-bold py-3 rounded-lg shadow-md hover:bg-[#F7CA00]"
                onClick={
                  (e) => {
                    e.stopPropagation();
                    setQuantity(1);
                    handleCart(1,1);
                  }
                }
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="bg-[#FFD814] text-black font-bold py-2 px-4 rounded-l-lg shadow-md hover:bg-[#F7CA00]"
                  onClick={(e)=>{
                    e.stopPropagation();
                    const newQuantity=quantity-1;
                    setQuantity(newQuantity);
                    handleCart(newQuantity,2);
                  }}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="bg-[#FFD814] text-black font-bold py-2 px-4 rounded-r-lg shadow-md hover:bg-[#F7CA00]"
                  onClick={(e)=>{
                    e.stopPropagation();
                    const newQuantity=quantity + 1
                    setQuantity(newQuantity);
                    handleCart(newQuantity,2);
                  }}
                >
                  +
                </button>
              </div>
            )}
            <button className="flex-1 bg-[#FF9900] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#E68900]"
              onClick={(e)=>{
                e.stopPropagation();
                handleBuy();
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        </div>
    </div>
  );
};
export default ProductCardExtended;
