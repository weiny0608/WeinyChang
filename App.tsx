import React, { useState } from 'react';
import { Period } from './types';
import { MOCK_FUNDS } from './constants';
import Calculator from './components/Calculator';
import ComparisonGrid from './components/ComparisonGrid';
import AIInsight from './components/AIInsight';

const App: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.OneYear);

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Nav */}
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-30 opacity-95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white font-bold p-1.5 rounded text-sm tracking-tighter">
              TW
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              Fund<span className="text-red-600">Compare</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-red-600">熱門排行</a>
            <a href="#" className="hover:text-red-600">基金搜尋</a>
            <a href="#" className="text-red-600">智慧試算</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            台股基金績效試算與比較
          </h2>
          <p className="text-gray-500">
            比較熱門台股基金在不同週期的投報率，並試算您的獲利潛力。
            <span className="text-xs ml-2 text-gray-400">(數據為模擬示範)</span>
          </p>
        </div>

        {/* The Calculator (Sticky-ish within container) */}
        <Calculator 
          amount={investmentAmount} 
          setAmount={setInvestmentAmount}
          period={selectedPeriod}
          setPeriod={setSelectedPeriod}
        />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Fund List & Comparison */}
          <div className="lg:col-span-12">
            <ComparisonGrid 
              funds={MOCK_FUNDS}
              amount={investmentAmount}
              period={selectedPeriod}
            />

            {/* AI Section */}
            <AIInsight 
              funds={MOCK_FUNDS} 
              selectedPeriod={selectedPeriod} 
            />
          </div>

        </div>
        
        {/* Disclaimer */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-400 text-center leading-relaxed">
          <p>免責聲明：本網頁提供的數據僅供模擬示範，不代表未來績效保證。投資一定有風險，基金投資有賺有賠，申購前應詳閱公開說明書。</p>
          <p>© 2024 TW FundCompare Demo. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default App;