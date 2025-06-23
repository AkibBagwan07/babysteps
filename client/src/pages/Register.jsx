/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pregnancyStartDate: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Register</h2>

        {/* Name Field */}
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email Field */}
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password Field */}
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Pregnancy Start Date Field */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Pregnancy
          <span className="text-xs text-gray-500 block">
            (Usually the first day of your last period)
          </span>
        </label>
        <input
          required
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={form.pregnancyStartDate}
          onChange={(e) =>
            setForm({ ...form, pregnancyStartDate: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-pink-500 text-white w-full py-2 rounded hover:bg-pink-600"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
