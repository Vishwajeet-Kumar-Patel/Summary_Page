import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FilterPanel from "../components/FilterPanel";
import DefectBarChart from "../components/DefectBarChart";
import DefectDrilldown from "../components/DefectDrilldown";
import healthData from "../data/healthData.json";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function HealthSummary() {
  const [filteredData, setFilteredData] = useState(healthData);
  const [selectedDefect, setSelectedDefect] = useState("eye"); // Default selected

  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  useEffect(() => {
    // Reset to a valid defect if the current one has no data
    if (
      filteredData.length > 0 &&
      !filteredData.some((d) => d.defects?.[selectedDefect])
    ) {
      const fallback = [
        "eye",
        "hearing",
        "fitness",
        "mental",
        "dental",
        "orthopedic",
        "ent",
      ].find((type) => filteredData.some((d) => d.defects?.[type]));
      setSelectedDefect(fallback || "eye");
    }
  }, [filteredData, selectedDefect]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 md:p-6">
      {/* Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4">
        <img
          src="/circlelogo.png"
          alt="StuFit Logo"
          className="w-16 h-16 object-contain drop-shadow-lg"
        />
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
      StuFit Health Screening Summary
    </h1>
  </div>

  {/* Logout Icon at top-right */}
  <button
    onClick={onLogout}
    title="Logout"
    className="absolute top-0 right-0 p-2 bg-red-600 hover:bg-red-700 rounded-full shadow-md transition duration-300"
  >
    <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" />
  </button>
</div>

      {/* Sticky Filter Bar */}
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
