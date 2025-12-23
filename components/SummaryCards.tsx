'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useEffect, useState } from 'react';
import { getTradesByMonth, getAllTrades } from '@/lib/queries';

export default function SummaryCards({ month }: { month: string | null }) {
    const { card, foreground, muted } = useThemeColors();
    const [stats, setStats] = useState({ totalProfit: 0, totalLoss: 0, netPL: 0 });

    useEffect(() => {
        async function fetchStats() {
            const trades = month ? await getTradesByMonth(month) : await getAllTrades();
            const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
            const totalLoss = trades.reduce((sum, t) => sum + t.loss, 0);
            const netPL = totalProfit - totalLoss;
            setStats({ totalProfit, totalLoss, netPL });
        }
        fetchStats();
    }, [month]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Total Profit */}
            <div
                className="p-5 rounded-lg shadow flex flex-col items-start gap-2"
                style={{ background: card, border: `1px solid ${muted}` }}
            >
                <div className="text-sm" style={{ color: muted }}>💰 Total Profit</div>
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                    ${stats.totalProfit.toFixed(2)}
                </div>
            </div>

            {/* Total Loss */}
            <div
                className="p-5 rounded-lg shadow flex flex-col items-start gap-2"
                style={{ background: card, border: `1px solid ${muted}` }}
            >
                <div className="text-sm" style={{ color: muted }}>📉 Total Loss</div>
                <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>
                    ${stats.totalLoss.toFixed(2)}
                </div>
            </div>

            {/* Net P/L */}
            <div
                className="p-5 rounded-lg shadow flex flex-col items-start gap-2"
                style={{
                    background: card,
                    border: `1px solid ${muted}`,
                }}
            >
                <div className="text-sm" style={{ color: muted }}>⚖️ Net P/L</div>
                <div
                    className="text-2xl font-bold"
                    style={{ color: stats.netPL >= 0 ? '#10b981' : '#ef4444' }}
                >
                    ${stats.netPL.toFixed(2)}
                </div>
            </div>
        </div>
    );
}
