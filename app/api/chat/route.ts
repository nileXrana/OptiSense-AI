import { NextRequest, NextResponse } from "next/server";
import genAI from "@/lib/geminiClient";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return NextResponse.json({ text });
}
