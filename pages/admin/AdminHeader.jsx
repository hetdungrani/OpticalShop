import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/LOGO.png";

const AdminHeader = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
     e.preventDefault();
    try {
      navigate("/admin-login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 ">
      <div className="container mx-auto flex items-center justify-between px-3 py-1">
        <a href="/admin" className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="h-[60px] w-[70px]" />
          <span className="text-lg font-semibold text-gray-800">
            Admin Panel - Optical Shope
          </span>
        </a>

        <form method="POST" onSubmit={handleLogout} className="flex items-center">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
          >
            Logout <FaSignOutAlt />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default AdminHeader;
