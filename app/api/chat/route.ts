import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try{
    const ai = new GoogleGenAI({});
    const {model, instruction, userInstruction, input, conversationHistory = []} = await req.json();
    
    // Build conversation context
    let conversationContext = "";
    if (conversationHistory.length > 0) {
      conversationContext = "\n\nConversation History:\n";
      conversationHistory.forEach((msg: {role: string, text: string}) => {
        conversationContext += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}\n`;
      });
      conversationContext += "\nCurrent User Input: ";
    }
    
    const fullPrompt = `Main Instruction: ${instruction}
User Instruction: ${userInstruction}
${conversationContext}${input}

Note: "Only introduce yourself when user asks for it. Maintain conversation context and respond appropriately to the conversation flow. If the user says thank you or similar, acknowledge it appropriately instead of giving generic advice."`;

    const res = await ai.models.generateContent({
      model: model == "pro" ? "gemini-2.5-pro" : "gemini-2.5-flash",
      contents: fullPrompt,
    });
    return NextResponse.json(res)
  }catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
