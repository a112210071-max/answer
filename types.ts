export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: Message;
    finish_reason: string;
  }[];
}

export enum AppState {
  IDLE = 'IDLE',       // User is thinking/typing
  THINKING = 'THINKING', // Animation/API Call
  REVEALED = 'REVEALED', // Answer shown
}
