import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try{
    const ai = new GoogleGenAI({});
    const {model,instruction,userInstruction,input} = await req.json();
    const res = await ai.models.generateContent({
      model: model == "pro" ? "gemini-2.5-pro" : "gemini-2.5-flash",
      contents: `Main Instruction: ${instruction}, User Instruction: ${userInstruction}, User Input: ${input}`,
    });
    return NextResponse.json(res)
  }catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
