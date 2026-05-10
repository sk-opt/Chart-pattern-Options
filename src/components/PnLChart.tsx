import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface PnLChartProps {
  data: { price: number; profit: number }[];
}

export const PnLChart: React.FC<PnLChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-[#0a0a0a] rounded border border-white/10 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">P&L Projection</h4>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
           <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Strategy Delta</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="price" 
              stroke="rgba(255,255,255,0.2)" 
              fontSize={9} 
              tickFormatter={(val) => `$${val}`}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.2)" 
              fontSize={9} 
              tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                borderColor: 'rgba(255,255,255,0.1)', 
                fontSize: '10px',
                borderRadius: '4px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: '#10b981' }}
              labelStyle={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'PL']}
              labelFormatter={(label) => `Price: $${label}`}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="0" />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#profitGradient)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-[8px] text-white/10 mt-4 uppercase font-mono tracking-widest pt-4 border-t border-white/5">
        <span>Historical Volatility Adjusted</span>
        <span>Asymptotic Convergence Mode</span>
      </div>
    </div>
  );
};
