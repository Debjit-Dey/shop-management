import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";

export default function BuyStock() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerItem, setPricePerItem] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data));
  }, []);

  useEffect(() => {
    const selectedProduct = products.find((p) => p._id === selectedProductId);
    if (selectedProduct) {
      setUnit(selectedProduct.unit);
    } else {
      setUnit("");
    }
  }, [selectedProductId, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${selectedProductId}/stock`, {
        quantity: Number(quantity),
        pricePerItem: Number(pricePerItem),
        type: "sell",
        date,
      });
      toast.success("Stock sold successfully");
      setSelectedProductId("");
      setQuantity("");
      setPricePerItem("");
      setDate("");
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Error selling stock";
      toast.error(errorMsg); // 👈 This will show the backend's error message like "Insufficient stock to sell"
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-5 mx-auto mt-12 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
          Buy Stock
        </h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          value={unit}
          disabled
          placeholder="Unit"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        />

        <input
          type="number"
          value={pricePerItem}
          onChange={(e) => setPricePerItem(e.target.value)}
          placeholder="Price per item"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-transform hover:scale-105"
        >
          Add to Stock
        </button>
      </form>
    </div>
  );
}
