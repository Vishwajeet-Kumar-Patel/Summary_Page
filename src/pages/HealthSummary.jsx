import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import DefectBarChart from '../components/DefectBarChart';
import DefectDrilldown from '../components/DefectDrilldown';
import healthData from '../data/healthData.json';

export default function HealthSummary() {
  const [filteredData, setFilteredData] = useState(healthData);
  const [selectedDefect, setSelectedDefect] = useState('eye'); // Default selected

  useEffect(() => {
    // Reset to a valid defect if the current one has no data
    if (filteredData.length > 0 && !filteredData.some(d => d.defects?.[selectedDefect])) {
      const fallback = ['eye', 'hearing', 'fitness', 'mental', 'dental', 'orthopedic', 'ent'].find(
        type => filteredData.some(d => d.defects?.[type])
      );
      setSelectedDefect(fallback || 'eye');
    }
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
  <img
    src="/logo.png"
    alt="StuFit Logo"
    className="w-16 h-16 object-contain drop-shadow-lg"
  />
  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
    StuFit Health Screening Summary
  </h1>
</div>


      {/* Sticky Filter Bar */}
      {/* Sticky Filter Bar only on md and above */}
<div className="md:sticky md:top-0 md:z-50 rounded-lg shadow-md p-4 mb-6">
  <FilterPanel data={healthData} setFilteredData={setFilteredData} />
</div>


      {/* Chart Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Bar Chart */}
        <div className="lg:w-1/2 rounded-lg shadow-md h-500px">
          <DefectBarChart data={filteredData} onBarClick={setSelectedDefect} />
        </div>

        {/* Right: Pie Chart */}
        <div className="lg:w-1/2 rounded-lg shadow-md h-[400px]">
          <DefectDrilldown data={filteredData} defectType={selectedDefect} />
        </div>

      </div>
    </div>
  );
}
