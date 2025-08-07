import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Bill = () => {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = sessionStorage.getItem("totalAmount");
    setTotalAmount(total || 0);
  }, []);

  const handlePlaceOrder = async () => {
  const rid = sessionStorage.getItem("rid");

  try {
    await fetch(`http://localhost:5000/api/cart/clear/${rid}`, {
      method: "DELETE",
    });
    toast.success("Your order has been placed");
    sessionStorage.removeItem("totalAmount");
    navigate("/");
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};

  return (
    <div className="container mx-auto px-4 mb-10">
      <div className="max-w-md mx-auto mt-44 p-6 border rounded shadow-lg text-center bg-white">
        <h3 className="text-2xl font-semibold mb-4">
          <i className="fas fa-receipt mr-2"></i> Bill
        </h3>
        <hr className="mb-4" />
        <h4 className="text-lg mb-6">
          <i className="fas fa-coins mr-2"></i>
          Total Payable: <span className="font-bold">{totalAmount}</span>{" "}
          <i className="fas fa-indian-rupee-sign ml-1"></i>
        </h4>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Confirm and Place Order
        </button>
      </div>
    </div>
  );
};

export default Bill;
