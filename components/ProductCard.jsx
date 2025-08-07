import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const targetDir = "http://localhost:5000/uploads/";
  const totalPrice = product.price + product.gst;
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    const rid = sessionStorage.getItem("rid"); 
    if (!rid) {
      toast.error("Please login to continue.")
      navigate("/login")
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        rid: rid,
        pid: product.pid, 
        pname: product.pname,
        size: product.size,
        price: product.price,
        gst: product.gst,
        type: product.type,
        image: product.image, 
      });
      navigate("/cart");
    } catch (error) {
      console.error("❌ Failed to add to cart:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "Failed to add to cart. Please try again."
      );
    }
  };

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
        <img
          src={`${targetDir}${product.image}`}
          alt={product.pname}
          className="h-[220px] object-cover border-b border-gray-200"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h5 className="text-lg font-semibold text-gray-800">
            {product.pname}
          </h5>
          <p className="text-sm">Size: {product.size}</p>
          <p className="text-green-600 text-lg font-bold">Rs. {totalPrice}</p>
          <p className="text-xs text-gray-500">(Incl. GST)</p>
          <p className="text-gray-500 text-sm">{product.type}</p>
          <div className="mt-auto pt-4">
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white py-2 w-full rounded-full inline-block text-center font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
