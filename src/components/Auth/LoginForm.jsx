import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 bg-[#1e293b] p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
