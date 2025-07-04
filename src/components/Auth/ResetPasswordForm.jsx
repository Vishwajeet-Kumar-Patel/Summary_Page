import React, { useState } from "react";

const ResetPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await onSubmit(password);
      setMessage("Password reset successful.");
      setError("");
    } catch (err) {
      setError("Failed to reset password.");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-9 bg-[#1e293b] p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">New Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
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
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
