import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.message;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(
      `Eres Dulce Bot 🍬, una IA dulce y amigable.

Usuario: ${mensaje}`
    );

    const respuesta = result.response.text();

    res.json({
      reply: respuesta
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
  console.log(`Servidor activo en puerto ${PORT}`);
});
