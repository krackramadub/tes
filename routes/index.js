var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var nodemailer = require('nodemailer')
app.use(bodyParser.json());

var query = require('../db');
var methods = require('../socket/methods');
var getAllDialogs = methods.getAllDialogs;
/* GET home page. */
router.get('/', function (req, res) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.sibnet.ru',
        auth: {
          user: 'ezreshenie@sibnet.ru',
          pass: 'ezreshenie1488'
        }
      });
      
      var mailOptions = {
        from: 'ezreshenie@yandex.ru',
        to: 'radkevich.viktor83@gmail.com',
        subject: 'Активация пользователя',
        text: 'Для активации аккаунта перейдите по следующей ссылке:',
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    var users = [];
    //  var mySqlConfig = {
    //    host: 'localhost',
    //    user: 'root',
    //    password: '12345',
    //    database: 'webwork',
    //  };
    // var con = mysql.createConnection(mySqlConfig)
    //  con.connect(function(err){
    //    if(!err){
    //      console.log("DB Connected.")
    //    }else{
    //      console.log("DB error.")
    //    };

    // })
    //  con.query('SELECT * from user LIMIT 2',
    //      function(err, rows, fields) {
    //       con.end();
    //        if (!err)
    //          console.log('The solution is: ' + rows.length);
    //        else
    //          console.log('Error while performing Query.');
    //
    //for(var i =0; i < rows.length;i++){
    //        for(var i in rows){
    //       users.push(rows[i])
    //
    //       }
    //        homepage();
    //      });
    //     function homepage(){
    var data = req.data;
    data.title = 'ezReshenie';
    res.render('index', data);
    //     }
});
router.get('/logout', function (req, res) {
    res.clearCookie('auth_token');
    res.redirect('/');

});
router.get('/messages', function (req, res) {
    var data = req.data;
    data.title = 'TExt';
    res.render('message_test', data);
    //{user:{username:"Users", role:["1","2"]}})
});
router.get('/message_test', function (req, res) {
    var data = req.data;
    data.title = 'ezReshenie';
    data.users = [];
    // console.log(data.user.login);
    getAllDialogs(data.user.username, req.query.user).then((dialogs) => {
        data.dialogs = dialogs;
        res.render('message_test', data);
    });
});

router.get('/registration', function (req, res) {
    res.render('registration', { title: 'ezReshenie', bread: 'idol', extend: 'layout_for_reg' });

});
router.get('/bugreport', function (req, res) {
    var data = req.data;
    data.title = 'ezReshenie';
    res.render('bugreport', data);
});
router.get('/bugs', function (req, res) {
    var data = req.data;
    data.title = 'tSolving';
    data.bugs = [];
    data.solved = [];
    //data.resultArray = [];
    query('SELECT * from bugreport WHERE status=0', false, function (err, rows) {
        if (!err)
            console.log('The solution is: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.bugs.push(JSON.stringify(rows[i]));
                }
            }
        } else {
            console.log('Bugreports with STATUS = 0 not found!');
        }
        query('SELECT * from bugreport WHERE status=1', false, function (err, rows) {
            if (!err)
                console.log('The solution is: ' + rows.length);
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    for (var i in rows) {
                        data.solved.push(JSON.stringify(rows[i]));
                    }
                }
                renderPost();
            } else {
                console.log('Bugreports with STATUS = 1 not found!');
                //renderPost();
            }
        });

        function renderPost() {
            if (data.user) {
                if (data.user.roles === 'admin') {
                    res.render('bugs', data);
                }
            } else {
                var info = 'Извините, у вас нет доступа к этому разделу.';
                var user = data.user;
                var notAdm = 'not_admin';
                var title = 'ezReshenie';
                // noinspection JSAnnotator
                res.render('bugs', { data: user, notAdm, title, info });
            }
            //console.log("Value: " + JSON.stringify(resultArray));

        }
    });
});


// router.get('/support',function(req,res,next){
//   var data = req.data;
//   data.title = "tSolving";
//   // if(data.user == undefined){
//   //   data.user = "guest"
//   // }
//   res.render('support',data)
// })
router.post('/getMyAccount', function (req, res) {
    var data = req.data;
    var login = req.body.login;
    data.userInfo = [];
    var sql = 'SELECT * from users WHERE login = ?';
    query(sql, [login], function (err, rows) {
        if (!err)
            console.log('The solution is: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.userInfo.push(JSON.stringify(rows[i]));
                }
            }
        } else {
            console.log('Bugreports with STATUS = 0 not found!');
        }
        res.send(data);
    });

});
router.post('/getFinishedWorks', function (req, res) {
    var data = req.data;
    var id = req.body.id;
    data.fWorks = [];
    var sql = 'SELECT * from finishedwork WHERE id = ?';
    query(sql, [id], function (err, rows) {
        if (!err)
            console.log('The solution is: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.fWorks.push(JSON.stringify(rows[i]));
                }
            }
        } else {
            console.log('Bugreports with STATUS = 0 not found!');
        }
        res.send(data);
    });

});
router.post('/insertbugs', function (req, res) {
    var title = req.body.postTitle;
    var content = req.body.postText;
    var username = req.body.user; //получаем имя пользователя (работает!)
    // console.log(title + ' ' + username + ' ' + content);
    var sql = 'INSERT INTO bugreport (username, title, text) VALUES (?, ?, ?)';
    query(sql, [username, title, content], function (err) {
        if (err) throw err;
        console.log('1 record inserted');
    });
    res.redirect('/users/user');
});

router.post('/changebug', function (req, res) {
    var sql = 'UPDATE bugreport SET status=1 WHERE status=0';
    query(sql, false, function (err) {
        if (err) throw err;
        console.log('Bug status changed!');
    });
    res.redirect('/bugs');
});

router.post('/register', function (req, res) {
    try {
        var login = req.body.login;
        var passwd = req.body.passwd;
        var phone = req.body.phone;
        var email = req.body.email;
        var nickname = req.body.nickname;

        // console.log(login + ' | ' + passwd + '|' + phone + '|' + email + '|' + nickname);
        var sql = 'INSERT INTO diplom_new.users (login, password, role, phone, email) VALUES (?, ?, 3, ?, ?);';
        try {
            query(sql, [login, passwd, phone, email], function (_, _, err) {
                if (err) throw err;
                console.log('1 record inserted');
            });
        }
        catch (e) {
            console.log(e);
        }
        
        res.redirect('/users/login');
    }
    catch (e) {
        console.error(e);
    }
});
router.get('/uploadfile', function (req, res) {
    var data = req.data;
    data.title = 'tSolving';
    res.render('uploadfile', data);
});
router.post('/uploadf', function (req) {
    console.log('upload');
    var file = req.files.sampleFile;
    var filename = file.name;
    var updir = path.resolve(__dirname, '..') + '/uploadfiles/' + filename;
    file.mv(updir, function (err) {
        if (err) {
            console.log('error upload');
        } else {
            console.log('done!');
        }
    });
});
module.exports = router;
