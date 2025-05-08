import React from "react";
import axios from "axios";
import { useLocation } from "react-router";

const PaymentComponent = () => {
    const location = useLocation();
    const { order } = location.state;
    let amount = 0;
    order.items.map((item)=>{
        amount+=(item.price*item.quantity);
    })
  const initiatePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: amount,
        currency: "INR",
      });

      const { order } = data;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Enter your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          name: "Arnab Kumar",
          email: "kumararnab0342@gmail.com",
          contact: "9547428943",
        },
        theme: {
          color: "#008080",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  return (
    <button
      onClick={initiatePayment}
      className="px-4 py-2 bg-teal-500 text-white rounded-lg"
    >
      Pay Now
    </button>
  );
};

export default PaymentComponent;
