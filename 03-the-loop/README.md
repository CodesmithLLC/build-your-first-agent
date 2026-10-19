# Part 3: The Loop

Part 2 made one request and ran the result. If the command failed, the script crashed. If the model wrapped the command in backticks, the script crashed. One shot, no memory.

This part adds the two things that turn a script into an agent: **memory** (a list of messages that grows every turn) and **retry** (a loop that feeds failures back to the model until it gets it right).

---

## Messages are memory

Every API call sends the whole conversation. The model remembers nothing between calls. It only knows what's in the `messages` array you send.

So "memory" is just an array you keep adding to:

```js
const messages = [
  { role: "system", content: "..." },     // standing instructions
  { role: "user", content: "..." },       // what the person asked
  { role: "assistant", content: "..." },  // what the model said
  { role: "user", content: "..." },       // the next message
];
```

A `"system"` message is instructions that apply to the whole conversation. The model treats it as ground rules.

When a command fails, you push the error into `messages` as if a person had said it. On the next loop the model sees its own mistake and tries something else. That's retry.

---

## Reading from the keyboard

Bun lets you read typed input line by line:

```js
for await (const line of console) {
  // line is whatever the person typed before hitting enter
}
```

The script stays open, waiting. Each line you type runs one trip through the loop.

---

## Your task

Open `agent.ts` and build:

1. A `messages` array with a `system` message telling the model to return only raw bash commands (no markdown, no backticks, no explanation)
2. A `for await (const line of console)` loop
3. Inside it: push the typed line as a `user` message, then start a `while (true)` loop
4. Inside the while loop: call the API with the full `messages` array, push the reply, try to run it
5. If the command succeeds, `break`
6. If it fails, push the error back as a `user` message and go around again
7. Cap the retries at 3 so a confused model can't loop forever

Run it:

```bash
bun run 03-the-loop/agent.ts
```

Type an instruction in plain English and hit enter. Try:

- `create a folder called notes with three empty text files in it`
- `count how many lines are in README.md`
- `show me the five largest files in this directory`

Then type a follow-up that depends on the last one. The agent remembers.

To quit: Ctrl+C.

---

## Hints

- `data.choices[0].message` is the whole message object. Push that, not just the content string. The API expects `role` and `content`.
- Wrap the `Bun.$` call in `try`/`catch`. Inside `catch`, `error.message` has the text to send back.
- The `for await` loop and the `while (true)` loop are nested: the while lives inside the for.
- Free models sometimes ignore the system prompt and return ```` ```bash ```` fences. A one-liner that strips them is in the solution. Decide with your partner whether you'd rather strip them or let the retry loop handle it. (Real agent frameworks do both.)

---

## Pause and think

1. You just built retry by turning an error into a message. What else could you turn into a message? (Hint: the output of a successful command.)
2. The `messages` array grows forever. What eventually breaks? What would you do about it?
3. Right now the model's only tool is "run a bash string." Why might that be a bad protocol? What would a better one look like?

If you have time, swap and go to [Part 4](../04-stretch-tools/README.md). If not, you've built an agent. Stop here and talk through the questions above.
