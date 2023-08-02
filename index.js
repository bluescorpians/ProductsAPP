const http = require("http");

const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/product/")) {
    res.setHeader("content-type", "text/html");
    let arr = req.url.split("/");
    let idx = arr[2];
    if (idx > 0 && idx < 31) {
      let product = data.products[idx];
      let mindex = index
        .replace("{{title}}", product.title)
        .replace("**price**", product.price)
        .replace("**rating**", product.rating)
        .replace("**url**", product.thumbnail);
      res.end(mindex);
      return;
    } else res.end("no");
    return;
  }
  res.end("404 not found");
});

server.listen(8080);
