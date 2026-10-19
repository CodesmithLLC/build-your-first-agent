# Part 4 (stretch): Give the Agent a Real Tool

Part 3 works, but the protocol is fragile. The model returns a bash command as a plain string and we hope it didn't add commentary, backticks, or a second command. And there's no way for the model to say "I'm done, here's the answer" without us trying to run that sentence as a command.

**Tool calling** fixes this. You describe the tools the model is allowed to use. The model then responds in one of two clearly labeled ways: "I want to call this tool with these arguments" or "I'm finished, here's my answer." This is how every production agent works.

---

## How it works

Add a `tools` array to the request describing what the model can do. We give it one tool: `bash`.

The model's reply now comes in one of two shapes.

**It wants to run something:**

```json
{
  "role": "assistant",
  "content": null,
  "tool_calls": [{
    "id": "call_abc123",
    "type": "function",
    "function": { "name": "bash", "arguments": "{\"command\": \"ls -la\"}" }
  }]
}
```

**It's done:**

```json
{
  "role": "assistant",
  "content": "I created the folder and the three files. Here's what's inside..."
}
```

Your loop checks which one came back. If `tool_calls` is set, run the command and send the output back as a `"tool"` message (with the matching `tool_call_id` so the model knows which request it answers). If not, print `content` and stop.

---

## Your task

Open `agent.ts`. The `BASH_TOOL` definition is written for you. Build the same outer loop as Part 3, but inside:

1. Send `tools: [BASH_TOOL]` with every request
2. If `message.tool_calls` exists: push the message, parse the command from `tool_calls[0].function.arguments`, run it, push the result as `{ role: "tool", tool_call_id, content }`
3. Otherwise: push the message, print `message.content`, and `break`

Run it:

```bash
bun run 04-stretch-tools/agent.ts
```

Try something multi-step: `figure out what kind of project this is and summarize it in two sentences`. Watch the model run several commands and then give you a real answer.

---

## Hints

- The system prompt matters more than you'd expect. Tell the model it's running locally on the user's machine and should use the bash tool to attempt tasks rather than explaining why they might not work. Without that, models get timid.
- `` Bun.$`sh -c ${command}`.text() `` gives you stdout as a string. Add `.catch((e) => e.stderr?.toString() || e.message)` so errors come back as text instead of crashing. The model reads errors just fine.
- `JSON.parse(toolCall.function.arguments)` gives you `{ command: "..." }`.
- Not every free model supports tool calling. If you get odd results, set `MODEL` to a specific free model that lists "tools" at [openrouter.ai/models](https://openrouter.ai/models?supported_parameters=tools), or use a paid model.

---

## Pause and think

1. The model can now run as many commands as it wants before answering. What stops it from running forever? What should?
2. We gave it one tool. What would a second tool look like? (Read a file? Search the web? Send an email?) What would you refuse to give it?
3. You've now built the core of Claude Code. What's actually left between this and a product?
