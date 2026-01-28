import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { text, personality } = req.body;
  if (!text || !personality) return res.status(400).json({ error: "Missing fields" });

  try {
    const prompt = `
You are a texting assistant app called "Did I Say That".
Rewrite this message to keep the original meaning but match the user's personality: ${personality}.
Text: "${text}"
`;

    const response = await client.responses.create({
      model: "gpt-5.2",
      input: prompt
    });

    res.status(200).json({ result: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
}
