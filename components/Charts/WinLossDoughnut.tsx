'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useThemeColors } from '@/hooks/useThemeColors';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type WinLoss = { wins: number; losses: number };

export default function WinLossDoughnut({ data }: { data: WinLoss }) {
  const [mounted, setMounted] = useState(false);
  const { foreground } = useThemeColors();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-card p-4 rounded border border-border h-64 animate-pulse" />;

  const chartData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      { data: [data.wins, data.losses], backgroundColor: ['#10b981', '#ef4444'] },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: foreground } },
      title: { display: true, text: 'Win / Loss Ratio', color: foreground },
    },
  };

  return (
    <div className="bg-card p-4 rounded border border-border">
      <Doughnut options={options} data={chartData} />
    </div>
  );
}
