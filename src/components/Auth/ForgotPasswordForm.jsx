import React, { useState } from "react";

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(email);
      setMessage("OTP sent to your email for password reset.");
      setError("");
    } catch (err) {
      setError("Failed to send OTP.");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 bg-[#1e293b] p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-9 text-center">Forgot Password</h2>
      <div className="mb-10">
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {message && <div className="mb-4 text-green-400 text-sm">{message}</div>}
      {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-60 px-2 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
        >
          Send OTP
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
