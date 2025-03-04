import React from "react";
import { FaBoxOpen, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const orders = [
  {
    id: "ORD12345",
    date: "Feb 25, 2025",
    status: "Delivered",
    total: "$129.99",
  },
  {
    id: "ORD12346",
    date: "Feb 20, 2025",
    status: "Shipped",
    total: "$89.50",
  },
  {
    id: "ORD12347",
    date: "Feb 15, 2025",
    status: "Cancelled",
    total: "$59.99",
  },
];

const Orders = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition"
            >
              <div>
                <p className="font-bold text-gray-800">Order ID: {order.id}</p>
                <p className="text-gray-600 text-sm">Date: {order.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {order.status === "Delivered" && (
                  <span className="flex items-center text-green-600 font-medium">
                    <FaCheckCircle className="mr-1" /> {order.status}
                  </span>
                )}
                {order.status === "Shipped" && (
                  <span className="flex items-center text-blue-600 font-medium">
                    <FaBoxOpen className="mr-1" /> {order.status}
                  </span>
                )}
                {order.status === "Cancelled" && (
                  <span className="flex items-center text-red-600 font-medium">
                    <FaTimesCircle className="mr-1" /> {order.status}
                  </span>
                )}
                <p className="font-semibold text-gray-800">{order.total}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
