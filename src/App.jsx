import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";

// 🔹 Abhi banani hongi ye pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Routes>
        {/* Customer side */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Admin side */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
