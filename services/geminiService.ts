import { GoogleGenAI, Type } from "@google/genai";
import { MarketDataPoint, AnalysisResult } from "../types";

export const analyzeMarketData = async (data: MarketDataPoint[]): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key missing");
    return {
      summary: "Market analysis unavailable (API Key missing).",
      trend: "neutral",
      confidence: 0
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Optimize context window by sending only relevant recent data
  const recentData = data.slice(-10);
  const dataString = JSON.stringify(recentData);

  const prompt = `
    Analyze the following market data strictly as a financial analyst.
    Data: ${dataString}
    
    Output a JSON object with:
    - summary: A concise professional market summary (max 2 sentences).
    - trend: "bullish", "bearish", or "neutral".
    - confidence: A number between 0-100 indicating confidence in the trend.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // Updated to stable model if 2.5 isn't available, or keep 2.0-flash-exp if intended
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            trend: { type: Type.STRING, enum: ['bullish', 'bearish', 'neutral'] },
            confidence: { type: Type.NUMBER }
          },
          required: ['summary', 'trend', 'confidence']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }

    throw new Error("Empty response from Gemini.");
  } catch (error) {
    console.error("Gemini Analysis Service Error:", error);
    // Return graceful fallback instead of throwing to prevent UI crash
    return {
      summary: "Market analysis temporarily unavailable.",
      trend: "neutral",
      confidence: 0
    };
  }
};