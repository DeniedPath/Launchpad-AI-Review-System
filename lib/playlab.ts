// lib/playlab.ts
export async function getAIReview({
  code,
  assignment,
}: {
  code: string;
  assignment: string;
}) {
  const response = await fetch(process.env.NEXT_PUBLIC_PLAYLAB_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLAYLAB_API_KEY}`,
      "X-Project-ID": process.env.NEXT_PUBLIC_PLAYLAB_PROJECT_ID!,
    },
    body: JSON.stringify({
      prompt: `Assignment: ${assignment}\n\nStudent code:\n${code}\n\nProvide structured feedback in plain text. Format as: Feedback, Rubric, Rating, Notes. Do not include code.`,
      model: "claude-3.7-sonnet", // Adjust if Playlab uses different model identifiers
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error("Failed to get AI feedback");

  const data = await response.json();
  return data.choices?.[0]?.text ?? "No feedback generated.";
}
