const http = require("http");
const request = require("request");
require("dotenv").config();
//git test

const clientId = "de842db37076cd7a611e";
const secretKey = "9b75f870687a418cd120d78750efa25773b5aba6";

console.log("started server on port 5003");

http
  .createServer((req, res) => {
    var code = req.url.split("=")[1];
    console.log("here");
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
          console.log("body", body);
          res.end();
        }
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(5003); //portnumber they are waiting for
