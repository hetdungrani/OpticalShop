import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to fetch products.");
    }
  };

  const handleEdit = (pid) => {
    navigate(`/update-product/${pid}`);
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete this product?
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const res = await fetch(
                    `http://localhost:5000/api/products/delete/${id}`,
                    { method: "DELETE" }
                  );
                  if (res.ok) {
                    await fetchProducts(); 
                    toast.success("Product deleted successfully!");
                  } else {
                    toast.error("Failed to delete product.");
                  }
                } catch (err) {
                  toast.error("Error while deleting.");
                }
              }}
            >
              Delete
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded mb-15 shadow">
      <h2 className="text-3xl font-semibold text-center mb-6">
        All Added Products
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center ">
          <thead>
            <tr className="bg-blue-600 border text-white">
              <th className="py-2 px-4 border">Product ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Size</th>
              <th className="py-2 px-4 border">Price (₹)</th>
              <th className="py-2 px-4 border">GST (%)</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Edit</th>
              <th className="py-2 px-4 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.pid} className="border">
                <td className="py-2 px-4 border">{product.pid}</td>
                <td className="py-2 px-4 border">{product.pname}</td>
                <td className="py-2 px-4 border">{product.size}</td>
                <td className="py-2 px-4 border">{product.price}</td>
                <td className="py-2 px-4 border">{product.gst}</td>
                <td className="py-2 px-4 border">{product.type}</td>
                <td className="py-2 px-4 border">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt="product"
                    className="h-12 mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(product.pid)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(product.pid)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="9" className="py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
