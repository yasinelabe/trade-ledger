'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteTradeAction, type Trade } from '@/lib/queries';

export default function TradesTable({ trades }: { trades: Trade[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this trade?')) return;

    startTransition(async () => {
      await deleteTradeAction(id);
      router.refresh(); // optional if you rely on revalidatePath
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Date</th>
            <th className="px-4 py-3 text-left font-medium">Pair</th>
            <th className="px-4 py-3 text-right font-medium">Profit</th>
            <th className="px-4 py-3 text-right font-medium">Loss</th>
            <th className="px-4 py-3 text-right font-medium">Net P/L</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade) => {
            const net = trade.profit - trade.loss;
            const isPositive = net >= 0;

            return (
              <tr
                key={trade.id}
                className="border-t border-border hover:bg-muted/40 transition"
              >
                <td className="px-4 py-3">{trade.date}</td>
                <td className="px-4 py-3 font-medium">{trade.pair}</td>

                <td className="px-4 py-3 text-right text-green-600">
                  ${trade.profit.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right text-red-600">
                  ${trade.loss.toFixed(2)}
                </td>

                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isPositive ? '+' : '-'}${Math.abs(net).toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(trade.id)}
                    disabled={isPending}
                    className="text-sm text-red-500 hover:text-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {trades.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No trades found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
