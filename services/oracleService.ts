import { API_KEY, API_URL, MODEL_ID, SYSTEM_PROMPT } from '../constants';
import { OpenRouterResponse } from '../types';

export const consultOracle = async (userQuery: string): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        // Optional headers for OpenRouter rankings/stats
        'HTTP-Referer': window.location.href, 
        'X-Title': 'The Office Oracle',
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userQuery.trim() || "我該怎麼辦？", // Default query if empty, though input suggests focusing thought
          },
        ],
        temperature: 1.2, // High temperature for creativity as per spec
        max_tokens: 50,   // Short answer limit
      }),
    });

    if (!response.ok) {
      throw new Error(`Oracle Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    const answer = data.choices[0]?.message?.content?.trim();

    return answer || "星辰無語。";
  } catch (error) {
    console.error("Oracle Connection Failed:", error);
    throw error;
  }
};
