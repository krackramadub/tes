var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploadfiles/' });
var query = require('../db');
var user_data = require('./user_data');

function normalizeObj(obj) {
    return Object.assign({}, obj);
}

function getCookie(cookie, name) {
    var value = '; ' + cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

router.get('/getTasksType', function (req, res) {
    var sql = 'SELECT id, name FROM diplom_new.types';
    query(sql, [], function (_, row_src) {
        var tasks = [];
        for (var item in row_src) {
            tasks.push(normalizeObj(row_src[item]));
        }
        tasks.sort((a, b) => a.id - b.id);
        res.send(JSON.stringify(tasks));
    });
});

router.post('/createTask', upload.single('file'), function (req, res) {
    console.log(req.body);
    if (req.file) {
        var sql = 'INSERT INTO diplom_new.files (uri, filename) VALUES (?, ?)';
        query(sql, [req.file.filename, req.file.originalname], function (row, result) {
            var file = normalizeObj(result).insertId;
            console.log(file);
            var sql = 'INSERT INTO diplom_new.works (type, user, topic, text, file) VALUES (?, ?, ?, ?, ?)';
            var user = user_data.get_user(req.cookies.auth_token, 'qweasdetwfhsdfhasdbqweuabsd');
            console.log(user);
            query(sql, [req.body.type, user.id, req.body.title, req.body.text, file], function () {
                res.redirect('/users/user_info');
            });
        });
    } else {
        var sql = 'INSERT INTO diplom_new.works (type, user, topic, text) VALUES (?, ?, ?, ?)';
        var user = user_data.get_user(req.cookies.auth_token, 'qweasdetwfhsdfhasdbqweuabsd');
        console.log(user);
        query(sql, [req.body.type, user.id, req.body.title, req.body.text], function () {
            res.redirect('/users/user_info');
        });
    }
    var sql = 'INSERT INTO diplom_new.works (type, user, topic, text, file, executor) VALUES (?, ?, ?, ?, ?, ?)';

});

router.get('/getTasks', function (req, res) {
    var user = user_data.get_user(req.cookies.auth_token, 'qweasdetwfhsdfhasdbqweuabsd');
    var sql = 'SELECT * FROM diplom_new.works WHERE executor IS NULL';
    console.log(user.id);
    query(sql, [user.id], function (_, row_src) {
        var tasks = [];
        for (var item in row_src) {
            tasks.push(normalizeObj(row_src[item]));
        }
        tasks.sort((a, b) => a.id - b.id);
        res.send(JSON.stringify(tasks));
    });
});

module.exports = router;
