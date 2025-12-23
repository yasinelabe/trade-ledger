'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeColors } from '@/hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function NetPLLine({ data: points }: { data: { date: string; net: number }[] }) {
  const [mounted, setMounted] = useState(false);
  const { foreground, border } = useThemeColors();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className="bg-card p-4 rounded border border-border h-64 animate-pulse" />;

  const lineColor = points.length > 0 && points[points.length - 1].net >= 0 ? '#10b981' : '#ef4444';

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, labels: { color: foreground } },
      title: { display: true, text: 'Daily Net P/L', color: foreground },
    },
    scales: {
      y: { ticks: { color: foreground }, grid: { color: border } },
      x: { ticks: { color: foreground }, grid: { color: border } },
    },
  };

  const chartData = {
    labels: points.map(p => p.date),
    datasets: [
      {
        label: 'Net P/L',
        data: points.map(p => p.net),
        borderColor: lineColor,
        backgroundColor: 'transparent',
        tension: 0.3,
        pointBackgroundColor: lineColor,
      },
    ],
  };

  return (
    <div className="bg-card p-4 rounded border border-border">
      <Line options={options} data={chartData} />
    </div>
  );
}
