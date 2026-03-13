import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  streamOllamaChat,
  TSGABRIELLE_SYSTEM_PROMPT,
  pingOllama,
  type OllamaMessage,
} from "@/lib/ollama";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Rate limiting: 20 requests per minute per IP
  const ip = getClientIp(req);
  const rl = rateLimit(ip, { maxRequests: 20, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let messages: OllamaMessage[];
  try {
    const body = await req.json();
    if (!Array.isArray(body.messages)) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }
    messages = body.messages as OllamaMessage[];
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Prepend system prompt
  const fullMessages: OllamaMessage[] = [
    { role: "system", content: TSGABRIELLE_SYSTEM_PROMPT },
    ...messages.filter((m) => m.role !== "system"),
  ];

  // Check Ollama health first
  const alive = await pingOllama();
  if (!alive) {
    return NextResponse.json(
      { error: "AI assistant is temporarily unavailable. Please try again shortly." },
      { status: 503 }
    );
  }

  // Stream response
  try {
    const ollamaStream = await streamOllamaChat(fullMessages);

    // Transform Ollama NDJSON stream → plain text SSE stream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = ollamaStream.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.trim()) continue;
              try {
                const chunk = JSON.parse(line);
                if (chunk.message?.content) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content: chunk.message.content })}\n\n`)
                  );
                }
                if (chunk.done) {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                }
              } catch {
                // skip malformed JSON lines
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[AI chat error]", err);
    return NextResponse.json(
      { error: "AI request failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const alive = await pingOllama();
  return NextResponse.json({ status: alive ? "ok" : "unavailable" });
}
