import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600 dark:text-blue-400">
            <Link to="/">Shop Manager</Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/add-product"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600"
            >
              Add Product
            </Link>
            <Link
              to="/buy"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600"
            >
              Buy Stock
            </Link>
            <Link
              to="/sell"
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600"
            >
              Sell Stock
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-800 dark:text-white">
            Dashboard
          </Link>
          <Link
            to="/add-product"
            className="block text-gray-800 dark:text-white"
          >
            Add Product
          </Link>
          <Link to="/buy" className="block text-gray-800 dark:text-white">
            Buy Stock
          </Link>
          <Link to="/sell" className="block text-gray-800 dark:text-white">
            Sell Stock
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
