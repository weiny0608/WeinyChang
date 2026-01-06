import React from 'react';
import { Period } from '../types';
import { PERIOD_LABELS } from '../constants';

interface CalculatorProps {
  amount: number;
  setAmount: (val: number) => void;
  period: Period;
  setPeriod: (val: Period) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ amount, setAmount, period, setPeriod }) => {
  const formatAmount = (val: number) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100 sticky top-4 z-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">試算您的投資潛力</h2>
            <p className="text-sm text-gray-500">輸入金額與持有時間，立即比較獲利預估</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          
          <div className="relative group">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">投入本金 (TWD)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-8 pr-4 py-2 w-full sm:w-48 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm group-hover:border-blue-300"
                placeholder="例如: 100,000"
              />
            </div>
          </div>

          <div className="relative group">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">持有期間</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="px-4 py-2 w-full sm:w-40 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm bg-white group-hover:border-blue-300 cursor-pointer"
            >
              {Object.entries(PERIOD_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
      
      {/* Quick visual feedback */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
        <span className="text-sm text-gray-500">
           當前設定：投入 {formatAmount(amount)} 持有 {PERIOD_LABELS[period]}
        </span>
      </div>
    </div>
  );
};

export default Calculator;