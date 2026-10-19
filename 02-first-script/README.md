# Part 2: Your First Script

In Part 1 you made the request by hand and read the answer by eye. Now you'll write a short script that makes the request, pulls out the answer, and runs it. Same three steps, in JavaScript.

---

## The translation

| In the terminal | In JavaScript |
|------|------------|
| `curl` | `fetch` |
| read `choices[0].message.content` by eye | `await response.json()` then `data.choices[0].message.content` |
| copy the command and run it | `` Bun.$`sh -c ${cmd}` `` |

### `fetch`

The standard way to make an HTTP request from JavaScript. It mirrors `curl` exactly: a URL, a method, headers, a body.

```js
const response = await fetch("https://example.com/api", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "value" }),
});
const data = await response.json();
```

`await` means "wait for this to finish." `response.json()` turns the reply into a regular JavaScript object you can walk with dots and brackets.

### `Bun.$`

Bun's built-in shell. It runs a command from inside your script:

```js
await Bun.$`echo hello`;
await Bun.$`sh -c ${someString}`;
```

The backticks are a tagged template. Bun handles escaping, so a `${variable}` inside is safe to pass as a single argument.

---

## Your task

Open `agent.ts`. The TODOs walk you through it:

1. `fetch` the OpenRouter endpoint with the same body as Part 1, Step 6
2. Parse the JSON and pull out `data.choices[0].message.content`
3. Print the command so you can see it
4. Run it with `Bun.$`

Run it:

```bash
bun run 02-first-script/agent.ts
```

You should see the command printed, then a `hello.txt` file should appear with today's date in it. Check with `cat hello.txt`.

---

## Hints

- Header: `` Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` ``. Bun loads `.env` automatically, so no `export` needed.
- Don't forget `reasoning: { exclude: true }` next to `model` and `messages`.
- If the script runs and nothing happens, `console.log(data)` to see what came back. Free models sometimes return an error object instead of `choices`.
- The model will sometimes wrap the command in markdown backticks even when told not to. That's not your bug. Run it again, or note it as a problem to solve in Part 3.

---

## Pause and think

1. What happens if the model returns a bad command? Right now, what does your script do about it?
2. Where in the script would you add a "are you sure?" prompt before running the command?

Swap driver and navigator. Go to [Part 3](../03-the-loop/README.md).
