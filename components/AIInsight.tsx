import React, { useState } from 'react';
import { FundData, Period } from '../types';
import { generateFundComparisonInsight } from '../services/geminiService';
import { PERIOD_LABELS } from '../constants';

interface AIInsightProps {
  funds: FundData[];
  selectedPeriod: Period;
}

const AIInsight: React.FC<AIInsightProps> = ({ funds, selectedPeriod }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateFundComparisonInsight(funds, selectedPeriod);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-1 shadow-lg mt-8 text-white">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="text-lg font-bold">AI 智能投顧分析</h3>
              <p className="text-indigo-100 text-sm opacity-90">
                基於 <span className="font-semibold text-yellow-300">Google Gemini</span> 模型分析目前比較列表
              </p>
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all shadow-md 
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-white text-indigo-600 hover:bg-yellow-300 hover:text-indigo-900'
              }`}
          >
            {loading ? '分析中...' : '生成分析報告'}
          </button>
        </div>

        {insight && (
          <div className="bg-white/95 text-gray-800 p-4 rounded-lg text-sm leading-relaxed shadow-inner animate-fade-in">
            <h4 className="font-bold text-indigo-700 mb-2 border-b border-indigo-100 pb-1">
              針對 {PERIOD_LABELS[selectedPeriod]} 的分析結果：
            </h4>
            <div className="whitespace-pre-line text-gray-700">
              {insight}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsight;