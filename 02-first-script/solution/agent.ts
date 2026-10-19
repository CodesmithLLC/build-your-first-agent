const MODEL = "openrouter/free";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const response = await fetch(API_URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL,
    reasoning: { exclude: true },
    messages: [
      {
        role: "user",
        content:
          "Return only a bash command that writes today's date into a file called hello.txt. Output the raw command only. No markdown, no backticks, no explanation.",
      },
    ],
  }),
});

const data = await response.json();

if (!data.choices) {
  console.error("API error:", JSON.stringify(data, null, 2));
  process.exit(1);
}

const cmd = data.choices[0].message.content.trim();

console.log(`> Running: ${cmd}`);
await Bun.$`sh -c ${cmd}`;
