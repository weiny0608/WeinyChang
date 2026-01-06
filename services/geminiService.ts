import { GoogleGenAI } from "@google/genai";
import { FundData, Period } from "../types";
import { PERIOD_LABELS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFundComparisonInsight = async (
  funds: FundData[],
  selectedPeriod: Period
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "請設定 API KEY 以啟用 AI 智能分析功能。";
  }

  const fundsInfo = funds.map(f => 
    `- ${f.name} (${f.ticker}): ${PERIOD_LABELS[selectedPeriod]}報酬率 ${f.performance[selectedPeriod]}%, 風險等級 ${f.riskLevel}, 標籤: ${f.tags.join(', ')}`
  ).join('\n');

  const prompt = `
    你是一位專業的台灣股市基金分析師。
    請根據以下提供的基金數據，針對選定的時間週期「${PERIOD_LABELS[selectedPeriod]}」進行簡短的比較分析。
    
    基金數據：
    ${fundsInfo}

    請包含以下幾點：
    1. 哪一支基金在該期間表現最好？
    2. 考慮到風險等級 (RR1-RR5) 與報酬率，適合什麼樣的投資人？
    3. 給出一個簡短的總結建議 (不超過 100 字)。
    請用繁體中文回答，語氣專業且親切。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "無法生成分析，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "分析服務暫時無法使用。";
  }
};