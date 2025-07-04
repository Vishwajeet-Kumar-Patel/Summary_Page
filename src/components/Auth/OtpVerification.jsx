import React, { useState } from "react";

const OtpVerificationForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(otp);
    } catch (err) {
      //parent component will handle error display
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 bg-[#1e293b] p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-3 text-center">Verify OTP</h2>
      <h6 className="text-center mb-9">(Otp has been sent to your email)</h6>
      <div className="mb-10">
        <label className="block mb-1 text-sm font-medium">OTP</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-60 px-2 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default OtpVerificationForm;
