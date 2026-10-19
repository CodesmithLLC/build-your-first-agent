const MODEL = "openrouter/free";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_RETRIES = 3;

// TODO: Create a messages array with one system message.
//       Tell the model: return only raw bash commands. No markdown, no backticks, no explanation.

// TODO: Start a `for await (const line of console)` loop to read what the person types

//   TODO: Skip blank lines, then push { role: "user", content: line } onto messages

//   TODO: Loop up to MAX_RETRIES times:
//     TODO: POST to API_URL with { model: MODEL, reasoning: { exclude: true }, messages }
//           (same fetch as Part 2, but send the whole messages array)
//     TODO: const message = data.choices[0].message
//     TODO: Push message onto messages (the whole object, not just the content)
//     TODO: try: run message.content with Bun.$`sh -c ${...}`, print a checkmark, and break
//     TODO: catch: push { role: "user", content: `Command failed: ${error.message}` } and continue
