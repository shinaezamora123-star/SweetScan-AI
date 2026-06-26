import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.message;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Eres Dulce Bot 🍬.

Reglas:
- Hablas en español.
- Eres dulce, amigable y divertida.
- NO uses asteriscos (*) ni markdown.
- Usa guiones si necesitas listas.
- Responde claro, natural y no muy largo.
- Usa emojis suaves.
- Mantén tono positivo.

Usuario: ${mensaje}

Dulce Bot:
`;

    const result = await model.generateContent(prompt);
    const respuesta = result.response.text();

    const cleaned = respuesta.replace(/\*/g, "");

    res.json({
      reply: cleaned
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "❌ Error con Gemini: " + error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor activo 🍬 en puerto ${PORT}`);
});
