import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data));
    axios.get("/transactions").then((res) => setTransactions(res.data));
  }, []);

  // Filtered products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Filtered transactions
  const filteredTxns = transactions.filter((txn) => {
    const matchesText =
      txn.product?.name.toLowerCase().includes(filterText.toLowerCase()) ||
      txn.type.toLowerCase().includes(filterText.toLowerCase());

    const matchesDate = filterDate
      ? new Date(txn.date).toDateString() ===
        new Date(filterDate).toDateString()
      : true;

    return matchesText && matchesDate;
  });

  // Calculate totals
  const totalSpent = filteredTxns
    .filter((txn) => txn.type === "buy")
    .reduce((acc, curr) => acc + curr.pricePerItem * curr.quantity, 0);

  const totalEarned = filteredTxns
    .filter((txn) => txn.type === "sell")
    .reduce((acc, curr) => acc + curr.pricePerItem * curr.quantity, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Totals */}
      <div className="space-y-1">
        <p className="text-green-700 font-medium">
          💸 Total Spent on Buy: ₹{totalSpent}
        </p>
        <p className="text-red-700 font-medium">
          💰 Total Earned from Sell: ₹{totalEarned}
        </p>
      </div>

      {/* Search & Date Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by product or type"
          className="px-3 py-2 border rounded w-full md:max-w-md"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <input
          type="date"
          className="px-3 py-2 border rounded w-full md:max-w-xs"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Product Summary */}
      <h2 className="text-2xl font-bold">📦 Product Summary</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th>Name</th>
            <th>Stock</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr
              key={p._id}
              className={`text-center ${
                p.stock < 5 ? "bg-red-400 font-bold" : ""
              }`}
            >
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transaction History */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">🧾 Transaction History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th>Date</th>
                <th>Product</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price/Item</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map((t) => (
                <tr key={t._id} className="text-center ">
                  <td>{new Date(t.date).toLocaleDateString("en-GB")}</td>
                  <td>{t.product?.name}</td>
                  <td
                    className={
                      t.type === "buy" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {t.type}
                  </td>
                  <td>{t.quantity}</td>
                  <td>{t.product?.unit}</td>
                  <td>₹{t.pricePerItem}</td>
                  <td>₹{t.pricePerItem * t.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
