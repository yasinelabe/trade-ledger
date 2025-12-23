'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addTradeAction } from '@/lib/queries';

const defaultPairs = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'EUR/USD', 'AAPL', 'TSLA'];

export default function AddTradePage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [date, setDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [pair, setPair] = useState('');
    const [customPair, setCustomPair] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [profit, setProfit] = useState('0');
    const [loss, setLoss] = useState('0');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalPair = isCustom ? customPair.trim() : pair;
        if (!finalPair) return;

        startTransition(async () => {
            await addTradeAction({
                date,
                pair: finalPair,
                profit: Number(profit) || 0,
                loss: Number(loss) || 0,
            });

            router.push('/trades');
        });
    };

    return (
        <div className="mx-auto max-w-lg px-6 py-10">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-semibold">Add Trade</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Date */}
                    <Field label="Date">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input"
                            required
                        />
                    </Field>

                    {/* Pair */}
                    <Field label="Pair">
                        <div className="flex gap-2">
                            <select
                                value={pair}
                                onChange={(e) => {
                                    setPair(e.target.value);
                                    setIsCustom(false);
                                    setCustomPair('');
                                }}
                                disabled={isCustom}
                                className="input flex-1"
                            >
                                <option value="">Select...</option>
                                {defaultPairs.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={() => setIsCustom((v) => !v)}
                                className="text-sm text-primary hover:underline"
                            >
                                {isCustom ? 'Preset' : 'Custom'}
                            </button>
                        </div>

                        {isCustom && (
                            <input
                                type="text"
                                value={customPair}
                                onChange={(e) => setCustomPair(e.target.value)}
                                placeholder="e.g. DOGE/USD"
                                className="input mt-2"
                                required
                            />
                        )}
                    </Field>

                    {/* Profit */}
                    <Field label="Profit ($)">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={profit}
                            onChange={(e) => setProfit(e.target.value)}
                            className="input"
                        />
                    </Field>

                    {/* Loss */}
                    <Field label="Loss ($)">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={loss}
                            onChange={(e) => setLoss(e.target.value)}
                            className="input"
                        />
                    </Field>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-4 w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                    >
                        {isPending ? 'Saving…' : 'Add Trade'}
                    </button>
                </form>
            </div>
        </div>
    );
}

/* ---------------------------------- */
/* Small helper component              */
/* ---------------------------------- */

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}
