import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      reply: response.text,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "AI Error",
    });
  }
};
export const summarizeChat = async (req, res) => {
  try {
    const { messages } = req.body;

    const prompt = `
Summarize the following conversation in 5 short bullet points.

${messages
  .map((msg) => `${msg.sender}: ${msg.text}`)
  .join("\n")}
`;

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

res.status(200).json({
  summary: response.text,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Summary failed",
    });
  }
};
export const translateMessage = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
Translate the following message into English.
Return only the translated text.

Message:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      translation: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Translation failed",
    });
  }
};