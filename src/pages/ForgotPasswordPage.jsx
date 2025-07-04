import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setMessage('Please enter your email address.');
    } else {
      // Mock reset logic
      setMessage(`A password reset link has been sent to ${email}.`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] px-4 md:px-8">
      <div className="max-w-5xl w-full h-[620px] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Section: Logo + Image */}
        <div className="md:w-1/2 bg-[#160d34] relative">
          <img
            src="/illustration.png"
            alt="Healthcare Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 z-10">
            <img src="/logo.png" alt="StuFit Logo" className="w-24 h-auto" />
          </div>
        </div>

        {/* Right Section: Forgot Password Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Forgot <span className="text-[#2b0747]">Password</span>
          </h2>

          <form onSubmit={handleReset} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <EnvelopeIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message */}
            {message && (
              <p className="text-sm text-center text-green-600">
                {message}
              </p>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full bg-[#2b0747] hover:bg-[#43137a] text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-6 text-sm text-center text-gray-500">
            Remember your password?{' '}
            <span
              className="text-indigo-600 underline cursor-pointer"
              onClick={() => navigate('/')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
