var express = require('express');
var router = express.Router();
var query = require('../db');

function normalizeObj(obj) {
    return Object.assign({}, obj);
}

router.get('/getTasksType', function (req, res) {
    var sql = 'SELECT id, name FROM diplom_new.types';
    query(sql, [], function (_, row_src) {
        var tasks = [];
        for (var item in row_src) {
            tasks.push(normalizeObj(row_src[item]));
        }
        tasks.sort((a, b) => a.id - b.id);
        console.log(tasks);
        res.send(JSON.stringify(tasks));
    });
});

module.exports = router;
