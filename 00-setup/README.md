# Part 0: Setup

Two things, five minutes. Do this before the workshop if you can.

---

## 1. Install Bun

Bun is a JavaScript runtime. It runs TypeScript directly, has a built-in shell, and reads `.env` files on its own, so we need nothing else.

**macOS or Linux:**

```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:** install WSL first (Windows Subsystem for Linux), then run the macOS/Linux command inside it. Open PowerShell as administrator and run:

```powershell
wsl --install
```

Restart when it asks, open the "Ubuntu" app from the Start menu, and run the Bun install command there. Everything else in this workshop happens in that Ubuntu terminal.

**Verify:**

```bash
bun --version
```

You should see a version number like `1.x.x`. If you see "command not found," close and reopen your terminal and try again.

---

## 2. Get an OpenRouter API key

OpenRouter gives you one API that talks to many models (Claude, GPT, Gemini, and free open models). We'll use it because it has a free tier, so nobody needs a credit card.

1. Go to [openrouter.ai](https://openrouter.ai) and create a free account.
2. Click your profile icon, then **Keys**, then **Create API Key**.
3. Name it anything (`yale-workshop` works) and click **Create**.
4. Copy the key. It starts with `sk-or-v1-...`. You won't be able to see it again, so paste it somewhere safe.

**Free models have limits.** The free tier is rate limited and occasionally slow. That's fine for this workshop. If you ever want to use a top-tier model, a few dollars of credit covers hundreds of requests.

---

## 3. Put the key where the code can find it

In the root of this repo:

```bash
cp .env.example .env
```

Open `.env` and replace `your_key_here` with your key:

```
OPENROUTER_API_KEY=sk-or-v1-...your-key...
```

Bun reads this file automatically when you run a script. Never commit `.env` to git (it's already in `.gitignore`).

For Part 1, which uses the terminal directly, you also need the key in your shell:

```bash
export OPENROUTER_API_KEY=sk-or-v1-...your-key...
```

You'll need to run that once per terminal window.

---

## 4. Check it works

```bash
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

Good:

```json
{ "data": { "label": "yale-workshop", "is_free_tier": true, ... } }
```

Not good:

```json
{ "error": { "message": "Missing Authentication header", "code": 401 } }
```

That means the `export` didn't take in this terminal window. Run it again and retry.

If you see `curl: (6) Could not resolve host`, check your internet connection.

---

You're ready. Go to [Part 1](../01-talk-to-a-model/README.md).
