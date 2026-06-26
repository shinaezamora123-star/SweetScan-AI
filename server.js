import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    console.log("Mensaje recibido:", req.body.message);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres Dulce Bot 🍬, una IA dulce y amigable."
        },
        {
          role: "user",
          content: req.body.message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

catch (error) {
  console.error("ERROR COMPLETO:", error.message);

  res.status(500).json({
    reply: "❌ " + error.message
  });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
