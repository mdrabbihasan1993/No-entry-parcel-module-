
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeParcelContent = async (
  input: string | { mimeType: string; data: string }
): Promise<AIAnalysisResult> => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: typeof input === 'string' 
      ? `Extract parcel delivery information from this text: "${input}". 
         Return customer name, phone, COD amount (number), and full address.`
      : {
          parts: [
            { text: "Extract delivery details from this image of a shipping label or invoice. Return customer name, phone, COD amount (as a number), and full address." },
            { inlineData: input }
          ]
        },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          customerName: { type: Type.STRING },
          customerPhone: { type: Type.STRING },
          codAmount: { type: Type.NUMBER },
          address: { type: Type.STRING },
          note: { type: Type.STRING }
        },
        required: ["customerName", "customerPhone", "codAmount", "address"]
      }
    }
  });

  const response = await model;
  const result = JSON.parse(response.text || "{}");
  return {
    customerName: result.customerName || "",
    customerPhone: result.customerPhone || "",
    codAmount: result.codAmount || 0,
    address: result.address || "",
    note: result.note || ""
  };
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
