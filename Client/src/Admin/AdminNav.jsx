import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className="bg-teal-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <ul className="flex gap-6">
          <li>
            <Link to="/qtteuuiwoeyguq3y784wjhfsl9-jhkh/admin" className="hover:text-yellow-300 transition">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/qtteuuiwoeyguq3y784wjhfsl9-jhkh/admin/updateproduct" className="hover:text-yellow-300 transition">
              Update Product
            </Link>
          </li>
          <li>
            <Link to="/new-orders" className="hover:text-yellow-300 transition">
              New Orders
            </Link>
          </li>
          <li>
            <Link to="/shipped-orders" className="hover:text-yellow-300 transition">
              Shipped Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
