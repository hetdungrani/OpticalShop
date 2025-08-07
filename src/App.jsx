import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../pages/Home";
import EyeTest from "../pages/EyeTest";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminPanel from "../pages/admin/AdminPanel";
import Checkout from "../pages/Checkout";
import Bill from "../pages/Bill";
import UpdateProducts from "../pages/admin/Updateproducts";
import UpdateProduct from "../pages/admin/Updateproducts";

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg mt-4">
        The page you are looking for doesn't exist.
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();

  const headerFooterRoutes = [
    "/",
    "/aboutus",
    "/contactus",
    "/eyetest",
    "/cart",
    "/checkout",
    "/bill",
  ];

  const showHeaderFooter = headerFooterRoutes.includes(location.pathname);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {showHeaderFooter && <Header />}
      <main className={`${showHeaderFooter ? "mt-20" : ""}`}>
        <Routes>
          {/* Routes with Header/Footer */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/eyetest" element={<EyeTest />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bill" element={<Bill />} />

          {/* Routes without Header/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/updateproducts" element={<UpdateProducts />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
