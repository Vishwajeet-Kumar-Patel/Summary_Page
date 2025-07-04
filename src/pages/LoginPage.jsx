import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const MOCK_EMAIL = 'admin@stufit.com';
  const MOCK_PASSWORD = '121326';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem('token', 'mock-token');
      navigate('/summary');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] px-4 md:px-8">
      <div className="max-w-5xl w-full h-[620px] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Section: Logo + Image */}
        <div className="md:w-1/2 bg-[#160d34] relative">
          {/* Full Image */}
          <img
            src="/illustration.png"
            alt="Healthcare Illustration"
            className="w-full h-full object-cover"
          />

          {/* Top-left Logo */}
          <div className="absolute top-6 left-6 z-10">
            <img
              src="/logo.png"
              alt="StuFit Logo"
              className="w-24 h-auto"
            />
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to <span className="text-[#2b0747]">StuFit</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <EnvelopeIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <LockClosedIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-sm text-center">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm text-center">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#2b0747] hover:bg-[#43137a] text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-500">
            Don’t have an account?{' '}
            <span className="text-indigo-600 underline cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
