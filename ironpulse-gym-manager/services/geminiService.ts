import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing in environment variables.");
    // In a real app, handle this gracefully. For now, we assume it's there or user will provide.
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateRenewalReminder = async (
  memberName: string,
  daysLeft: number,
  planName: string
): Promise<string> => {
  const ai = getClient();
  const isExpired = daysLeft < 0;
  
  const prompt = `
    You are a professional gym manager assistant for "IronPulse Gym".
    Write a short, encouraging, and professional WhatsApp/SMS message to a member named "${memberName}".
    
    Context:
    - Their ${planName} membership ${isExpired ? `expired ${Math.abs(daysLeft)} days ago` : `expires in ${daysLeft} days`}.
    - Goal: Gently remind them to renew.
    - Tone: Friendly, motivating, professional. No hashtags. Keep it under 50 words.
    
    Output only the message text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate reminder.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Hello ${memberName}, this is a friendly reminder from IronPulse Gym that your membership is due for renewal. We hope to see you soon!`;
  }
};