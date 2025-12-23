'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useThemeColors } from '@/hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProfitLossBar({ data: serverData }: { data: { profit: number; loss: number } }) {
  const [mounted, setMounted] = useState(false);
  const { foreground, border } = useThemeColors();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className="bg-card p-4 rounded border border-border h-64 animate-pulse" />;

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: foreground } },
      title: { display: true, text: 'Profit vs Loss', color: foreground },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: foreground }, grid: { color: border } },
      x: { ticks: { color: foreground }, grid: { color: border } },
    },
  };

  const chartData = {
    labels: ['Amount'],
    datasets: [
      { label: 'Profit', data: [serverData.profit], backgroundColor: '#10b981' },
      { label: 'Loss', data: [serverData.loss], backgroundColor: '#ef4444' },
    ],
  };

  return (
    <div className="bg-card p-4 rounded border border-border">
      <Bar options={options} data={chartData} />
    </div>
  );
}
