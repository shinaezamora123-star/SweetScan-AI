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
  const message = req.body.message;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Eres Dulce Bot 🍬, una IA dulce, amigable y creativa."
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  res.json({
    reply: response.choices[0].message.content
  });
});

app.listen(3000, () => console.log("Servidor activo 🍬"));
