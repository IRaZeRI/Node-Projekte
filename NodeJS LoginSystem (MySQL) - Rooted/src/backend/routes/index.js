const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");
const con = require("../db");
require("./users.js");
require("../config/auth");

test = {
  rank: "Gast",
};

//Handle Sites
router.get("/", (req, res) => {
  if (req.session.loggedinUser !== true) {
    res.render("welcome", { userdata: test });
  } else {
    res.redirect("dashboard");
  }

  console.log(req.session.userdata);
  console.log(req.session.loggedinUser);
  console.log(req.session);
});

router.get("/register", (req, res) => {
  if (req.session.loggedinUser !== true) {
    res.render("register", { userdata: test });
  } else {
    res.redirect("dashboard");
  }
  console.log(req.session.loggedinUser);
});

router.get("/login", (req, res) => {
  if (req.session.loggedinUser !== true) {
    res.render("login", { userdata: test });
  } else {
    res.redirect("dashboard");
  }
  console.log(req.session.loggedinUser);
});

router.get("/pwforget", (req, res) => {
  if (req.session.loggedinUser !== true) {
    res.render("pwforget");
  } else {
    res.redirect("dashboard");
  }
  console.log(req.session.loggedinUser);
});

router.get("/pwreset", (req, res) => {
  if (req.session.loggedinUser !== true) {
    res.render("pwreset");
  } else {
    res.redirect("dashboard");
  }
  console.log(req.session.loggedinUser);
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  var sql = "SELECT * FROM beestlist";
  con.query(sql, function (err, beamer, fields) {
    if (err) throw err;
    res.render("dashboard", {
      title: "User List",
      list: beamer,
      user: req.user,
      userdata: req.session.userdata,
    });
    console.log(req.session);
  });
});

router.get("/userlist", function (req, res, next) {
  var sql = "SELECT * FROM users";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("userlist", { title: "User List", userData: data });
  });
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
