var user_data = require('../routes/user_data');

function getCookie(cookie, name) {
    var value = "; " + cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

module.exports = function (users) {
    return function (socket, next) {
        try {
            var connection = {
                auth: getCookie(socket.handshake.headers.cookie, 'auth_token'),
                io: getCookie(socket.handshake.headers.cookie, 'io'),
                handshakeData: socket.request
            };
            var user = user_data.get_user(connection.auth, 'qweasdetwfhsdfhasdbqweuabsd');
            if (user) {
                socket.username = user.login;
                users[user.id] = {
                    id: socket.id,
                    io: connection.io,
                    username: user.login
                };
                next()
            } else {
                next(new Error('not authorized'))
            }
        } catch (e) {
            next(new Error('not authorized'))
        }

    }
};