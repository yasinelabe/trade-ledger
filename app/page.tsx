import { getAllTrades, getTradesByMonth, getUniqueMonths } from '@/lib/queries';
import SummaryCards from '@/components/SummaryCards';
import ProfitLossBar from '@/components/Charts/ProfitLossBar';
import NetPLLine from '@/components/Charts/NetPLLine';
import MonthSelector from '@/components/MonthSelector';
import WinLossDoughnut from '@/components/Charts/WinLossDoughnut';
import ProfitByPairChart from '@/components/Charts/ProfitByPairChart';
import CumulativePLLine from '@/components/Charts/CumulativePLLine';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const sp = await searchParams;
  const selectedMonth = sp.month || null;
  const months = await getUniqueMonths();

  const trades = selectedMonth ? await getTradesByMonth(selectedMonth) : await getAllTrades();

  // Total profit/loss for bar chart
  const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
  const totalLoss = trades.reduce((sum, t) => sum + t.loss, 0);

  // Daily Net P/L for line chart
  const dailyNetMap = new Map<string, number>();
  trades.forEach(t => {
    const net = t.profit - t.loss;
    dailyNetMap.set(t.date, (dailyNetMap.get(t.date) || 0) + net);
  });
  const dailyNet = Array.from(dailyNetMap.entries())
    .map(([date, net]) => ({ date, net }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Win/Loss Doughnut
  const wins = trades.filter(t => t.profit - t.loss > 0).length;
  const losses = trades.filter(t => t.profit - t.loss <= 0).length;
  const winLossData = { wins, losses };

  // Profit by Pair
  const pairMap = new Map<string, number>();
  trades.forEach(t => {
    pairMap.set(t.pair, (pairMap.get(t.pair) || 0) + (t.profit - t.loss));
  });
  const profitByPairData = Array.from(pairMap.entries()).map(([pair, net]) => ({ pair, net }));

  // Cumulative Net P/L
  let cumulative = 0;
  const cumulativeData = dailyNet.map(d => {
    cumulative += d.net;
    return { date: d.date, net: cumulative };
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Filter by Month</label>
        <MonthSelector months={months} />
      </div>

      <SummaryCards month={selectedMonth} />

      <ProfitLossBar data={{ profit: totalProfit, loss: totalLoss }} />
      <NetPLLine data={dailyNet} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WinLossDoughnut data={winLossData} />
        <ProfitByPairChart data={profitByPairData} />
      </div>

      <CumulativePLLine data={cumulativeData} />
    </div>
  );
}
