const express = require("express");
const router = express.Router();
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const fs = require("fs");
const https = require("https");
const http = require("http");
const passport = require("passport");
const dotenv = require("dotenv");
const os = require("os");
const path = require("path");
const port = process.env.PORT || 443;
const prot = process.env.Protocol || "https";

//App Settings
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(express.static("../frontend/root/views/"));
app.set("views", path.join(__dirname, "../frontend/root/views/"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "420",
    resave: true,
    saveUninitialized: true,
    secure: true,
    httpOnly: true,
    cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

//use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("../backend/routes/index"));
app.use("/", require("../backend/routes/users"));

//Get Local IP
var address,
  ifaces = require("os").networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].filter((details) =>
    details.family === "IPv4" && details.internal === false
      ? (address = details.address)
      : undefined
  );
}

//Certificate
var certkey = {
  cert: fs.readFileSync("../backend/fake-certificate/server.cert"),
  key: fs.readFileSync("../backend/fake-certificate/server.key"),
};

https.createServer(certkey, app).listen(port, function () {
  console.info(
    ` ________________________________
/                                \\
| Server erfolgreich gestartet.  |
|________________________________|
|                                |
|      http://localhost:80       |
|     ${prot}://localhost:${port}      |
|    ${prot}://${address}:${port}    |
|                                |`
  );
});
http
  .createServer(function (req, res) {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url,
    });
    res.end();
  })
  .listen(80);
