import { getAllTrades } from '@/lib/queries';
import TradesTable from '@/components/TradesTable';

export default async function TradesPage() {
    const trades = await getAllTrades();
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Trade Records</h1>
                <a
                    href="/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Trade
                </a>
            </div>
            <TradesTable trades={trades} />
        </div>
    );
}