import { NextResponse } from "next/server";
import { OpenAIService } from "@/services/openai";

const openAIService = new OpenAIService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const completion = await openAIService.createChatCompletion(messages);

    return NextResponse.json({ completion });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat completion" },
      { status: 500 }
    );
  }
}
