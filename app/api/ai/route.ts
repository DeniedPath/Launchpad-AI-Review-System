import { NextResponse } from "next/server";

async function createConversation(BASE_URL: string, PROJECT_ID: string, API_KEY: string) {
  const res = await fetch(`${BASE_URL}/projects/${PROJECT_ID}/conversations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Conversation creation failed:", text);
    return null;
  }
  const { conversation } = await res.json();
  return conversation;
}

async function sendMessage(BASE_URL: string, PROJECT_ID: string, API_KEY: string, conversationId: string, userPrompt: string) {
  const res = await fetch(`${BASE_URL}/projects/${PROJECT_ID}/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: {
        message: userPrompt,
      },
    }),
  });
  if (!res.ok || !res.body) {
    const text = await res.text();
    console.error("Message sending failed:", text);
    return null;
  }
  return res.body;
}

function extractDeltaFromLine(line: string): string {
  if (!line.startsWith("data:")) return "";
  try {
    const json = JSON.parse(line.replace("data: ", ""));
    return json?.delta ?? "";
  } catch {
    // Ignore invalid lines
    return "";
  }
}

function processChunk(chunk: string): string {
  return chunk
    .split("\n")
    .map(extractDeltaFromLine)
    .filter(Boolean)
    .join("");
}

async function readSSEStream(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8");
  let fullResponse = "";
  let done = false;

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;
    if (value) {
      const chunk = decoder.decode(value);
      fullResponse += processChunk(chunk);
    }
  }
  return fullResponse;
}

export async function POST(req: Request) {
  const { code, assignment } = await req.json();

  const API_KEY = process.env.NEXT_PUBLIC_PLAYLAB_API_KEY!;
  const PROJECT_ID = process.env.NEXT_PUBLIC_PLAYLAB_PROJECT_ID!;
  const BASE_URL = "https://www.playlab.ai/api/v1";

  // Step 1: Create conversation
  const conversation = await createConversation(BASE_URL, PROJECT_ID, API_KEY);
  if (!conversation) {
    return NextResponse.json({ feedback: "Could not start conversation." }, { status: 500 });
  }

  // Step 2: Send message (expect streaming response)
  const userPrompt = `Assignment: ${assignment}\n\nStudent code:\n${code}\n\nProvide structured feedback in plain text. Format as: Feedback, Rubric, Rating, Notes. Do not include code.`;
  const messageBody = await sendMessage(BASE_URL, PROJECT_ID, API_KEY, conversation.id, userPrompt);
  if (!messageBody) {
    return NextResponse.json({ feedback: "Could not send message." }, { status: 500 });
  }

  // Step 3: Read the SSE stream
  const fullResponse = await readSSEStream(messageBody);

  return NextResponse.json({ feedback: fullResponse || "No response received." });
}
