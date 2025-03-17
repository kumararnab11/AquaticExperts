import { useState } from "react";
import CartCard from "./CartCard";

const Cart = ({cartItems}) => {
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-[#f3f3f3]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Shopping Cart
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Cart Items */}
        <div className="flex-1 bg-white p-6 rounded-md border border-gray-300 shadow-sm">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartCard
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
                onRemove={() => handleRemove(item.id)}
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
            <span className="font-semibold text-gray-900">${totalPrice}</span>
          </h3>

          <button className="w-full mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
            Proceed to Buy
          </button>
        </div>
      </div>

      {/* Sticky Summary for Mobile */}
      <div className="md:hidden sticky bottom-0 bg-white p-4 border-t border-gray-300 shadow-md">
        <div className="flex justify-between items-center text-base font-medium mb-2">
          <span>Subtotal ({cartItems.length} items):</span>
          <span className="text-gray-900 font-semibold">${totalPrice}</span>
        </div>

        <button className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
