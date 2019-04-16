var query = require('../db');

function normalizeObj (obj) {
    var newObj = {};
    return Object.assign(newObj, obj);
}

function getUser(user, callback) {
    var sql;
    if (typeof user === 'string') {
        sql = "SELECT * FROM users WHERE login = '"+ user + "'";
        var asdb = query(sql)
        console.log(asdb)
        query(sql,function (err, user) {
            if (err) callback(err);
            //var user = normalizeObj(rows[0]);
            if (user) callback(false, user)
        });
    } else if (typeof user === 'number') {
        sql = 'SELECT * FROM users WHERE id = ?';
        query(sql, [user], function (err, user) {
            if (err) callback(err);
            //var user = normalizeObj(rows[0]);
            if (user) callback(false, user)
        });
    }
}

async function getUserAsync (user) {
    return new Promise((resolve, reject) => {
        getUser(user, function (err, user) {
            if (err) reject(err);
            resolve(user)
        })
    })
}

async function queryAsync (sql, values) {
    return new Promise((resolve, reject) => {
        query(sql, values, function (err, row, rows_src) {
            if(err) reject(err);
            resolve(rows_src)
        })
    })
}

async function getAllDialogs (username) {
    const data = [];

    const user = await getUserAsync(username);
    const chat_room = await queryAsync('SELECT * FROM chat_rooms WHERE user2 = ? OR user1 = ?', [user.id, user.id]);
    for (var i = 0; i < chat_room.length; i++) {
        var dialog = normalizeObj(chat_room[i]);
        if (dialog.user1 === user.id) {
            data.push({name: (await getUserAsync(dialog.user2)).login, id: dialog.id});
        } else if (dialog.user2 === user.id) {
            data.push({name: (await getUserAsync(dialog.user1)).login, id: dialog.id});
        }
    }
    return data
}

module.exports = {
    getUser: getUser,
    getAllDialogs: getAllDialogs
};
