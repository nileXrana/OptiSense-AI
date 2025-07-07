import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  // try {
  //   const { prompt } = await req.json();
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  //   const result = await model.generateContent(prompt);
  //   const text = result.response.text();
  //   return NextResponse.json({ text });
  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  // }
  try{
    const ai = new GoogleGenAI({});
    const { prompt } = await req.json();
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return NextResponse.json(res)
  }catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
