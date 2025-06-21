import React, { useState } from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/products", { name, unit });
      toast.success("Product added successfully!");
      setName("");
      setUnit("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Add product failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-5 mx-auto mt-12 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
          Add Product
        </h2>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <input
          placeholder="Unit (e.g. kg)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-transform hover:scale-105"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
