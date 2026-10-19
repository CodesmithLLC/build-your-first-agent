const MODEL = "openrouter/free";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// TODO: Make a POST request to API_URL with:
//         - an Authorization header: `Bearer ${process.env.OPENROUTER_API_KEY}`
//         - a JSON body containing:
//             model: MODEL
//             reasoning: { exclude: true }
//             messages: one user message asking for a bash command that writes
//                       today's date into hello.txt (raw command only, no markdown)

// TODO: Parse the response with await response.json()
//       If data.choices is missing, print the whole data object and stop

// TODO: Pull the command out of data.choices[0].message.content

// TODO: Print the command so you can see what's about to run

// TODO: Run it with Bun.$`sh -c ${cmd}`
