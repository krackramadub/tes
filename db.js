var mysql = require('mysql');

var mySqlConfig = require('./config');
// var con = mysql.createConnection(mySqlConfig);
var pool = mysql.createPool(mySqlConfig);

function normalizeObj(obj) {
    var newObj = {};
    return Object.assign(newObj, obj);
}

module.exports = function (query, values, callback) {
    values = values || [];

    pool.query(query, values, function (err, rows_src) {
        var rows = normalizeObj(rows_src[0]);
        if (!err) {
            callback(rows, rows_src);
        } else {
            console.log('Error while performing Query.');
            console.error(err);
            callback(err);
        }
    });
};
