var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var query = require('../db');

function check_login(login, passwd, callback) {
    /*
    var found_user = user_db.find(function (x) {
        if (x.login == login && x.password == passwd) {
            return true;
        } else {
            return false;
        }
    });
    */

    query('SELECT * FROM diplom_new.users WHERE login = ?', [login], function (row) {
        if (row && row.password === passwd) {
            callback({
                is_authenticate: true,
                user: {
                    id: row.id,
                    username: row.login,
                    roles: row.role,
                    avatar: row.avatar,
                    phone: row.phone,
                    datareg: row.registration_date,
                    rep: row.reputation,
                    email: row.email,

                },
            });
        } else {
            callback({
                is_authenticate: false,
                user: null,
                info: 'Введен неправильный логин или пароль',
            });
        }
    });
}

function get_token(user, secret) {
    return jwt.sign(user, secret, { expiresIn: 432000 });
}

function get_user(token, secret) {
    return jwt.verify(token, secret);
}

router.all('*', function (req, res, next) {
    var data = {};
    var token = req.cookies['auth_token'];
    if (token) {
        data.user = get_user(token, req.app.get('secret'));
    }
    req.data = { user: data.user };
    req.roles = { user: data.roles };
    //req.data= data.user

    next();
});

module.exports = {
    router: router,
    check_login: check_login,
    get_token: get_token,
    get_user: get_user,
};
