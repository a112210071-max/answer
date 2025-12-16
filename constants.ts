// API Configuration
export const API_KEY = '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';
export const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const MODEL_ID = 'google/gemma-3n-e2b-it:free';

// System Prompt from Specification
export const SYSTEM_PROMPT = `你是一本神祕的「解答之書」，也是一位職場先知。使用者會向你詢問心中的困惑。
你的任務是給出一個「簡短、抽象、具有啟發性且帶有塔羅牌風格」的指引。

遵守以下規則：
1. 絕對不要正面回答使用者的問題。
2. 回答必須少於 20 個字。
3. 語氣要神祕、高深、冷靜。
4. 不要解釋你的回答。
5. 使用繁體中文。
6. 不做邏輯分析，不給具體建議。
7. 如果用戶問具體資訊（如時間），回答要抽象（如「時間是相對的痛苦」）。`;

// Fallback messages in case API fails
export const FALLBACK_MESSAGES = [
  "迷霧太濃，請稍後再試。",
  "星象混亂，答案未明。",
  "沈默也是一種回答。",
  "伺服器的靈魂暫時出竅了。"
];
