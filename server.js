import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ejecutamos icecast manualmente
exec(`apt-get update && apt-get install -y icecast2 && icecast2 -c ${path.join(__dirname, "icecast.xml")}`, 
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al iniciar Icecast: ${error.message}`);
      return;
    }
    if (stderr) console.error(`ICECAST stderr: ${stderr}`);
    console.log(`ICECAST stdout: ${stdout}`);
  });

app.get("/", (req, res) => res.send("🎧 Servidor Icecast ejecutándose en Render!"));
app.listen(process.env.PORT || 10000, () => console.log("Servidor Node iniciado 🎚️"));
