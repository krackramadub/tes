'use strict'

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

// USER DATABASE
var user_db = [
    {
        uname: "Jane", password: "305", roles: [
            "manager",
            "user",
            "editor"
        ]
    }

];
    // var mySqlConfig = {
    //     host: 'localhost',
    //     port: '3306',
    //     user: 'root',
    //     password: '12345',
    //     database: 'webwork',
    // };
    // var con = mysql.createConnection(mySqlConfig);
    // con.connect(function (err) {
    //     if (!err) {
    //         console.log("DB Connected.")
    //     } else {
    //         console.log("DB error.")
    //     }
    //
    // });
    // con.query('SELECT * from user',
    //     function (err, rows, fields) {
    //         con.end();
    //         if (!err)
    //             console.log('The solution is: ' + rows.length);
    //         else
    //             console.log('Error while performing Query.');
    //
    //         for (var i = 0; i < rows.length; i++) {
    //             for (var i in rows) {
    //                 user_db.push(rows[i])
    //
    //             }
    //         }
    //
    //     });
//--

function check_login(login, passwd) {
    var found_user = user_db.find(function (x) {
        if (x.uname == login && x.password == passwd) {
            return true;
        } else {
            return false;
        }
    });

    if (found_user) {
        return {
            is_authenticate: true,
            user: {
                username: found_user.uname
                // roles: found_user.roles
            }
        }
    } else {
        return {
            is_authenticate: false,
            user: null
        }
    }
}
function get_token(user,secret){
    var token = jwt.sign(user,secret, {expiresIn: 2000});
    return token;
}

function get_user(token,secret){
    var user = jwt.verify(token,secret);
    return user;
}

router.all("*",function (req,res,next) {
    var data = {}
    var token = req.cookies["auth_token"];
    if(token){
        data.user = get_user(token,req.app.get('secret'));
    }
    req.data = { user: data.user}
    //req.data= data.user

    next();
})


module.exports = {
    router :router,
    check_login: check_login,
    get_token: get_token,
    get_user: get_user
}