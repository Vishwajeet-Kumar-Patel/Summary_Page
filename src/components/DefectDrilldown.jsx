import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const defectLabels = {
  eye: 'Eye',
  hearing: 'Hearing',
  fitness: 'Fitness',
  mental: 'Mental Health',
  dental: 'Dental',
  orthopedic: 'Orthopedic',
  ent: 'ENT',
};

export default function DefectDrilldown({ data, defectType }) {
  const subtypeCounts = useMemo(() => {
    const counts = {};
    data.forEach((student) => {
      const defect = student.defects?.[defectType];
      if (defect) {
        counts[defect] = (counts[defect] || 0) + 1;
      }
    });
    return counts;
  }, [data, defectType]);

  const total = Object.values(subtypeCounts).reduce((a, b) => a + b, 0);

  const chartData = {
    labels: Object.keys(subtypeCounts),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(subtypeCounts),
        backgroundColor: [
          '#60a5fa', '#fbbf24', '#34d399',
          '#f87171', '#a78bfa', '#fb923c',
          '#10b981', '#f472b6', '#c084fc',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] p-4 md:p-6 rounded-xl shadow-lg border border-[#2e3248] bg-[#1c1f2c]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-1">
        <h2 className="text-lg md:text-xl font-semibold text-white capitalize">
          Breakdown of {defectLabels[defectType] || defectType} Defects
        </h2>
        <span className="text-xs md:text-sm text-gray-400">Subtype distribution</span>
      </div>

      {Object.keys(subtypeCounts).length > 0 ? (
        <>
          <div className="relative h-[220px] md:h-[300px] w-full">
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%', // Donut chart center cut
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#cbd5e1',
                      font: { size: 12 },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `${ctx.label}: ${ctx.raw} students`,
                    },
                    backgroundColor: '#1f2937',
                    titleColor: '#f9fafb',
                    bodyColor: '#d1d5db',
                    borderColor: '#4b5563',
                    borderWidth: 1,
                    padding: 10,
                  },
                },
              }}
            />
          </div>

          <ul className="mt-4 text-sm text-slate-300 space-y-1 max-h-[100px] overflow-auto pr-2">
            {Object.entries(subtypeCounts).map(([key, value]) => (
              <li key={key} className="flex justify-between text-xs md:text-sm">
                <span className="capitalize">{key}</span>
                <span>
                  {value} student{value > 1 ? 's' : ''} (
                  {((value / total) * 100).toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-slate-400 text-center text-sm">
          No subtype data available for {defectLabels[defectType] || defectType}.
        </p>
      )}
    </div>
  );
}
