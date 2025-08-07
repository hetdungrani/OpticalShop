import React, { useEffect, useState } from "react";

const AdminCartDetails = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cart/all")
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Failed to fetch cart items:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Add to Cart Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white text-center">
              <th className="py-3 px-5 border border-blue-700">Register ID</th>
              <th className="py-3 px-5 border border-blue-700">Product ID</th>
              <th className="py-3 px-5 border border-blue-700">Product Name</th>
              <th className="py-3 px-5 border border-blue-700">Size</th>
              <th className="py-3 px-5 border border-blue-700">Price (₹)</th>
              <th className="py-3 px-5 border border-blue-700">GST (%)</th>
              <th className="py-3 px-5 border border-blue-700">Type</th>
              <th className="py-3 px-5 border border-blue-700">
                Product Image
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-5 text-gray-500">
                  No cart items found.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr
                  key={item._id || item.pid}
                  className="text-center even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="py-3 px-4 border border-gray-300">
                    {item.rid}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {item.pid}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {item.pname}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {item.size}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {item.gst}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {item.type}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.pname}
                      className="mx-auto h-24 rounded-md"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCartDetails;
