import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import DefectBarChart from '../components/DefectBarChart';
import DefectDrilldown from '../components/DefectDrilldown';
import healthData from '../data/healthData.json';

export default function HealthSummary() {
  // State to hold the filtered dataset
  const [filteredData, setFilteredData] = useState(healthData);

  // State to track which defect type is selected for drilldown (default: "eye")
  const [selectedDefect, setSelectedDefect] = useState('eye');

  // Ensure the selected defect is valid for the current filtered data
  useEffect(() => {
    const validDefectExists = filteredData.some(d => d.defects?.[selectedDefect]);

    if (!validDefectExists && filteredData.length > 0) {
      const fallback = ['eye', 'hearing', 'fitness', 'mental', 'dental', 'orthopedic', 'ent'].find(
        type => filteredData.some(d => d.defects?.[type])
      );
      setSelectedDefect(fallback || 'eye'); // fallback if none found
    }
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 md:p-6">
      
      {/* ---- Header Section ---- */}
      <div className="flex items-center gap-3 mb-2 sm:mb-3">
        <img
          src="/logo.png"
          alt="StuFit Logo"
          className="w-10 h-8 sm:w-12 sm:h-10 md:w-14 md:h-12 object-contain drop-shadow"
        />
        <h1 className="text-lg sm:text-lg md:text-3xl font-bold tracking-tight leading-tight">
          StuFit Health Screening Summary
        </h1>
      </div>

      {/* ---- Filter Panel Section ---- */}
      {/* Sticky only for medium screens and above */}
      <div className="md:sticky md:top-0 md:z-50 rounded-lg shadow-md p-0 mb-6">
        <FilterPanel data={healthData} setFilteredData={setFilteredData} />
      </div>

      {/* ---- Charts Section ---- */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Bar Chart - Displays student count per health defect */}
        <div className="lg:w-1/2 rounded-lg shadow-md">
          <DefectBarChart data={filteredData} onBarClick={setSelectedDefect} />
        </div>

        {/* Right: Drilldown Pie Chart - Shows defect subtypes */}
        <div className="lg:w-1/2 rounded-lg shadow-md">
          <DefectDrilldown data={filteredData} defectType={selectedDefect} />
        </div>

      </div>
    </div>
  );
}
