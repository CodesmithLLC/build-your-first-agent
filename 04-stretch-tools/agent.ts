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

// TODO: Create a messages array with a system message.
//       Tell the model it's running locally on the user's machine, that it should use the bash
//       tool to attempt tasks instead of explaining why they might not work, and that when it's
//       done it should give a short plain-text summary.

// TODO: Start a `for await (const line of console)` loop
//   TODO: Skip blank lines, then push { role: "user", content: line } onto messages
//   TODO: Loop up to MAX_STEPS times:
//     TODO: POST to API_URL with { model: MODEL, reasoning: { exclude: true }, messages, tools: [BASH_TOOL] }
//     TODO: const message = data.choices[0].message
//     TODO: if (message.tool_calls):
//             - push message onto messages
//             - const toolCall = message.tool_calls[0]
//             - const { command } = JSON.parse(toolCall.function.arguments)
//             - print the command, then run it:
//                 const result = await Bun.$`sh -c ${command}`.text().catch((e) => e.stderr?.toString() || e.message)
//             - push { role: "tool", tool_call_id: toolCall.id, content: result }
//           else:
//             - push message onto messages
//             - print message.content
//             - break
