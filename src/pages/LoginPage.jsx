import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (emailInput, password) => {
    try {
      await login(emailInput, password);
      setEmail(emailInput);
      navigate("/verify-otp", { state: { email: emailInput } });
      setError("");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} />
      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="text-blue-400 hover:underline">
          Forgot Password?
        </Link>
      </div>
      {error && (
        <div className="mt-2 text-red-400 text-sm text-center">{error}</div>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
