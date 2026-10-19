const MODEL = "openrouter/free";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_RETRIES = 3;

const messages: { role: string; content: string }[] = [
  {
    role: "system",
    content:
      "You are a bash assistant. Reply with exactly one bash command that accomplishes the user's request. Output the raw command only. No markdown, no backticks, no explanation.",
  },
];

// Free models sometimes ignore the system prompt and wrap the command in ``` fences.
// Strip them so the retry loop doesn't waste a turn on formatting.
const clean = (text: string) =>
  text
    .replace(/```[a-z]*\n?/g, "")
    .replace(/```/g, "")
    .trim();

console.log("What should I do? (Ctrl+C to quit)");

for await (const line of console) {
  if (!line.trim()) continue;
  messages.push({ role: "user", content: line });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, reasoning: { exclude: true }, messages }),
    });

    const data = await response.json();

    if (!data.choices) {
      console.error("API error:", JSON.stringify(data, null, 2));
      break;
    }

    const message = data.choices[0].message;
    messages.push(message);

    const cmd = clean(message.content ?? "");
    console.log(`> Running: ${cmd}`);

    try {
      await Bun.$`sh -c ${cmd}`;
      console.log("✓ done");
      break;
    } catch (error: any) {
      const detail = error.stderr?.toString().trim() || error.message;
      console.log(`✗ failed (attempt ${attempt}/${MAX_RETRIES}): ${detail}`);
      messages.push({ role: "user", content: `Command failed with this error, try a different approach: ${detail}` });
    }
  }

  console.log("\nWhat next?");
}
