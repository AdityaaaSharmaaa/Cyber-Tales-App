declare module '@huggingface/inference' {
  interface ChatCompletionMessage {
    role: string;
    content: string;
  }

  interface ChatCompletionChoice {
    message: ChatCompletionMessage;
    index: number;
    finish_reason: string;
  }

  interface ChatCompletionResponse {
    choices: ChatCompletionChoice[];
  }

  interface HfInferenceConfig {
    accessToken: string;
  }

  class HfInference {
    constructor(config: string | HfInferenceConfig);
    chatCompletion(params: {
      model: string;
      messages: ChatCompletionMessage[];
      provider?: string;
      max_tokens?: number;
      temperature?: number;
    }): Promise<ChatCompletionResponse>;
  }

  export { HfInference };
} 