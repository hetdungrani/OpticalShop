import React from "react";
import { FaTachometerAlt, FaPlusCircle, FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-60  border-r border-gray-200 p-4 ">
      <h5 className="text-center text-lg font-semibold text-black border-b pb-3 mb-6">
        Admin Menu
      </h5>
      <nav className="flex flex-col space-y-2">
        <Link
          to="/admin/dashboard"
          className="flex items-center text-black px-4 py-2 hover:bg-gray-100 rounded transition"
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>

        <Link
          to="/admin/addproduct"
          className="flex items-center text-black px-4 py-2 hover:bg-gray-100 rounded transition"
        >
          <FaPlusCircle className="mr-3" />
          Add Product
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center text-black px-4 py-2 hover:bg-gray-100 rounded transition"
        >
          <FaBoxOpen className="mr-3" />
          View Added Product
        </Link>

        <Link
          to="/admin/cart-details"
          className="flex items-center text-black px-4 py-2 hover:bg-gray-100 rounded transition"
        >
          <FaShoppingCart className="mr-3" />
          Cart Details
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center text-black px-4 py-2 hover:bg-gray-100 rounded transition"
        >
          <FaUsers className="mr-3" />
          User Registered
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
