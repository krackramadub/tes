var express = require('express');
var router = express.Router();
var query = require('../db');

var fs = require('fs');
var path = require('path');

router.get('/:id', function (req, res) {
    var data = req.data;
    console.log(req.params.id);
    if (data.user && req.params.id) {
        var sql = 'SELECT uri FROM diplom_new.avatars WHERE id = ?';
        query(sql, [req.params.id], async function (row) {
            var p = path.join(__dirname, '../', 'public', 'avatar', row.uri);
            console.log(p);
            try {
                res.sendFile(p);
            }
            catch (e) {
                console.log(e);
                res.send('ERROR');
            }
        });
    }
});

module.exports = router;
