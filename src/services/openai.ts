import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { PromptExperiment, MetricsCollector } from "promptlens";

export class OpenAIService {
  private client: OpenAI;
  public metricsCollector: MetricsCollector;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Initialize the metrics collector
    this.metricsCollector = new MetricsCollector(
      process.env.PROMPTLENS_API_KEY || "test-key",
      "https://api.promptlens.dev",
      true // enable metrics collection
    );
  }

  @PromptExperiment({
    id: "test-experiment",
    promptVariants: [
      "Explain this like I'm 5 years old",
      "Provide a technical explanation with specific details",
      "Use a creative analogy to explain this concept",
    ],
    distribution: "round-robin",
    trackMetrics: true,
  })
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

export const openAIService = new OpenAIService();
