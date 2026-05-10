import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeChart(base64Image: string): Promise<AnalysisResult> {
  const prompt = `
    Analyze this stock chart image carefully and identify:
    1. Reconstruct logical technical patterns (e.g., Head and Shoulders, Double Top/Bottom, Bull/Bear Flag, Triangle, Support/Resistance levels).
    2. Suggest a primary options strategy based on the identified patterns.
    3. Provide specific legs for the strategy, entry/exit points, and approximate price levels.
    4. Generate P&L data points for the strategy visualization (at least 10 points covering a range around the current price/strikes).
    5. Generate a mock sequence of ~20 historical price data points (date/price) that mirrors the price action seen in the image to show the trend.

    Focus on technical structure and objective price action visible in the image.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image.split(',')[1],
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patterns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["bullish", "bearish", "neutral"] },
                  confidence: { type: Type.NUMBER },
                },
                required: ["name", "description", "type", "confidence"],
              },
            },
            technicalElements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            implications: { type: Type.STRING },
            strategy: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                legs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, enum: ["call", "put"] },
                      action: { type: Type.STRING, enum: ["buy", "sell"] },
                      strike: { type: Type.NUMBER },
                      expiration: { type: Type.STRING },
                    },
                    required: ["type", "action", "strike", "expiration"],
                  },
                },
                entryPoint: { type: Type.STRING },
                exitPoint: { type: Type.STRING },
                pnlData: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      price: { type: Type.NUMBER },
                      profit: { type: Type.NUMBER },
                    },
                    required: ["price", "profit"],
                  },
                },
              },
              required: ["name", "description", "legs", "entryPoint", "exitPoint", "pnlData"],
            },
            priceHistory: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                },
                required: ["date", "price"],
              },
            },
          },
          required: ["patterns", "technicalElements", "implications", "strategy", "priceHistory"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze chart image. Please ensure the image is clear.");
  }
}
