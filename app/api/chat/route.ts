import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string" || message.length > 300) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const chatSecret = process.env.CHAT_SECRET;

    if (!webhookUrl) {
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Server-side secret — never exposed to the browser
        "X-Chat-Secret": chatSecret ?? "",
      },
      body: JSON.stringify({
        message,
        sessionId,
        timestamp: Date.now(),
      }),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }

    const raw = await upstream.json();

    // n8n can return either an object or an array of objects
    const data = Array.isArray(raw) ? raw[0] : raw;

    const reply =
      data?.reply ?? data?.output ?? data?.text ?? data?.message ?? "No response";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
