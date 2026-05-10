import React from 'react';
import { AnalysisResult } from '../types';
import { PnLChart } from './PnLChart';
import { PriceChart } from './PriceChart';
import { AlertCircle, TrendingUp, TrendingDown, Target, Zap, ArrowRight, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  const { patterns, technicalElements, implications, strategy } = result;

  return (
    <div className="space-y-px bg-white/5 border border-white/10 rounded overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        
        {/* Left Aspect: Patterns & Indicators */}
        <aside className="lg:col-span-4 bg-[#0a0a0a] p-8 flex flex-col gap-10">
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 font-mono">Technical Identifiers</h3>
            <div className="space-y-8">
              {patterns.map((pattern, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-serif text-white italic leading-tight">{pattern.name}</h4>
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded border font-mono tracking-tighter",
                      pattern.type === 'bullish' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                      pattern.type === 'bearish' ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                      "bg-white/5 text-white/40 border-white/10"
                    )}>
                      {pattern.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-sans">{pattern.description}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/5 relative">
                      <div 
                        className="absolute inset-y-0 left-0 bg-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-1000" 
                        style={{ width: `${pattern.confidence * 100}%` }} 
                      />
                    </div>
                    <span className="text-[9px] font-mono text-white/20 whitespace-nowrap">CONF: {(pattern.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">Evidence Markers</h3>
            <div className="grid grid-cols-2 gap-2">
              {technicalElements.map((el, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded hover:bg-white/10 transition-colors">
                  <span className="text-[11px] text-white/70 italic font-serif leading-tight">{el}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-auto pt-8 border-t border-white/5">
             <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40" />
                <h4 className="text-[10px] uppercase tracking-widest text-emerald-500/60 mb-2 font-mono">Analytic Outlook</h4>
                <p className="text-sm text-emerald-400 italic font-serif leading-relaxed">"{implications}"</p>
             </div>
          </section>
        </aside>

        {/* Right Aspect: Strategy & Execution */}
        <div className="lg:col-span-8 bg-[#050505] p-8 lg:p-12">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/80 font-mono font-bold">Strategic Recommendation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">{strategy.name}</h2>
              <p className="text-white/40 text-sm leading-relaxed italic border-l border-white/10 pl-6">
                {strategy.description}
              </p>
            </div>
            
            <div className="flex gap-px bg-white/10 border border-white/10 rounded p-px">
              <div className="bg-[#0a0a0a] px-5 py-3 min-w-[120px]">
                 <span className="block text-[9px] uppercase tracking-widest text-white/30 font-mono mb-1">Entry</span>
                 <span className="text-emerald-400 font-mono text-lg font-bold tracking-tighter">{strategy.entryPoint}</span>
              </div>
              <div className="bg-[#0a0a0a] px-5 py-3 min-w-[120px]">
                 <span className="block text-[9px] uppercase tracking-widest text-white/30 font-mono mb-1">Target</span>
                 <span className="text-white font-mono text-lg font-bold tracking-tighter">{strategy.exitPoint}</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 font-mono">Position Architecture</h4>
                <div className="space-y-3">
                  {strategy.legs.map((leg, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded transition-all hover:border-white/20">
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "px-2 py-1 rounded text-[10px] font-mono font-bold",
                          leg.action === 'buy' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                        )}>
                          {leg.action === 'buy' ? 'BTO' : 'STO'}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-serif italic text-white uppercase">{leg.type}</span>
                            <span className="text-white font-mono text-sm tracking-tighter">${leg.strike} Strike</span>
                          </div>
                          <span className="text-[10px] text-white/20 font-mono uppercase tracking-widest">{leg.expiration}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-white/10 uppercase">LEG_{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">Execution Logic</h4>
                <div className="space-y-6">
                  <div className="flex gap-4 group">
                    <div className="w-px bg-white/10 relative transition-colors group-hover:bg-emerald-500/40"><div className="absolute top-0 left-[-2px] w-1 h-1 bg-white rounded-full group-hover:bg-emerald-400"></div></div>
                    <p className="text-base text-white/80 italic font-serif py-1">
                      <span className="text-[10px] text-white/30 uppercase tracking-tighter font-mono not-italic mr-3">Leg In:</span> 
                      Confirmed visual validation of {strategy.entryPoint}.
                    </p>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="w-px bg-white/10 relative transition-colors group-hover:bg-emerald-500/40"><div className="absolute bottom-0 left-[-2px] w-1 h-1 bg-white rounded-full group-hover:bg-emerald-400"></div></div>
                    <p className="text-base text-white/80 italic font-serif py-1">
                      <span className="text-[10px] text-white/30 uppercase tracking-tighter font-mono not-italic mr-3">Leg Out:</span> 
                      Target fulfillment at {strategy.exitPoint} or trend reversal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <PriceChart data={result.priceHistory} />
              <PnLChart data={strategy.pnlData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
