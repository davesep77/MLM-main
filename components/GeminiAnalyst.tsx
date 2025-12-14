import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { MarketDataPoint, AnalysisStatus, AnalysisResult } from '../types';
import { analyzeMarketData } from '../services/geminiService';

interface GeminiAnalystProps {
  data: MarketDataPoint[];
}

export const GeminiAnalyst: React.FC<GeminiAnalystProps> = ({ data }) => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalysis = async () => {
    setStatus(AnalysisStatus.LOADING);
    try {
      const analysis = await analyzeMarketData(data);
      setResult(analysis);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (e) {
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <div className="bg-gradient-to-br from-nexus-800 to-nexus-900 border border-nexus-700 rounded-xl p-6 shadow-lg relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-accent/5 rounded-full blur-3xl -z-0"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2 text-nexus-accent">
          <Sparkles size={20} />
          <h3 className="font-bold text-lg">AI Market Analyst</h3>
        </div>
        <div className="text-xs font-mono text-slate-500 border border-nexus-700 px-2 py-1 rounded">
          Powered by Gemini 2.5
        </div>
      </div>

      <div className="relative z-10">
        {status === AnalysisStatus.IDLE && (
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4 text-sm">
              Generate an instant analysis of the synthetic market data using Google Gemini.
            </p>
            <button 
              onClick={handleAnalysis}
              className="bg-white text-nexus-900 font-semibold py-2 px-6 rounded-full hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
            >
              Analyze Synthetic Data
            </button>
          </div>
        )}

        {status === AnalysisStatus.LOADING && (
          <div className="py-8 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <RefreshCw className="animate-spin text-nexus-accent" size={32} />
            <span className="text-sm animate-pulse">Processing market vectors...</span>
          </div>
        )}

        {status === AnalysisStatus.ERROR && (
          <div className="bg-nexus-danger/10 border border-nexus-danger/20 rounded-lg p-4 text-center">
            <div className="flex justify-center mb-2 text-nexus-danger">
              <AlertCircle size={24} />
            </div>
            <p className="text-nexus-danger text-sm mb-2">Analysis Failed</p>
            <p className="text-xs text-slate-400 mb-4">Ensure API_KEY is set in environment.</p>
            <button 
              onClick={handleAnalysis}
              className="text-xs bg-nexus-800 hover:bg-nexus-700 px-3 py-1 rounded border border-nexus-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {status === AnalysisStatus.SUCCESS && result && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-4">
               <div className={`
                 px-3 py-1 rounded text-sm font-bold uppercase tracking-wider
                 ${result.trend === 'bullish' ? 'bg-nexus-success/20 text-nexus-success' : 
                   result.trend === 'bearish' ? 'bg-nexus-danger/20 text-nexus-danger' : 
                   'bg-slate-500/20 text-slate-400'}
               `}>
                 {result.trend}
               </div>
               <div className="text-sm text-slate-400">
                 Confidence: <span className="text-white font-mono">{result.confidence}%</span>
               </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-nexus-accent pl-4">
              "{result.summary}"
            </p>

            <button 
              onClick={handleAnalysis} 
              className="text-xs flex items-center gap-1 text-nexus-accent hover:text-white mt-2"
            >
              <RefreshCw size={12} /> Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};