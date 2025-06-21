import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful!");
      navigate("/"); // redirect to dashboard
    } catch (err) {
      toast.error(
        "Signup failed: " + err.response?.data?.msg || "Server error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-5 mx-auto mt-12 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
          Sign Up
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-transform hover:scale-105"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
