'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var users = require('./users');
var user_db = [];

//function getUsers(){
// USER DATABASE
var user_db1 = [
    {
        login: 'Jane',
        password: '123456',
        roles: 'user',
        avatar: 'd_avatar.jpg',
        nickname: 'Джейн Петрович',
        phone: '8911-333-11-11',
        data_reg: '28.02.2021',
        rep: '2.44',
        email: 'jane@mailer.com',
    },
];
//console.log(user_db)
var mySqlConfig = require('../config');
var con = mysql.createConnection(mySqlConfig);
con.connect(function (err) {
    if (!err) {
        console.log('DB Connected.');
    } else {
        console.log('DB error.');
    }

});
con.query('SELECT * from users',
  function (err, rows, fields) {
      con.end();
      if (!err)
          console.log('The solution is: ' + rows.length);
      else
          console.log('Error while performing Query.');
      if (rows) {
          for (var i = 0; i < rows.length; i++) {
              for (var i in rows) {
                  user_db.push(rows[i]);
              }
          }
      }

  });

// }
function check_login(login, passwd) {
    //getUsers();
    var found_user = user_db.find(function (x) {
        if (x.login == login && x.password == passwd) {
            return true;
        } else {
            return false;
        }
    });

    if (found_user) {
        console.log(found_user);
        return {
            is_authenticate: true,
            user: {
                username: found_user.login,
                roles: found_user.role,
                avatar: found_user.avatar,
                phone: found_user.phone,
                datareg: found_user.registration_date,
                rep: found_user.reputation,
                email: found_user.email,

            },
        };
    } else {
        return {
            is_authenticate: false,
            user: null,
            info: 'Введен неправильный логин или пароль',
        };
    }
}

function get_token(user, secret) {
    var token = jwt.sign(user, secret, { expiresIn: 432000 });
    return token;
}

function get_user(token, secret) {
    var user = jwt.verify(token, secret);
    return user;
}

router.all('*', function (req, res, next) {
    var data = {};
    var token = req.cookies['auth_token'];
    if (token) {
        data.user = get_user(token, req.app.get('secret'));
    }
    req.data = { user: data.user };
    req.roles = { user: data.roles };
    //req.data= data.user

    next();
});

module.exports = {
    router: router,
    check_login: check_login,
    get_token: get_token,
    get_user: get_user,
};
