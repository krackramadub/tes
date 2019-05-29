var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var user_data = require('./user_data');
var mysql = require('mysql');
var query = require('../db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', function (req, res) {
    res.render('login', { title: 'tSolving' });
});

router.post('/login', function (req, res) {


    var form = new multiparty.Form();
    form.parse(req, function (error, fields, files) {
        if (fields) {
            var login = fields.login[0];
            var password = fields.password[0];
            if (login && password && login != '') {
                user_data.check_login(login, password, function (user_result) {
                    if (user_result.is_authenticate == true) {
                        var secret = req.app.get('secret');
                        var token = user_data.get_token(user_result.user, secret);
                        res.cookie('auth_token', token);
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
                            res.redirect('/users/user_info');
                            console.log('User login!');
                        }
                    } else {
                        var data = [];
                        data.title = 'tSolving';
                        data.info = 'Неверный логин или пароль';
                        res.render('login', data);
                    }
                });
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
    con.query('SELECT * from diplom_new.works WHERE status = 1',
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
    function normalizeObj(obj) {
        return Object.assign({}, obj);
    }

    var data = req.data;
    data.title = 'tSolving';

    if (data.user) {
        try {
            var sql = 'SELECT id FROM users WHERE login = ?';
            query(sql, [data.user.username], (row) => {
                var sql = 'SELECT w.id, w.type, w.date, u.login as user, w.topic, w.text, w.file, w.price FROM diplom_new.works w JOIN diplom_new.users u on w.user = u.id LEFT JOIN diplom_new.users ex on w.executor = ex.id WHERE w.executor = ? OR w.user = ?';
                query(sql, [row.id, row.id], (_, row_src) => {
                    var rows = [];
                    for (var v in row_src) {
                        rows.push(normalizeObj(row_src[v]));
                    }
                    data = Object.assign(data, { my_tasks: rows });
                    var sql = 'SELECT w.id, w.type, w.date, u.login as user, w.topic, w.text, f.filename as file, f.uri as f_uri, w.price FROM diplom_new.works w JOIN diplom_new.users u on w.user = u.id LEFT JOIN diplom_new.files f on w.file = f.id WHERE w.executor IS NULL OR w.user != ?;';
                    query(sql, [data.user.id], function (_, row_src) {
                        var rows = [];
                        for (var v in row_src) {
                            rows.push(normalizeObj(row_src[v]));
                        }
                        data = Object.assign(data, { all_tasks: rows });
                        console.log(data);
                        res.render('user_info', data);
                    });

                });
            });
        }
        catch (e) {
            console.error(e);
        }
    } else {
        res.render('user_info', data);
    }
});

module.exports = router;
