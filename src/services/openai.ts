import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createChatCompletion(messages: ChatCompletionMessageParam[]) {
    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: messages,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error in OpenAI chat completion:", error);
      throw error;
    }
  }
}
