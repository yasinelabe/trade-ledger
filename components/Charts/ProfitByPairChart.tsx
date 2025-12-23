'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeColors } from '@/hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type PairPL = { pair: string; net: number };

export default function ProfitByPairChart({ data }: { data: PairPL[] }) {
  const [mounted, setMounted] = useState(false);
  const { foreground, border } = useThemeColors();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-card p-4 rounded border border-border h-64 animate-pulse" />;

  const chartData = {
    labels: data.map(d => d.pair),
    datasets: [
      { label: 'Net Profit', data: data.map(d => d.net), backgroundColor: '#10b981' },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Profit by Pair', color: foreground },
    },
    scales: {
      x: { ticks: { color: foreground }, grid: { color: border } },
      y: { ticks: { color: foreground }, grid: { color: border } },
    },
  };

  return (
    <div className="bg-card p-4 rounded border border-border">
      <Bar options={options} data={chartData} />
    </div>
  );
}
