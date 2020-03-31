const http = require("http");
const request = require("request");
require("dotenv").config();

const clientId = process.env.REACT_APP_CLIENT_ID;
const secretKey = process.env.REACT_APP_SECRET_KEY;
const serverPort = 5000;
const port = process.env.PORT || serverPort;

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
            Location: "https://githubbychinh.herokuapp.com?" + body
          });
          res.end();
        }
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(port);
