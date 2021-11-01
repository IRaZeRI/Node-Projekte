const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const con = require('../db.js');
const {validationResult} = require('express-validator');
const passport = require('passport');
const JSON = require('json');
const jwt = require('jsonwebtoken');
const { ensureAuthenticated } = require('../config/auth.js');


//Register handle
router.post('/register',(req,res)=>{
  const {username, email, firstname, lastname, password, password2} = req.body;
  let errors = [];
  if(!username || !email || !firstname || !lastname || !password || !password2) {
    errors.push({msg : "Please fill out all fields"})
  } else if(password !== password2) { 
    errors.push({msg : "Passwords dont match"});
  } else if(password.length < 6 ) { 
    errors.push({msg : 'Password need atleast 6 characters'})
  }

  if(errors.length > 0 ) {
    res.render('/register', {
      errors : errors,
      username : username,
      email : email,
      firstname : firstname,
      lastname : lastname,
      password : password,
      password2 : password2})
    } else {
      var sql='SELECT username FROM `users` WHERE username = ?';
      con.query(sql, [username], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
          req.flash('error_msg','This Username already exists!');
          res.redirect('/register');
        }else {
          var sql2='SELECT email FROM `users` WHERE email = ?';
          con.query(sql2, [email], function (err2, data2, fields2) {
            if(err2) throw err2
            if(data2.length>0){
              req.flash('error_msg','This E-Mail already exists!');
              res.redirect('/register');
            } else {
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                  con.query('INSERT INTO `users` (`username`, `email`, `firstname`, `lastname`, `password`, `created_at`, `updated_at`) VALUES(?,?,?,?,?,now(), now() )',[
                    username,
                    email,
                    firstname,
                    lastname,
                    hash
                  ], function(error, results, fields) {
                    console.log('Erfolgreich Registriert')
                    console.log('/------------------- \n| Userdata_Log:\n| Username: ' + username+ '\n| E-Mail:' + email+ '\n| First-Name:' + firstname+ '\n| Last-Name:' + lastname+ '\n| PW: ' + password + '\n| Hashed: ' + hash + '\n------------------');
                    res.redirect('/login');		
                  });
                });
              });
            }
          })
        }
      })
    };
  })

//login handle
router.post('/login', (req,res,next)=>{ 
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password)
  if(username != '' | password != '') {
    var sql='SELECT * FROM `users` WHERE username = ? and password = ? or email = ? and password = ?'
    con.query(sql, [username, password, username, password], function (err, data, fields) { 
      if(err) throw err
      req.session.cacheid = data[0].id
      req.session.cache = data
      if(data.length>0){
        
        con.query(`UPDATE users SET last_login = now() WHERE id = '${req.session.cache[0].id}'`);
        req.session.loggedinUser = true
        usercheckid = req.session.cache[0].id
        res.redirect('/dashboard');
      } else {
        req.flash('error_msg','Your Username/E-Mail or password is wrong!');
        res.redirect('login');
      }
    })
  } else {
        res.redirect('login');
  }
})

//PWForget handle
router.post('/pwforget',(req,res,next)=>{
})

//PWReset handle
router.post('/pwreset',(req,res,next)=>{
})

//logout
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','Now logged out');
  res.redirect('/');
 })

module.exports  = router;