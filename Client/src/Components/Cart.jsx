import React, { useState } from "react";
import CartCard from "./CartCard";
import axios from "axios";
import { useNavigate } from "react-router";

const API_BASE_URL = "http://localhost:4000/api/v1";

const Cart = ({ cartItems: initialCartItems }) => {
  const navigate=useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  console.log("cartitems",cartItems)

  const handleIncrease = async (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    await updateCartItem(id, 1);
  };

  const handleDecrease = async (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    await updateCartItem(id, -1);
  };

  const handleRemove = async (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    await removeCartItem(id);
  };

  const updateCartItem = async (id, change) => {
    try {
      await axios.post(
        `${API_BASE_URL}/updateitemcart`,
        { _id: id, change },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeCartItem = async (id) => {
    try {
      await axios.post(
        `${API_BASE_URL}/deleteitemcart`,
        { _id: id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const totalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const handleBuy = () => {
    console.log("handlebuy");
    const order = {
      items: [],
    };
  
    cartItems.forEach((item) => {
      const newItem = { ...item };
      order.items.push(newItem);
    });

    navigate('/checkout/address', { state: { order } });
  };
  

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-[#f3f3f3]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shopping Cart</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Cart Items */}
        <div className="flex-1 bg-white p-6 rounded-md border border-gray-300 shadow-sm">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartCard
                key={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                discount={item.discount}
                onIncrease={() => handleIncrease(item._id)}
                onDecrease={() => handleDecrease(item._id)}
                onRemove={() => handleRemove(item._id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Right - Summary Section (Desktop only) */}
        <div className="hidden md:block w-full md:w-1/3 bg-white p-6 rounded-md border border-gray-300 shadow-sm h-fit">
          <h3 className="text-lg font-medium mb-2 text-gray-700">
            Subtotal ({cartItems.length} items):{" "}
            <span className="font-semibold text-gray-900">{totalPrice}</span>
          </h3>
          <button className="w-full mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            onClick={handleBuy}
          >
            Proceed to Buy
          </button>
        </div>
      </div>

      {/* Sticky Summary for Mobile */}
      <div className="md:hidden sticky bottom-0 bg-white p-4 border-t border-gray-300 shadow-md">
        <div className="flex justify-between items-center text-base font-medium mb-2">
          <span>Subtotal ({cartItems.length} items):</span>
          <span className="text-gray-900 font-semibold">{totalPrice}</span>
        </div>
        <button className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          onClick={handleBuy}
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
