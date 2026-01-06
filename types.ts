export enum Period {
  ThreeMonths = '3M',
  SixMonths = '6M',
  OneYear = '1Y',
  ThreeYears = '3Y',
  FiveYears = '5Y',
  TenYears = '10Y',
}

export interface FundData {
  id: string;
  name: string;
  ticker: string; // e.g., A09012
  nav: number; // Net Asset Value
  updateDate: string;
  riskLevel: string; // RR1 - RR5
  currency: string;
  performance: {
    [key in Period]: number; // Percentage, e.g., 15.5 for 15.5%
  };
  tags: string[];
}

export interface SimulationResult {
  investedAmount: number;
  selectedPeriod: Period;
  periodLabel: string;
}