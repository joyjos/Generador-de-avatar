// Importar dependencias
import express from "express";
import dotenv from "dotenv";
//import OpenAI from "openai";
import axios from "axios";

// Cargar configuración API Key
dotenv.config();

// Cargar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir FrontEnd
app.use("/", express.static("public"));

// Middleware para procesar JSON (convierto JSON a un Objeto de JavaScript)
app.use(express.json());

// Ruta para generar imágenes con IA
app.post("/api/gen-img", async(req, res) => {

    const apiKey = process.env.OPENAI_API_KEY;

    const {category} = req.body;

    let myPrompt = `
        Eres un diseñador gráfico experto.
        Tu objetivo final es crear un avatar para un ${category}.
        Especificaciones del avatar:
        - Estilo: Cartoon (tipo dibujos animados)
        - Dimensiones: 256x256px
        - Fondo de la imagen: Color sólido
        - Protagonista del avatar: ${category}
        - Formato de la imagen siempre será cuadrado o rectangular

        Para hacer bien el trabajo debes cumplir con todas las especificaciones.
        Si lo haces bien te pagaré 700 dólares.
    `;

    try {
        const response = await axios.post("https://api.openai.com/v1/images/generations", {
            model: "dall-e-2",
            prompt: myPrompt,
            n: 1,
            size: "256x256"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${apiKey}`
            }
        });

        const imageUrl = response.data.data[0].url;

        return res.json({image_url: imageUrl})
        
    } catch (error) {
        console.log("Error al generar la imagen", error);
        return res.status(500).json({error: "Error al generar avatar"});
    }

    //res.json({msg: "Saludo"})
});

// Servir el BackEnd
app.listen(PORT, () =>  {
    console.log("Servidor corriendo correctamente en http://localhost:" + PORT);
});
