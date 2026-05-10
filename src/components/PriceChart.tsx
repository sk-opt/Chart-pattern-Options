import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceChartProps {
  data: { date: string; price: number }[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-[#0a0a0a] rounded border border-white/10 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Mock Price Reconstruction</h4>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
           <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono">Price Action</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.2)" 
              fontSize={9} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.2)" 
              fontSize={9} 
              tickFormatter={(val) => `$${val}`}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                borderColor: 'rgba(255,255,255,0.1)', 
                fontSize: '10px',
                borderRadius: '4px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: '#60a5fa' }}
              labelStyle={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-[8px] text-white/10 mt-4 uppercase font-mono tracking-widest pt-4 border-t border-white/5">
        <span>Inferred Historical Trend</span>
        <span>Synthetic Signal Path</span>
      </div>
    </div>
  );
};
