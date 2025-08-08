import { Routes, Route } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminAddProducts from "./AdminAddProducts";
import AdminProducts from "./AdminProducts";
import AdminCartDetails from "./AdminCardDetails"
import AdminUsers from "./AdminUsers";

const AdminPanel = () => {
  return (
     <>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <div className="mt-15 ml-60 flex-1  ">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="addproduct" element={<AdminAddProducts />} />
            <Route path="cart-details" element={<AdminCartDetails />} />
          </Routes>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminPanel;
