import React from 'react';
import { FundData, Period } from '../types';
import { PERIOD_LABELS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ComparisonGridProps {
  funds: FundData[];
  amount: number;
  period: Period;
}

const ComparisonGrid: React.FC<ComparisonGridProps> = ({ funds, amount, period }) => {

  const calculateReturn = (roi: number) => {
    return amount * (roi / 100);
  };

  const calculateTotal = (roi: number) => {
    return amount + calculateReturn(roi);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 50) return 'text-red-600 bg-red-50';
    if (roi > 0) return 'text-red-500 bg-red-50'; // Taiwan stock usage: Red is up
    if (roi < 0) return 'text-green-600 bg-green-50'; // Taiwan stock usage: Green is down
    return 'text-gray-600 bg-gray-50';
  };

  // Prepare chart data
  const chartData = funds.map(fund => ({
    name: fund.name.substring(0, 4) + '...', // Truncate for display
    returnRate: fund.performance[period],
    fullName: fund.name
  }));

  return (
    <div className="space-y-8">
      
      {/* Cards for Mobile / Grid for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {funds.map((fund) => {
          const roi = fund.performance[period];
          const projectedGain = calculateReturn(roi);
          const finalValue = calculateTotal(roi);

          return (
            <div key={fund.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              {/* Header */}
              <div className="p-5 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${fund.riskLevel === 'RR5' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {fund.riskLevel}
                  </span>
                  <span className="text-xs text-gray-400">{fund.ticker}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 leading-tight h-14 line-clamp-2">
                  {fund.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {fund.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulation Result Area (Highlighted) */}
              <div className="p-5 bg-blue-50/30 flex-grow">
                <div className="mb-1 text-xs text-gray-500 uppercase tracking-wide">
                  {PERIOD_LABELS[period]} 預估獲利
                </div>
                <div className={`text-2xl font-bold mb-1 ${projectedGain >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {projectedGain > 0 ? '+' : ''}{formatCurrency(projectedGain)}
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500">預估總值</span>
                  <span className="text-sm font-semibold text-gray-700">{formatCurrency(finalValue)}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-500">最新淨值</span>
                  <span className="font-mono font-medium">{fund.nav}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="text-gray-500">{PERIOD_LABELS[period]} 報酬率</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${getRoiColor(roi)}`}>
                    {roi}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">幣別</span>
                  <span>{fund.currency}</span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors w-full">
                  查看詳情 &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          {PERIOD_LABELS[period]} 報酬率視覺化比較
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" domain={[0, 'auto']} hide />
              <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, '報酬率']}
                labelFormatter={(label) => {
                   const fullName = chartData.find(d => d.name === label)?.fullName;
                   return fullName || label;
                }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="returnRate" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.returnRate >= 0 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default ComparisonGrid;