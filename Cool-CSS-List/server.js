const express = require("express");
const router = express.Router();
const app = express();
const session = require("express-session");
const https = require("https");
var http = require("http");
const fs = require("fs");
var os = require("os");
var redirector = require("redirect-https")({
  body: "<!-- Hello Developer! Please use HTTPS instead: {{ URL }} -->",
});

const cert = fs.readFileSync(__dirname + "/fake-certificate/server.cert");
const key = fs.readFileSync(__dirname + "/fake-certificate/server.key");
const useHttps = true;

app.enable("trust proxy");
app.set("view engine", "ejs");
app.use(express.static("views"));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "420",
    resave: true,
    httpOnly: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect("https://" + req.headers.host + req.url);
  }
});

app.use("/", redirector, require("./routes/index"));

var address,
  ifaces = require("os").networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].filter((details) =>
    details.family === "IPv4" && details.internal === false
      ? (address = details.address)
      : undefined
  );
}

if (useHttps == true) {
  const http = "https";
  const host = "localhost";
  const port = process.env.PORT || 443;
  const server = https
    .createServer({ key: key, cert: cert }, app)
    .listen(port, function () {
      console.info(
        ` ________________________________
/                                \\
| Website erfolgreich gestartet. |
|________________________________|
|                                |
|     ${http}://${host}:${port}      |
|  ${http}://${address}:${port}   |
|                                |
|   ${os.type()} (${os.release()}) ${os.arch()}  |
|                                |`
      );
    });
} else {
  const http = "http";
  const host = "localhost";
  const port = process.env.PORT || 80;
  const server = app.listen(port, function () {
    console.info(
      ` ________________________________
      /                                \\
      | Website erfolgreich gestartet. |
      |________________________________|
      |                                |
      |     ${http}://${host}:${port}      |
      |  ${http}://${address}:${port}   |
      |                                |
      |   ${os.type()} (${os.release()}) ${os.arch()}  |
      |                                |`
    );
  });
}
