import express from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const icecast = spawn("icecast", ["-c", path.join(__dirname, "icecast.xml")]);

icecast.stdout.on("data", data => console.log(`ICECAST: ${data}`));
icecast.stderr.on("data", data => console.error(`ICECAST ERROR: ${data}`));

app.get("/", (req, res) => res.send("Servidor Icecast activo 🎧"));

app.listen(process.env.PORT || 10000, () => {
  console.log("Servidor Node iniciado 🎚️");
});
