'use client';

import { SentimentAnalysisType } from '@/types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#eab308', '#ef4444']; // green, yellow, red

export default function SentimentPieChart({ data }: { data: SentimentAnalysisType[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="sentiment" cx="50%" cy="50%" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} responses`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
