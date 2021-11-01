const express = require("express");
const router = express.Router();
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const fs = require("fs");
const https = require("https");
var http = require("http");
const passport = require("passport");
const dotenv = require("dotenv");
LocalStrategy = require("passport-local").Strategy;
var os = require("os");
var redirector = require("redirect-https")({
  body: "<!-- Hello Developer! Please use HTTPS instead: {{ URL }} -->",
});

const cert = fs.readFileSync(__dirname + "/fake-certificate/server.cert");
const key = fs.readFileSync(__dirname + "/fake-certificate/server.key");
const useHttps = true;

//EJS
app.enable("trust proxy");
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(express.static("views"));

//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "420",
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect("https://" + req.headers.host + req.url);
  }
});

//Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/users"));

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
|   ${http}://${address}:${port}    |
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
      |   ${http}://${address}:${port}    |
      |                                |
      |   ${os.type()} (${os.release()}) ${os.arch()}  |
      |                                |`
    );
  });
}
