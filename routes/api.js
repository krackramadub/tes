var express = require('express');
var router = express.Router();
var query = require('../db');

router.get('/getTasksType', function (req, res) {
    var sql = 'SELECT uri FROM diplom_new.avatars WHERE id = ?';
    query(sql, [], function (row) {
        res.send('ERROR');
    });
});

module.exports = router;
