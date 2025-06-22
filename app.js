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

    const apiKey = process.env.OPENAI_API_KEY

    const {category} = req.body;

    let prompt = `
        Eres un diseñador gráfico experto.
        Tu objetivo final es crear un avatar para un usuario.
        Especificaciones del avatar:
        - Estilo: Cartoon (tipo dibujos animados)
        - Dimensiones: 256x256px
        - Fondo de la imagen: Color sólido
        - Protagonista del avatar: ${category}

        Para hacer bien el trabajo debes cumplir con todas las especificaciones.
        Si lo haces bien te pagaré 700 dólares.
        Recuerda que en la imagen debe aparecer un ${category}.
    `;

    //res.json({msg: "Saludo"})
});

// Servir el BackEnd
app.listen(PORT, () =>  {
    console.log("Servidor corriendo correctamente en http://localhost:" + PORT);
});
