const http = require("http");
const request = require("request");
require("dotenv").config();

const clientId = process.env.OAUTH_CLIENT_ID;
const secretKey = process.env.OAUTH_CLIENT_SECRET;
const server = process.env.PORT || 5000;

console.log("started server on port 5000");

http
  .createServer((req, res) => {
    var code = req.url.split("=")[1];
    if (code) {
      request.post(
        "https://github.com/login/oauth/access_token",
        {
          form: {
            client_id: clientId,
            client_secret: secretKey,
            code: code
          }
        },
        (err, r, body) => {
          res.writeHead(301, {
            Location: "http://localhost:3000?" + body
          });
          res.end();
        }
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(server);
