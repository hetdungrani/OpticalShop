import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pname: "",
    size: "",
    price: "",
    gst: "",
    type: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        const product = data.product || data;

        setFormData({
          pname: product.pname || "",
          size: product.size || "",
          price: product.price || "",
          gst: product.gst || "",
          type: product.type || "",
          image: null,
        });
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("pname", formData.pname);
    data.append("size", formData.size);
    data.append("price", formData.price);
    data.append("gst", formData.gst);
    data.append("type", formData.type);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/update/${id}`,
        {
          method: "POST",
          body: data,
        }
      );

      if (res.ok) {
        toast.success("Product updated successfully.");
        navigate("/admin/products");
      } else {
        alert("Failed to update.");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="pname"
            value={formData.pname}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="" disabled>
              Select Size
            </option>
            <option value="Narrow">Narrow</option>
            <option value="Medium">Medium</option>
            <option value="Wide">Wide</option>
            <option value="Extra Wide">Extra Wide</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Price (₹)</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">GST (%)</label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Frame">Frames</option>
            <option value="Lenses">Lenses</option>
            <option value="Frame + Lenses">Frames + Lenses</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
