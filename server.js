import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Cambiamos el puerto dinámico de Icecast al que Render permite
const port = process.env.PORT || 10000;

// Creamos una copia del XML con el puerto correcto
exec(`sed 's|<port>8000</port>|<port>${port}</port>|' ${path.join(__dirname, "icecast.xml")} > ${path.join(__dirname, "icecast_render.xml")}`, 
  (err) => {
    if (err) console.error("Error generando config:", err);
    else {
      // Iniciamos Icecast con la nueva config
      exec(`apt-get update && apt-get install -y icecast2 && icecast2 -c ${path.join(__dirname, "icecast_render.xml")}`, 
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al iniciar Icecast: ${error.message}`);
            return;
          }
          if (stderr) console.error(`ICECAST stderr: ${stderr}`);
          console.log(`ICECAST stdout: ${stdout}`);
        });
    }
  });

app.get("/", (req, res) => res.send("🎧 Servidor Icecast ejecutándose en Render (puerto redirigido)."));
app.listen(port, () => console.log(`Servidor Node iniciado en puerto ${port} 🎚️`));
