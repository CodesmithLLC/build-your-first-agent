const MODEL = "openrouter/free";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_STEPS = 10;

const BASH_TOOL = {
  type: "function",
  function: {
    name: "bash",
    description: "Run a bash command on the local machine and return its output",
    parameters: {
      type: "object",
      properties: { command: { type: "string", description: "The bash command to execute" } },
      required: ["command"],
    },
  },
};

const messages: any[] = [
  {
    role: "system",
    content:
      "You are an agent running locally on the user's machine with full access to their filesystem and installed tools. Always use the bash tool to attempt tasks. Never explain why something might not work, just try it. When you are done, give a brief plain text summary of what you did and what you found.",
  },
];

console.log("What should I do? (Ctrl+C to quit)");

for await (const line of console) {
  if (!line.trim()) continue;
  messages.push({ role: "user", content: line });

  for (let step = 1; step <= MAX_STEPS; step++) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, reasoning: { exclude: true }, messages, tools: [BASH_TOOL] }),
    });

    const data = await response.json();

    if (!data.choices) {
      console.error("API error:", JSON.stringify(data, null, 2));
      break;
    }

    const message = data.choices[0].message;
    messages.push(message);

    if (message.tool_calls) {
      const toolCall = message.tool_calls[0];
      const { command } = JSON.parse(toolCall.function.arguments);
      console.log(`> Running: ${command}`);
      const result = await Bun.$`sh -c ${command}`
        .text()
        .catch((e: any) => e.stderr?.toString() || e.message);
      messages.push({ role: "tool", tool_call_id: toolCall.id, content: result });
    } else {
      console.log(message.content);
      break;
    }
  }

  console.log("\nWhat next?");
}
