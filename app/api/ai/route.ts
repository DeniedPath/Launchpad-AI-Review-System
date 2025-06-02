import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, assignment } = await req.json();

  const API_KEY = process.env.NEXT_PUBLIC_PLAYLAB_API_KEY!;
  const PROJECT_ID = process.env.NEXT_PUBLIC_PLAYLAB_PROJECT_ID!;
  const BASE_URL = "https://www.playlab.ai/api/v1";

  // Step 1: Create conversation
  const conversationRes = await fetch(`${BASE_URL}/projects/${PROJECT_ID}/conversations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!conversationRes.ok) {
    const text = await conversationRes.text();
    console.error("Conversation creation failed:", text);
    return NextResponse.json({ feedback: "Could not start conversation." }, { status: 500 });
  }

  const { conversation } = await conversationRes.json();

  // Step 2: Send message (expect streaming response)
  const userPrompt = `Assignment: ${assignment}\n\nStudent code:\n${code}\n\nProvide structured feedback in plain text. Format as: Feedback, Rubric, Rating, Notes. Do not include code.`;

  const messageRes = await fetch(`${BASE_URL}/projects/${PROJECT_ID}/conversations/${conversation.id}/messages`, {
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

  if (!messageRes.ok || !messageRes.body) {
    const text = await messageRes.text();
    console.error("Message sending failed:", text);
    return NextResponse.json({ feedback: "Could not send message." }, { status: 500 });
  }

  // Step 3: Read the SSE stream
  const reader = messageRes.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullResponse = "";
  let done = false;

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;

    if (value) {
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          try {
            const json = JSON.parse(line.replace("data: ", ""));
            if (json?.delta) {
              fullResponse += json.delta;
            }
          } catch {
            // Ignore invalid lines
          }
        }
      }
    }
  }

  return NextResponse.json({ feedback: fullResponse || "No response received." });
}
