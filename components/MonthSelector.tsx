'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function MonthSelector({ months }: { months: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentMonth = searchParams.get('month') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    const url = month ? `/?month=${month}` : '/';
    router.push(url);
  };

  return (
    <select
      className="border rounded px-3 py-1"
      value={currentMonth}
      onChange={handleChange}
    >
      <option value="">All Time</option>
      {months.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}