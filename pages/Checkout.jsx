import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Checkout() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		pno: '',
		pincode: '',
		address: ''
	});
	const [cartItems, setCartItems] = useState([]);
	const [quantities, setQuantities] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
  async function fetchCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length > 0) {
        setCartItems(cart);
        setQuantities(cart.map(() => 1));
      } else {
        const rid = sessionStorage.getItem("rid");
        if (rid) {
          const res = await axios.get("http://localhost:5000/api/cart", {
            params: { rid }
          });
          setCartItems(res.data);
          setQuantities(res.data.map(() => 1));
        }
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  }

  fetchCart();
}, []);


	useEffect(() => {
		let total = 0;
		cartItems.forEach((item, i) => {
			const priceWithGst = parseFloat(item.price) + parseFloat(item.gst || 0);
			total += priceWithGst * quantities[i];
		});
		setTotalAmount(total);
	}, [cartItems, quantities]);

	const handleQtyChange = (index, value) => {
		const updatedQty = [...quantities];
		updatedQty[index] = parseInt(value) || 1;
		setQuantities(updatedQty);
	};

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			...formData,
			cartItems,
			quantities,
			totalAmount
		};

		try {
			await axios.post('http://localhost:5000/api/bill', payload);
			localStorage.removeItem('cart');
			sessionStorage.setItem('totalAmount', totalAmount);
			navigate("/bill")
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input className="border p-2 rounded" type="text" name="name" placeholder="Name" onChange={handleInput} required />
					<input className="border p-2 rounded" type="email" name="email" placeholder="Email" onChange={handleInput} required />
					<input className="border p-2 rounded" type="text" name="pno" placeholder="Phone Number" onChange={handleInput} required />
					<input className="border p-2 rounded" type="text" name="pincode" placeholder="Pincode" onChange={handleInput} required />
					<textarea className="border p-2 rounded col-span-1 md:col-span-2" name="address" placeholder="Address" rows={3} onChange={handleInput} required />
				</div>

				<h3 className="text-xl font-medium mt-6 mb-4">Your Cart</h3>
				{cartItems.length === 0 ? (
					<p className="text-gray-500">Your cart is empty</p>
				) : (
					cartItems.map((item, index) => (
						<div key={index} className="flex items-center justify-between border-b py-3">
							<div className="flex items-center gap-4">
								<img src={`http://localhost:5000/uploads/${item.image}`} alt={item.pname} className="h-12 w-12 object-cover" />
								<div>
									<p>{item.pname}</p>
									<p className="text-sm text-gray-500">₹{parseFloat(item.price) + parseFloat(item.gst || 0)}</p>
								</div>
							</div>
							<input
								type="number"
								value={quantities[index]}
								min="1"
								onChange={(e) => handleQtyChange(index, e.target.value)}
								className="w-16 border p-1 rounded"
							/>
						</div>
					))
				)}

				<div className="text-right mt-4">
					<p className="text-lg font-semibold">Total: ₹{totalAmount.toFixed(2)}</p>
					<button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
						Proceed to Pay
					</button>
				</div>
			</form>
		</div>
	);
}

export default Checkout;