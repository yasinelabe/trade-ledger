'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeColors } from '@/hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type NetPoint = { date: string; net: number };

export default function CumulativePLLine({ data }: { data: NetPoint[] }) {
  const [mounted, setMounted] = useState(false);
  const { foreground, border } = useThemeColors();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-card p-4 rounded border border-border h-64 animate-pulse" />;

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Cumulative Net P/L',
        data: data.map(d => d.net),
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Cumulative Net P/L', color: foreground },
    },
    scales: {
      y: { ticks: { color: foreground }, grid: { color: border } },
      x: { ticks: { color: foreground }, grid: { color: border } },
    },
  };

  return (
    <div className="bg-card p-4 rounded border border-border">
      <Line options={options} data={chartData} />
    </div>
  );
}
