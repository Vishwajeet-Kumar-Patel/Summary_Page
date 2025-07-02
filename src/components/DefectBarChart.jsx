import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DefectBarChart({ data, onBarClick }) {
  const defectTypes = [
    'eye', 'hearing', 'fitness', 'mental', 'dental', 'orthopedic', 'ent',
  ];

  const defectLabels = {
    eye: 'Eye',
    hearing: 'Hearing',
    fitness: 'Fitness',
    mental: 'Mental Health',
    dental: 'Dental',
    orthopedic: 'Orthopedic',
    ent: 'ENT',
  };

  const barColors = [
    '#3b82f6', '#facc15', '#10b981',
    '#ef4444', '#8b5cf6', '#f97316', '#14b8a6'
  ];

  const defectCounts = useMemo(() => {
    const counts = Object.fromEntries(defectTypes.map(type => [type, 0]));
    data.forEach(student => {
      defectTypes.forEach(type => {
        if (student.defects?.[type]) counts[type]++;
      });
    });
    return counts;
  }, [data]);

  const chartData = {
    labels: defectTypes.map(type => defectLabels[type]),
    datasets: [
      {
        label: 'Number of Students',
        data: defectTypes.map(type => defectCounts[type]),
        backgroundColor: barColors,
        borderRadius: 8,
        barThickness: 36,
        hoverBackgroundColor: barColors.map(color => color + 'cc'),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 700,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw} students`,
        },
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#4b5563',
        borderWidth: 1,
        padding: 10,
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const clickedDefect = defectTypes[index];
        onBarClick(clickedDefect);
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9ca3af',
          stepSize: 1,
          precision: 0,
        },
        title: {
          display: true,
          text: 'Number of Students',
          color: '#e5e7eb',
          font: { size: 14 },
        },
        grid: {
          color: '#374151',
        },
      },
      x: {
        ticks: {
          color: '#9ca3af',
        },
        title: {
          display: true,
          text: 'Health Categories',
          color: '#e5e7eb',
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[500px] p-6 rounded-xl shadow-lg transition-shadow duration-300 border border-[#2e3248]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          Students vs Health Defects
        </h2>
        <span className="text-sm text-gray-400">
          Click on a bar to explore
        </span>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
