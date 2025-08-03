import React from 'react';
import { TooltipProps } from 'recharts';
import { format, parseISO } from 'date-fns';

const ChartTooltipContent = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const isoDate = data.date; // assuming `date` is in `yyyy-MM-dd` format

  return (
    <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-md border text-sm text-slate-700 dark:text-slate-200">
      <div className="font-semibold">{format(parseISO(isoDate), 'MMM d')}</div>
      <ul className="mt-2 space-y-1">
        {payload.map((entry, index) => (
          <li key={index} style={{ color: entry.stroke }}>
            {entry.name}: {entry.value}
          </li>
        ))}
      </ul>

      <a
        href={`/orders?date=${isoDate}`}
        className="block mt-3 text-blue-500 hover:underline"
      >
        View orders for this day
      </a>
    </div>
  );
};

export default ChartTooltipContent;
