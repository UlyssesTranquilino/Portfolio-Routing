const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "index.html" : req.url.substring(1);
  let extname = path.extname(filePath);

  let contentType = "text/html";
  if (extname === ".css") contentType = "text/css";
  if (extname === ".js") contentType = "text/javascript";
  if (extname === ".png") contentType = "image/png";
  if (extname === ".jpg") contentType = "image/jpeg";
  if (extname === ".ico") contentType = "image/x-icon";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Serve the 404 page instead
      fs.readFile("Error/404.html", (err404, data404) => {
        if (err404) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>500 Internal Server Error</h1>");
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data404);
        }
      });
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000");
});
