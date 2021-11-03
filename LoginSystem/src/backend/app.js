const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const https = require("https");
const http = require("http");
const fs = require("fs");
var path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);
require("dotenv").config();

//mongoose
mongoose
  .connect("mongodb://localhost/local", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `|    Verbindung zur Datenbank    |
|          erfolgreich!           |
\\--------------------------------/`
    )
  )
  .catch((err) =>
    console.log(
      `|    Verbindung zur Datenbank    |
|       fehlgeschlagen!          |
\\--------------------------------/`
    )
  );
//EJS
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.set("views", path.join(__dirname, "../frontend/root/"));
app.use(express.static("../frontend/root/"));

//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
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

//Routes
app.use("/", require("../backend/routes/index"));
app.use("/users", require("../backend/routes/user"));

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

https.createServer(certkey, app).listen(process.env.PORT, function () {
  console.info(
    ` ________________________________
/                                \\
| Server erfolgreich gestartet.  |
|________________________________|
|                                |
|      http://localhost:80       |
|     ${process.env.Protocol}localhost:${process.env.Port}      |
|    ${process.env.Protocol}${address}:${process.env.Port}    |
|                                |`
  );
});
http
  .createServer(function (req, res) {
    res.writeHead(301, {
      Location: process.env.Protocol + req.headers["host"] + req.url,
    });
    res.end();
  })
  .listen(80);
