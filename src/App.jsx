import React from 'react'; // ✅ Required for JSX in some environments

import HealthSummary from './pages/HealthSummary';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-4">
      
      <HealthSummary />
    </div>
  );
}

