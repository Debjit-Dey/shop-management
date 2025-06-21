import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import BuyStock from "./pages/BuyStock";
import SellStock from "./pages/SellItems";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// const isAuthenticated = !!localStorage.getItem("token");

export default function App() {
  // const isLoggedIn = !!localStorage.getItem("token");
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Protected pages go here */}
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="buy" element={<BuyStock />} />
          <Route path="sell" element={<SellStock />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
