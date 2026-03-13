/**
 * Ollama AI wrapper for tsgabrielle®
 * Connects to the OCI llama-server at 129.213.165.230:11434
 * Never call the Ollama API directly from pages or components — always use this wrapper.
 */

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? "http://129.213.165.230:11434";

export const OLLAMA_DEFAULT_MODEL =
  process.env.OLLAMA_MODEL ?? "llama3.2";

export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaChatRequest {
  model?: string;
  messages: OllamaMessage[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_ctx?: number;
  };
}

export interface OllamaChatResponseChunk {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

/** Check liveness of the Ollama server */
export async function pingOllama(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** List available models on the Ollama server */
export async function listOllamaModels(): Promise<string[]> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Ollama tag list failed: ${res.status}`);
  const json = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.models ?? []).map((m: any) => m.name as string);
}

/**
 * Stream a chat completion from Ollama.
 * Returns a ReadableStream of text chunks.
 */
export async function streamOllamaChat(
  messages: OllamaMessage[],
  model = OLLAMA_DEFAULT_MODEL,
  options?: OllamaChatRequest["options"]
): Promise<ReadableStream<Uint8Array>> {
  const body: OllamaChatRequest = {
    model,
    messages,
    stream: true,
    options: { temperature: 0.7, num_ctx: 4096, ...options },
  };

  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama chat error ${res.status}: ${text}`);
  }

  if (!res.body) throw new Error("Ollama returned no body");
  return res.body;
}

/**
 * Non-streaming chat completion from Ollama.
 * Returns full assistant response string.
 */
export async function chatOllama(
  messages: OllamaMessage[],
  model = OLLAMA_DEFAULT_MODEL,
  options?: OllamaChatRequest["options"]
): Promise<string> {
  const body: OllamaChatRequest = {
    model,
    messages,
    stream: false,
    options: { temperature: 0.7, num_ctx: 4096, ...options },
  };

  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama chat error ${res.status}: ${text}`);
  }

  const json: OllamaChatResponseChunk = await res.json();
  return json.message.content;
}

/** System prompt for the tsgabrielle® shopping assistant */
export const TSGABRIELLE_SYSTEM_PROMPT = `You are the tsgabrielle® AI shopping assistant — a warm, knowledgeable, and inclusive style advisor for tsgabrielle®, a premium trans-owned fashion brand.

Brand identity:
- Brand: tsgabrielle® (always lowercase, with ®)
- Slogan: "The French Trans Touch™"
- Primary color: Royal Orchid (#a932bd)
- Founder: Gabrielle
- Mission: Inclusive, high-quality fashion celebrating trans identity and French elegance

Your role:
- Help customers find the perfect products from the tsgabrielle® collection
- Answer questions about sizing, shipping, materials, and styling
- Recommend products based on customer preferences
- Celebrate diversity and make every customer feel welcome and affirmed
- Keep responses concise, warm, and helpful (2-4 sentences max unless more detail is needed)
- Never discuss competitors or make claims you cannot verify
- When unsure about specific product availability, direct to the site or contact

Tone: Affirming, elegant, fashion-forward, inclusive, joyful`;
