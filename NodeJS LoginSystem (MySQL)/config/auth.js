const con = require('../db');
require('../routes/users')

module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.session.loggedinUser != true) {
          req.session.rank = 'Gast';
          req.session.loggedinUser = false;
          req.session.userdata = {
            rank: 'Gast',
            loggedIn: false
          }
        } else {
            var sql='SELECT * FROM `users` WHERE id = ? ';
            con.query(sql, [req.session.cacheid], function (err, data, fields) { 
              if(err) throw err
              if(data.length>0){
                req.session.userid = data[0].id,
                req.session.username = data[0].username,
                req.session.rank = data[0].rank,
                req.session.email = data[0].email,
                req.session.firstname = data[0].firstname,
                req.session.lastname = data[0].lastname,
                req.session.last_logind = data[0].last_login
                req.session.loggedinUser = true
                req.session.userdata = data
                req.session.userlog = '/------------------- \n| Userdata_Log:\n| UserID: ' + req.session.userid+ '\n| Username: ' + req.session.username+ '\n| Rank: ' + req.session.rank+ '\n| E-Mail:' + req.session.email+ '\n| First-Name:' + req.session.firstname+ '\n| Last-Name:' + req.session.lastname+ '\n------------------'
                return next()
              }
            })
        }
    }
}