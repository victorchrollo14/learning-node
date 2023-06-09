let http = require("http");
let url = require("url");
let fs = require("node:fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
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

server.listen(port, hostname, (err) => {
  if (err) throw err;
  console.log(`server running at ${hostname}:${port}`);
});
