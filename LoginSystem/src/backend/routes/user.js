//users.js in routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
//login handle
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

//Register handle
router.post("/login", (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
//register post handle
router.post("/register", (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];
  console.log(" Name " + username + " email :" + email + " pass:" + password);
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: "password atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      username: username,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    //validation passed
    User.findOne({ email: email, username: username }).exec((err, user) => {
      console.log(user);
      if (user) {
        res.render("register", {
          errors,
          username,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          id: uuidv4(),
          username: username,
          email: email,
          rank: process.env.Member,
          password: password,
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((value) => {
                console.log(value);
                req.flash("success_msg", "You have now registered!");
                res.redirect("/users/login");
              })
              .catch((value) => console.log(value));
          })
        );
      }
    });
  }
});
//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/users/login");
});

module.exports = router;
