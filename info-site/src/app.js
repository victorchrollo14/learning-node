import http from "node:http";
import url from "node:url";
import fs from "node:fs";
import { getPlayerData } from "./queryData.js";
import { routing } from "./routers.js";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === "POST") {
    console.log("form got submitted lol");
    handleForm(req, res);

    return;
  }

  if (req.url === "/error.webp") {
    let contentType = "image/webp";
    res.setHeader("Content-Type", contentType);
    const stream = fs.createReadStream("error.webp");
    stream.pipe(res);

    res.on("finish", () => {
      stream.destroy();
    });
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let q = url.parse(req.url, true);
  let html = routing(q.pathname);
  console.log(html);
  fs.readFile(html, (err, data) => {
    res.setHeader("Content-Type", "text/html");

    if (err) throw err;
    res.statusCode = 200;
    res.write(data);
    res.end();
  });
});

const startServer = (port) => {
  server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
  });

  server.on("error", (error) => {
    console.error("Error starting the server:", error);
    // Attempt to listen on a different port
    startServer(port + 1);
  });
};

startServer(port);

function handleForm(request, res) {
  let body = "";
  let playerData;
  request.on("data", (chunk) => {
    body += chunk.toString();
  });

  request.on("end", async () => {
    const formData = new URLSearchParams(body);
    const player = formData.get("playername");

    playerData = await getPlayerData(player);

    if (playerData) {
      let htmlFile = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          body{
            background:black;
            color:white;
          }
        </style>
      </head>
      <!-- component -->
      <body >
           <div>
            <h1>name : ${playerData.name}</h1>
            <h2>country : ${playerData.country}</h2>
            <h2>Goals : ${playerData.goals}</h2>
            <h2>Trophies: ${playerData.trophies}</h2>
            <h2>netWorth : ${playerData.netWorth}</h2>
           </div>
      </body>
    </html>
    `;
      res.writeHead(302, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }

    if (!playerData) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Player Not Found");
    }
  });
}
