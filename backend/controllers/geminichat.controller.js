const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateGeminiResponse = async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const medicalPrompt = `
        You are a professional AI medical assistant. Always respond ONLY to medical-related questions.

        If the query is not related to human health, respond with:
        > ⚠️ Sorry, I can only help with human medical-related questions.
        Now answer this:
        "${prompt}"
        `;


    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(medicalPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
    
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
};

module.exports = { generateGeminiResponse };
