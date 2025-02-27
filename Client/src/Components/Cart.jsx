import { useState } from "react";
import CartCard from "./CartCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/80",
      title: "Lorem Ipsum",
      price: 8.50,
      quantity: 1,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/80",
      title: "Dolor Sit",
      price: 12.99,
      quantity: 2,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/80",
      title: "Amet Consectetur",
      price: 5.75,
      quantity: 1,
    },
  ]);

  // Increase Quantity
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold text-center text-teal-700 bg-clip-text underline underline-offset-8 mb-6">
        Shopping Cart
      </h2>
      
      {/* Cart Items */}
      <div className="space-y-4">
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
          <p className="text-center text-gray-400">Your cart is empty.</p>
        )}
      </div>

      {/* Total Price & Buy Now Button */}
      {cartItems.length > 0 && (
        <div className="mt-6 border-t border-gray-600 pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-teal-700">Total:</span>
            <span className="text-teal-700">${totalPrice}</span>
          </div>
          <button className="w-full mt-4 px-6 py-3 bg-black text-teal-500 font-bold rounded-lg transition duration-200">
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
