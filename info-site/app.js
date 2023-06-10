import http from "node:http";
import url from "node:url";
import fs from "node:fs";
import querySting from "querystring";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === "POST") {
    console.log("form got submitted lol");
    handleForm(req, res);

    res.writeHead(302, { Location: "/index.html" });
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let q = url.parse(req.url, true);
  let html = `.${q.pathname}`;
  console.log(html);
  fs.readFile(html, (err, data) => {
    res.setHeader("Content-Type", "text/html");

    if (err) {
      res.statusCode = 404;
      return res.end("404 not found");
    }
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
  request.on("data", (chunk) => {
    body += chunk.toString();
  });

  request.on("end", () => {
    const formData = new URLSearchParams(body);
    const player = formData.get("playername");
    console.log(player);
  });
}
