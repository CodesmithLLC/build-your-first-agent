# Part 1: Talk to a Model

No code yet. You're going to talk to an AI model the way every app does: with a raw HTTP request. Build the command up one piece at a time and read each error. The errors are the lesson.

Make sure you've run `export OPENROUTER_API_KEY=...` in this terminal window (see Part 0).

---

## Step 1: Hit the endpoint

Every chat model you've ever used lives behind a URL like this one:

```bash
curl https://openrouter.ai/api/v1/chat/completions
```

You'll get:

```json
{ "error": { "message": "Not Found", "code": 404 } }
```

Not because the URL is wrong. `curl` sends a GET request by default, and this endpoint only accepts POST. The server is rejecting the method, not the address.

---

## Step 2: Make it a POST

`-d` attaches a body, which switches the method to POST. Send an empty body:

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -d '{}'
```

New error:

```json
{ "error": { "message": "No cookie auth credentials found", "code": 401 } }
```

Progress. The server sees the request. It just doesn't know who you are.

> The `\` at the end of a line continues the command on the next line.

---

## Step 3: Identify yourself

Headers carry metadata about a request. `-H` adds one. Your key goes in the `Authorization` header:

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{"model": "openrouter/free", "reasoning": {"exclude": true}}'
```

Two new fields in the body:

- **`model`**: which model to use. `openrouter/free` routes to whatever free model is available right now. Swap in `anthropic/claude-sonnet-4-5` or `openai/gpt-4o` if you have credits.
- **`reasoning: {"exclude": true}`**: some free models "think out loud" before answering and that can arrive as a `null` reply. This tells the API to send only the final answer.

Another error:

```json
{ "error": { "message": "Input required: specify \"prompt\" or \"messages\"", "code": 400 } }
```

You're authenticated. The API just wants to know what to say to the model.

---

## Step 4: Say something

`messages` is an array of objects, each with a `role` and `content`. `"user"` means a human is speaking:

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{"model": "openrouter/free",
       "reasoning": {"exclude": true},
       "messages": [{"role": "user", "content": "Say hello in five words or fewer."}]}'
```

A big JSON blob comes back. That's a real reply from a real model. You did it.

---

## Step 5: Find the reply

Buried in the blob is the model's answer. Simplified:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Hello there, how are you?"
      }
    }
  ]
}
```

The text lives at `choices[0].message.content`. The model's reply is labeled `"assistant"`, mirroring your `"user"`.

---

## Step 6: Ask for something useful

Now ask the model for a command you could actually run. Tell it to return only the command:

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{"model": "openrouter/free",
       "reasoning": {"exclude": true},
       "messages": [{
         "role": "user",
         "content": "Return only a bash command that writes today'"'"'s date into a file called hello.txt. Output the raw command only. No markdown, no backticks, no explanation."
       }]}'
```

Find `choices[0].message.content` in the response. That's a command a model just wrote for you. In Part 2 you'll extract it automatically and run it.

> That odd `'"'"'` in the middle is how you put an apostrophe inside a single-quoted bash string. It's ugly. That ugliness is one reason Part 2 moves to a real language.

---

## Pause and think

1. The model never saw your previous `curl` commands. How do you think ChatGPT "remembers" earlier messages in a conversation?
2. Why is the response wrapped in a `choices` array instead of just returning the message?
3. You just got a bash command out of a model. What could go wrong if you ran it blindly?

Swap driver and navigator. Go to [Part 2](../02-first-script/README.md).
