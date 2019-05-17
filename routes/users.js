var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var user_data = require('./user_data');
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', function (req, res) {
    res.render('login', { title: 'tSolving' });
});
var user_db = [];
router.post('/login', function (req, res) {


    var form = new multiparty.Form();
    form.parse(req, function (error, fields, files) {
        if (fields) {
            var login = fields.login[0];
            var password = fields.password[0];
            if (login && password && login != '') {
                var user_result = user_data.check_login(login, password);
                if (user_result.is_authenticate == true) {
                    var secret = req.app.get('secret');
                    var token = user_data.get_token(user_result.user, secret);
                    res.cookie('auth_token', token);
                    //Перенаправления на страницы в зависимости от роли пользователя, указанной в БД:
                    if (user_result.user.roles == 'user') {
                        res.redirect('/users/user_info');
                        console.log('User login!');
                    }
                    //Для админа:
                    if (user_result.user.roles == 'admin') {
                        res.redirect('/users/user_info');
                        console.log('Admin login!'); //отладка
                    }
                    //Для технической поддержки:
                    if (user_result.user.roles == 'support') {
                        res.redirect('/support');
                        console.log('Support login!');
                    } else {
                        res.render('login', { info: 'error. try again' });
                    }
                } else {
                    var data = [];
                    data.title = 'tSolving';
                    data.info = 'Неверный логин или пароль';
                    res.render('login', data);
                }
            } else {
                var data = [];
                data.title = 'tSolving';
                data.info = 'Неверный логин или пароль';
                res.render('login', data);
            }
        }
    });
});

router.post('/getTasks', function (req, res) {
    var data = req.data;
    data.tasks = [];
    var mySqlConfig = require('../config');
    var con = mysql.createConnection(mySqlConfig);
    con.connect(function (err) {
        if (!err) {
            console.log('DB Connected.');
        } else {
            console.log('DB error.');
        }

    });
    con.query('SELECT * from pageorders',
      function (err, rows, fields) {
          con.end();
          if (!err)
              console.log('The solution is: ' + rows.length);
          else
              console.log('Error while performing Query.');
          if (rows) {
              for (var i = 0; i < rows.length; i++) {
                  for (var i in rows) {
                      data.tasks.push(rows[i]);
                  }
              }
          }
          res.send(data);
      });
});
//Для пользователя
router.get('/user_info', function (req, res) {
    var data = req.data;
    data.title = 'tSolving';
    res.render('user_info', data);
});

module.exports = router;
