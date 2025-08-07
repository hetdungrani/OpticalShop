import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        formData
      );
      alert(res.data.message);
      setFormData({
        username: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
      });
      navigate("/admin-login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./images/regbackgroung.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Registration Form
        </h1>

        {message && (
          <p className="text-center mb-4 font-medium text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <textarea
              name="address"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-bold py-2 rounded"
          >
            Register
          </button>

          <p className="text-center mt-4 text-blue-900">
            Already have an account?{" "}
            <a href="/admin-login" className="underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
