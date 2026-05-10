import { useState } from 'react';
import { LineChart, Search, Brain, History, Sparkles, Loader2, Info, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FileUpload } from './components/FileUpload';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { analyzeChart } from './services/geminiService';
import { AnalysisResult } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (base64: string) => {
    setImage(base64);
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeChart(base64);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] selection:bg-emerald-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#050505_100%)] opacity-40" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white transform rotate-45" />
            </div>
            <h1 className="text-xl font-serif tracking-wide">ChartWise <span className="italic text-emerald-400">AI</span></h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end mr-4">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Market Sentiment</span>
              <span className="text-xs text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Analyzed Range: Active
              </span>
            </div>
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">Analyzer</a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">Pulse</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className={cn(
          "transition-all duration-700 ease-in-out",
          result ? "mb-12" : "mt-12 md:mt-24"
        )}>
          {!result && (
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-6"
              >
                <Sparkles size={12} />
                <span>Gemini 2.0 Powered Analysis</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent italic"
              >
                Vision is the edge.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed border-l-2 border-emerald-500/30 pl-8 italic"
              >
                Synthesize visual price action into sophisticated options strategies with our high-density analytic engine.
              </motion.p>
            </div>
          )}

          <div className={cn(
            "mx-auto transition-all duration-700",
            result ? "w-full max-w-7xl" : "max-w-xl"
          )}>
            {!result ? (
              <FileUpload onFileSelect={handleAnalysis} className={isAnalyzing ? "opacity-50 pointer-events-none" : ""} />
            ) : (
              <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                    <History className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif italic text-white leading-none">Analysis Complete</h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 font-mono">Engine v4.02 // High Density Mode</p>
                  </div>
                </div>
                <button 
                  onClick={reset}
                  className="px-6 py-2 border border-white/20 rounded hover:bg-white/5 transition-colors text-xs uppercase tracking-tighter"
                >
                  New Analysis
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-4 py-32"
                >
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <Brain className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-500 font-mono text-sm tracking-widest uppercase animate-pulse">Running Technical Inference</p>
                    <p className="text-zinc-500 text-xs mt-1">Cross-referencing historical chart patterns...</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3 mt-8"
                >
                  <Info size={16} />
                  {error}
                </motion.div>
              )}

              {result && <AnalysisDisplay result={result} />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-zinc-900 py-12 mt-12 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-widest text-center md:text-left leading-loose">
            Disclaimer: Analysis is purely technical and illustrative. <br />
            Not financial advice. Trade at your own risk.
          </div>
          <div className="flex gap-6">
            <a href="#" className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <Share2 size={16} className="text-zinc-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
