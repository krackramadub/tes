//Модуль системы модерации и технической поддержки для проекта "ezReshneie"
//Разработал Пыжов Павел, группа 431ПО
//еще один комментарий на всякий случай

//Подключение зависимых модулей
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var query = require('../db');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//Подключение к базе данных
var mySqlConfig = {
  host: 'localhost', //расположение БД
  user: 'root', //имя пользователя
  password: '', //пароль
  database: 'diplom_new', //название БД
};

var con = mysql.createConnection(mySqlConfig);
con.connect(function (err) {
    if (!err) {
        console.log("DB Connected.")
    } else {
        console.log("DB error.")
    }

});

module.exports = router;

//Вывод сообщения об успешном подключении модуля в консоль
console.log("[MODERATION] Module connected successfuly!");

//Подключение главной страницы личного кабинета системы модерации
router.get('/moderation', function(req,res,next){
    var data = req.data;
    //Проверяем роль пользователя в целях защиты от несанкционированного доступа
    //В случае входа пользователя с ролью поддержки перенаправляем его на соответствующую страницу
    if(data.user.roles == "2"){
        data.title = "Система модерации ''ezReshenie''";        
        res.render('moderation', data);
        //Выводим в консоль сообщение об успешном входе
        console.log("[MODERATION] User", data.user.username, "login successfully!");
        //При попытке несанкционированного доступа сообщаем об отсутствии прав на доступ к странице
        } else{
            res.render('denied');
            //В консоль сервера выводим сообщение о попытке несанкционированного доступа
            console.log("[MODERATION] Access for", data.user.username, "denied!");
        }
});

//Раздел "Модерация заказов"
router.get('/moderation/work', function(req,res){
    var data = req.data;
    data.title = 'Модерация заказов';
    data.orders=[];
    con.query('SELECT * from works WHERE moder_status=1', false, function (err, rows, fields) {
        if (!err)
            console.log('[MODERATION] Pending orders: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.orders.push(JSON.stringify(rows[i]));
                }
            }
        }
        res.render('modwork', data);
    });
});

router.get('/moderation/denied', function(req,res){
    var data = req.data;
    data.title = 'Отклоненные заказы';
    data.orddenied=[];
    con.query('SELECT * from works WHERE moder_status=3', false, function (err, rows, fields) {
        if (!err)
            console.log('[MODERATION] Denied orders: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.orddenied.push(JSON.stringify(rows[i]));
                }
            }
        }
        res.render('moddenied', data);
    });
});

//Раздел "Чат поддержки"
router.get('/moderation/support', function(req,res){
    var data = req.data;
    data.title = "Чат технической поддержки";
    res.render('support', data);
});

//Раздел "Пользователи"
router.get('/moderation/users', function(req,res){
    var data = req.data;
    data.title = 'Пользователи Web-ресурса';
    data.users=[];
    con.query('SELECT * from users WHERE role=3', false, function (err, rows, fields) {
        if (!err)
            console.log('[MODERATION] Users info loaded. Users: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.users.push(JSON.stringify(rows[i]));
                }
            }
        }
        res.render('moduser', data);
    });
});

router.get('/moderation/banned', function(req,res){
    var data = req.data;
    data.title = 'Пользователи Web-ресурса';
    data.users=[];
    con.query('SELECT * from users WHERE role=5', false, function (err, rows, fields) {
        if (!err)
            console.log('[MODERATION] Banned users info loaded. Users: ' + rows.length);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.users.push(JSON.stringify(rows[i]));
                }
            }
        }
        res.render('modbanned', data);
    });
});

//Раздел "Информация о заказе"
router.get('/moderation/orderinfo', function(req,res){
    var data = req.data;
    data.title = "Получение информациии о заказе";
    res.render('ordinfo', data);
});

//Раздел "Сообщить об ошибке"
router.get('/moderation/bugreport', function(req,res){
    var data = req.data;
    data.title = "Отправка сообщения об ошибке";
    res.render('modbug', data);    
});

//Обработчик блокировки (бана)
router.get('/banned', function(req,res){
  var data = req.data;
  data.title = "Ваша учетная запись заблокирована! - ezResheinie";
  //Сразу разлогиниваем забаненного пользователя
  res.clearCookie("auth_token");
    res.render('banned', data);
    //Выводим в консоль сообщение о попытке входа заблокированного пользователя
    console.log("[MODERATION] This user is banned!");
});

//Отправка отчета об ошибках
router.post('/minsertbugs', function (req, res, next) {
var title = req.body.postTitle;
var content = req.body.postText;
var user = req.body.user;
var sql = "INSERT INTO bugreport (user, title, text) VALUES (?, ?, ?)";
con.query(sql, [user, title, content], function (err, result) {
    if (err) throw err;
    console.log("[MODERATION] Bug report sended!");
});
res.redirect('back');
});

//Обработчик публикации заказов
router.post('/ordmod', function (req,res,next) {
    var id = req.body.id;
    var sql = "UPDATE works SET moder_status = 2 WHERE id = (?)";
    con.query(sql, [id], function (err, result) {
        if (err) throw err;
    });
    res.redirect('back');
});

router.post('/moderation/orderinfo', function (req,res,next) {
    var id = req.body.id;
    var data = req.data;
    data.title = 'Информация о заказе';
    data.ordinfo=[];
    var sql = "SELECT * FROM works WHERE id = (?)";
    con.query(sql, [id], function (err, rows, fields) {
        if (!err)
            console.log('[MODERATION] Get information about order ID', id);
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.ordinfo.push(JSON.stringify(rows[i]));
                }
            }
        }
        res.render('orderinfo', data);
    }); 
});

//Обработчик перехода к редактированию заказа
router.post('/moderation/ordedit', function(req, res, next){
    res.render('ordedit');
});

//Обработчик отклонения заказов
router.post('/orddeny', function (req,res,next) {
    var id = req.body.id;
    var sql = "UPDATE works SET moder_status = 3 WHERE id = (?)";
    con.query(sql, [id], false, function (err, result) {
        if (err) throw err;
    });
    res.redirect('back');
});

//Блокировка учетной записи
router.get('/moderation/ban', function(req, res, next){
    res.render('ban');
});