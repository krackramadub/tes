var query = require('../db');
var auth = require('./auth');
var methods = require('./methods');
var users = {};

var getUser = methods.getUser;

function normalizeObj(obj) {
    var newObj = {};
    return Object.assign(newObj, obj);
}

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    //io.of('/dialog').use(function(socket, next) {
    io.use(auth(users));

    io.sockets.on('connection', function (socket) {
        socket.on('private_message', function (data, callback) {
            data.from = socket.username;
            if (data.to && data.from && data.text) {
                getUser(socket.username, function (err, from) {
                    //console.log(from);
                    if (from) {
                        var sql = 'SELECT * FROM chat_rooms WHERE (id = ?);';
                        query(sql, [data.to], function (err, chat_room) {
                            var to = chat_room.user1 === from.id ? chat_room.user1 : chat_room.user2;
                            //console.log(chat_room.id, to.id, from.id);
                            if (chat_room.id && to && from.id) {
                                var sql = 'INSERT INTO messages (from_user, to_user, chat_id, message) VALUES (?, ?, ?, ?);';
                                query(sql,
                                  [from.id, to, chat_room.id, data.text],
                                  function (err, id) {
                                      io.to('dialog' + chat_room.id).emit('private_message', {
                                          from_user: from.id,
                                          to_user: to,
                                          message: data.text,
                                          TIMESTAMP: (new Date()).toISOString(),
                                      });
                                      callback(false);
                                  });

                            }

                        });

                    }
                });
            }
            callback();
        });
        socket.on('change_dialog', function (data, callback) {
            var dialog = data.dialog;
            getUser(socket.username, function (err, user) {
                var sql = 'SELECT * FROM chat_rooms WHERE (id = ?) AND ( user1 = ? OR user2 = ?)';
                query(sql, [dialog, user.id, user.id], function (err, chat) {
                    if (chat) {
                        var sql = 'SELECT * FROM messages WHERE (chat_id = ?) LIMIT 50;';
                        query(sql, [chat.id, user.id, user.id], function (err, _, rows) {
                            var messages = rows.map(function (row) {
                                var message = normalizeObj(row);
                                message.isYour = message.from_user === user.id;
                                return message;
                            });
                            //console.log(messages);
                            socket.join('dialog' + chat.id);
                            socket.emit('all_messages', {
                                user: user.id,
                                chat: dialog,
                                messages: messages,
                            });
                        });
                    }
                });


            });
            //callback();
        });

        socket.on('create_dialog', function (data) {
            var user2 = data.user;
            getUser(socket.username, function (err, user1) {
                getUser(user2, function (err, user2) {
                    var sql = 'SELECT * FROM chat_rooms WHERE ( user1 = ? AND user2 = ? ) OR ( user2 = ? AND user1 = ? );';
                    query(sql, [user1.id, user2.id, user1.id, user2.id], function (err, dialog) {
                        if (Object.keys(dialog).length === 0 && dialog.constructor === Object) {
                            var sql = 'INSERT INTO chat_rooms (user1, user2) VALUES (?, ?)';
                            query(sql, [user1.id, user2.id], function () {
                                var sql = 'SELECT * FROM chat_rooms WHERE user1 = ? AND user2 = ?';
                                query(sql, [user1.id, user2.id], function (err, dialog) {
                                    socket.emit('dialog_created', {
                                        id: dialog.id,
                                        user1: dialog.user1,
                                        user2: dialog.user2,
                                    });
                                });
                            });
                        } else {
                            socket.emit('dialog_created', {
                                id: dialog.id,
                                user1: dialog.user1,
                                user2: dialog.user2,
                            });
                        }
                    });
                });
            });
        });
    });
}; //End module export

/*

// io.set('authorization',function(handshake,callback){

// })



*/
