var mysql = require('mysql');

var mySqlConfig = require('./config');
// var con = mysql.createConnection(mySqlConfig);
var pool = mysql.createPool(mySqlConfig);

function normalizeObj(obj) {
    return Object.assign({}, obj);
}

module.exports = function (query, values, callback) {
    try {
        values = values || [];

        pool.query(query, values, function (err, rows_src) {
            if (!err) {
                var rows = normalizeObj(rows_src[0]);
                callback(rows, rows_src);
            } else {
                console.log('Error while performing Query.');
                console.error(err);
                callback(null, null, err);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
};
