import React from "react";
import circlelogo from "../../assets/circlelogo.png";

const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900">
    <div className="w-full p-3">
      <div className="flex flex-col items-center">
        <img src={circlelogo} alt="Logo" className="w-20" />
      </div>
      {children}
    </div>
  </div>
);

export default AuthLayout;
