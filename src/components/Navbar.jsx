import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import CartDrawer from "./CartDrawer";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = useSelector(
    (state) =>
      state.cart.items?.reduce((total, item) => total + item.quantity, 0) || 0
  );

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-orange-500 text-white">
        {/* Left: Logo */}
        <Link to="/" className="font-bold text-xl">
          UrbanCart
        </Link>

        {/* Center: SearchBar (hidden on small screens) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <SearchBar />
        </div>

        {/* Right: Admin + Cart + Menu button */}
        <div className="flex items-center space-x-4">
          {/* 🔹 Admin Dashboard Button */}
          <Link
            to="/login"
            className="bg-white text-orange-500 px-3 py-1 rounded-lg font-semibold hover:bg-orange-100 transition"
          >
            Admin Dashboard
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu (only on mobile) */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-orange-400 text-white px-4 py-3 space-y-3">
          <SearchBar />
          {/* Admin link in mobile menu */}
          <Link
            to="/login"
            className="block bg-white text-orange-500 px-3 py-1 rounded-lg font-semibold hover:bg-orange-100 transition"
          >
            Admin Dashboard
          </Link>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
