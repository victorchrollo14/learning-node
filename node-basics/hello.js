let http = require("http");
let url = require("url");
let fs = require("fs");

const adr = 'http://localhost:8080/default.htm?year=2017&month=february'
let q = url.parse(adr, true)

console.log(q.host, q.pathname, q.search, q.hostname)


// fs.appendFile("value.json", '{"gender":"male"}', function (err) {
//   if (err) throw err;
//   console.log("Updated!");
// });

// fs.rename("value.json", "object.json", (err) => {
//   if (err) throw err;
//   console.log("renamed");
// });

// http
//   .createServer(function (req, res) {
//     fs.readFile("value.json", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/json" });
//       res.write(data);
//       res.end();
//     });
//   })
//   .listen(4000);
