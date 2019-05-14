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
  database: 'diplom', //название БД
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
    if(data.user.roles == "moder"){
        data.title = "Система модерации ''ezReshenie''";        
        //Запросы отзывов из базы данных (1 запрос - ожидающие модерацию, 2 запрос - отклоненные)
        data.reviews=[];
        data.rdenied=[];
        con.query('SELECT * from review WHERE status=0', false, function (err, rows, fields) {
          if (!err)
              console.log('[MODERATION] Pending reviews: ' + rows.length);
          if (rows) {
              for (var i = 0; i < rows.length; i++) {
                  for (var i in rows) {
                      data.reviews.push(JSON.stringify(rows[i]))
                  }
              }
          }
          con.query('SELECT * from review WHERE status=2', false, function (err, rows, fields) {
              if (!err)
                  console.log('[MODERATION] Denied reviews : ' + rows.length);
              if (rows) {
                  for (var i = 0; i < rows.length; i++) {
                      for (var i in rows) {
                          data.rdenied.push(JSON.stringify(rows[i]));
                      }
                  }
              }
            });
            res.render('moderation', data);
            //Выводим в консоль сообщение об успешном входе
            console.log("[MODERATION] User", data.user.username, "login successfully!");
          });
    //При попытке несанкционированного доступа сообщаем об отсутствии прав на доступ к странице
   } else{
         res.render('denied');
         //В консоль сервера выводим сообщение о попытке несанкционированного доступа
         console.log("[MODERATION] Access for", data.user.username, "denied!");
    }
});

//Обработчик блокировки (бана)
router.get('/banned', function(req,res){
  var data = req.data;
  data.title = "Ваша учетная запись заблокирована! - ezResheinie";
  //Сразу разлогиниваем забаненного пользователя
  res.clearCookie("auth_token");
    res.render('banned', data);
    //Выводим в консоль сообщение о попытке входа заблокированного пользователя
    console.log("[User control system] This user is banned!");
});

//Отправка отчета об ошибках
router.post('/minsertbugs', function (req, res, next) {
var data = req.data;
var title = req.body.postTitle;
var content = req.body.postText;
var username = req.body.user;
var sql = "INSERT INTO bugreport (username, title, text) VALUES (?, ?, ?)";
query(sql, [username, title, content], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});
res.redirect('back');
});


