import { useState,useRef  } from "react";
import toast from "react-hot-toast";

const AdminAddProducts = () => {
  const [formData, setFormData] = useState({
    txtpname: "",
    sltsize: "",
    txtprice: "",
    txtgst: "",
    sltfrle: "",
    filepimage: null,
  });

 const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "filepimage") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("txtpname", formData.txtpname);
    data.append("sltsize", formData.sltsize);
    data.append("txtprice", formData.txtprice);
    data.append("txtgst", formData.txtgst);
    data.append("sltfrle", formData.sltfrle);
    data.append("filepimage", formData.filepimage);

    try {
      const response = await fetch(
        "http://localhost:5000/api/products/insert",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Product Saved!")

        setFormData({
          txtpname: "",
          sltsize: "",
          txtprice: "",
          txtgst: "",
          sltfrle: "",
        });

          if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
       
      } else {
        toast.error("Save failed!")
      }
    } catch (err) {
      console.error("🚫 Fetch error:", err);
    }
  };

  return (
    <>
      <div className="container mx-auto my-10 px-4  max-w-3xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-600 text-white text-center text-xl font-bold py-4">
            Insert Product Record
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="txtpname" className="block font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="txtpname"
                  id="txtpname"
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Enter Product Name"
                  value={formData.txtpname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="sltsize" className="block font-medium mb-1">
                  Size
                </label>
                <select
                  name="sltsize"
                  id="sltsize"
                  className="w-full border rounded-md px-4 py-2"
                  value={formData.sltsize}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Select Size
                  </option>
                  <option value="Narrow">Narrow</option>
                  <option value="Medium">Medium</option>
                  <option value="Wide">Wide</option>
                  <option value="Extra Wide">Extra Wide</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="txtprice" className="block font-medium mb-1">
                  Product Price
                </label>
                <input
                  type="text"
                  name="txtprice"
                  id="txtprice"
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Enter Price"
                  value={formData.txtprice}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="txtgst" className="block font-medium mb-1">
                  GST
                </label>
                <input
                  type="text"
                  name="txtgst"
                  id="txtgst"
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Enter GST Amount"
                  value={formData.txtgst}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="sltfrle" className="block font-medium mb-1">
                Select Frame or Lenses
              </label>
              <select
                name="sltfrle"
                id="sltfrle"
                className="w-full border rounded-md px-4 py-2"
                value={formData.sltfrle}
                onChange={handleChange}
              >
                <option value="" hidden disabled>
                  Select Frames or Lenses
                </option>
                <option value="Frame">Frames</option>
                <option value="Lenses">Lenses</option>
                <option value="Frame + Lenses">Frames + Lenses</option>
              </select>
            </div>

            <div>
              <label htmlFor="filepimage" className="block  font-medium mb-1">
                Product Image
              </label>
              <input
                type="file"
                name="filepimage"
                id="filepimage"
                className="w-full border  rounded-md px-4 py-2"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddProducts;
