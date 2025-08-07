import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); 
  const navigate = useNavigate();
  const rid = sessionStorage.getItem("rid");

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart`, {
          params: { rid },
        });
        setCartItems(response.data); 
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }

    if (rid) {
      fetchCart();
    }
  }, [rid]);

 
  const handleRemove = async (pid) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove`, {
        params: { rid, pid },
      });
      setCartItems((prev) => prev.filter((item) => item.pid !== pid));
    } catch (err) {
      console.error("❌ Remove failed:", err);
      toast.error("Failed to remove from cart");
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price + item.gst, 0);
  };

  const handleProceedToPay = () => {
    if (!rid) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🛒 Your Cart
        </h2>
        <p className="ml-10 text-xl">Your cart is empty.</p>
      </>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart
      </h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.pid} 
            className="flex items-center bg-white rounded-xl shadow-md p-4"
          >
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.pname}
              className="w-36 h-36 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.pname}</h3>
              <p className="text-sm">Size: {item.size}</p>
              <p className="text-green-600 font-bold text-lg mt-1">
                ₹{item.price + item.gst}
              </p>
              <p className="text-sm text-gray-500">(Incl. GST)</p>
              <button
                onClick={() => handleRemove(item.pid)}
                className="text-red-600 text-sm mt-2 hover:underline"
              >
                🗑 Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 flex items-center gap-2">
        💳 Bill Details
      </h2>
      <div className="bg-white shadow-md rounded-xl p-6 mt-4 w-full sm:w-96">
        <h4 className="text-lg font-semibold mb-2">Total Payable</h4>
        <h2 className="text-2xl font-bold mb-4">₹{getTotal().toFixed(2)}</h2>
        <button
          onClick={handleProceedToPay}
          className="bg-green-700 hover:bg-green-800 text-white py-2 w-full rounded-full font-semibold"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
