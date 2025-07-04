import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';
import HealthSummary from './pages/HealthSummary';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// 🔒 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>

        {/* 🔐 Login Page (Default Entry) */}
        <Route path="/" element={<LoginPage />} />

        {/* 🔑 Forgot Password (Open Route) */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 📊 Protected Dashboard */}
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <HealthSummary />
            </ProtectedRoute>
          }
        />

        {/* 🔁 Fallback to Login for Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
}
