import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-green-600 after:mx-auto after:mt-2 after:rounded">
          Eyeglasses & Sunglasses Collection
        </h2>
        <div className="grid grid-cols-12 gap-6">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p className="text-center col-span-12">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
