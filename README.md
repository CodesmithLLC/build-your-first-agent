# Build Your First AI Agent

Codesmith x Yale Graduate Pilot, Workshop 1

In the next 50 minutes you'll go from a single terminal command to a working AI agent that runs commands on your computer, remembers what it did, and retries when it fails. About 20 lines of code.

By the end you'll understand exactly how tools like Claude Code, Cursor, and ChatGPT agents work under the hood, because you'll have built the same architecture yourself.

---

## What an agent actually is

An AI agent is a program that:

1. Takes a goal in plain English
2. Asks a model what to do next
3. Does it (runs a command, reads a file, calls an API)
4. Feeds the result back to the model
5. Repeats until the goal is done

That's the whole idea. The sophistication comes from the loop, the message history, and the tools you give it. No magic.

---

## Get the code

```bash
git clone https://github.com/CodesmithLLC/build-your-first-agent.git
cd build-your-first-agent
```

No git? Click the green **Code** button on GitHub, choose **Download ZIP**, and unzip it.

## Before you start

You need two things: the Bun runtime and an OpenRouter API key. Both are free. If you did the pre-workshop setup, skip to Part 1. If not, open [`00-setup/README.md`](00-setup/README.md) now. It takes about five minutes.

**If setup isn't working for you**, don't burn the hour on it. Pair with someone whose machine works. You'll get everything out of the exercise as the navigator.

---

## The parts

Work through them in order. Each folder has a `README.md` with instructions and a `solution/` folder if you get stuck.

```
00-setup/          Bun + API key (5 min, do this before the workshop)
01-talk-to-a-model/   Talk to a model from your terminal. No code.
02-first-script/      Move it into a script that runs the model's answer.
03-the-loop/          Add memory and retry. This is the agent.
04-stretch-tools/     Stretch: give the agent a real tool.
```

**Pairing:** one person drives (types), one navigates (reads, thinks, catches mistakes). Swap at the start of each part.

---

## Running your code

Parts 02 through 04 each have an `agent.ts` you run directly:

```bash
bun run 02-first-script/agent.ts
bun run 03-the-loop/agent.ts
bun run 04-stretch-tools/agent.ts
```

---

## A note on safety

Part 2 onward takes text written by a model and runs it as a command on your machine. That is the point of the exercise, and it's also why real agent products ask for confirmation before acting. We print every command before it runs so you can see what's happening. Keep an eye on it. If something looks wrong, Ctrl+C stops the script.

---

## After the workshop

Keep this repo. It's the seed of a portfolio piece: push it to your GitHub, add a short write-up of what you built and what surprised you, and you have something concrete to point at when someone asks "have you worked with AI?"
