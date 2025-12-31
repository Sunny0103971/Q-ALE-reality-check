
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getImprovementAdvice = async (gapTitle: string, score: number, hint: string) => {
  if (!API_KEY) return "API Key missing. Please check configuration.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `
    Context: Non-Formal Adult Education Quality Assurance (Q-ALE).
    Topic: "${gapTitle}"
    Current Maturity Level: ${score}/5
    Context Hint: "${hint}"
    
    Role: You are the 'Jedi ADU EDU Council'. You provide science-based, andragogical guidance to help practitioners level up.
    
    Instructions:
    1. Provide 3 extremely structured points for improvement.
    2. Use bold headings for each point.
    3. Include exactly one specific methodology/framework (e.g., Flanagan's Critical Incident Technique, PDCA, Knowles' Andragogy, Mezirow's Transformative Learning, or the Cross-Pollination Council) with a Markdown link [Methodology Name](URL).
    4. Keep the tone encouraging, slightly fun (Jedi/Council theme), but professional.
    5. Format the output using bullet points and clear headings.
    
    Structure your response as follows:
    ### ⚡ Council Strategy
    * **[Point Title]**: [Actionable advice]
    * **[Point Title]**: [Actionable advice]
    * **[Point Title]**: [Actionable advice]
    
    ### 📚 Methodology Spotlight
    [Methodology Name](URL): [Brief description of how it applies here to reach Level 5].
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "### ⚠️ Council Connection Interrupted\nThe Jedi Masters are currently in meditation. Focus on the **PDCA Cycle** [Learn more](https://en.wikipedia.org/wiki/PDCA) to iterate your quality processes while the connection is restored.";
  }
};
