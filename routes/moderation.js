//Модуль системы модерации и технической поддержки для проекта "ezReshneie"
//Разработал Пыжов Павел, группа 431ПО
//еще один комментарий на всякий случай

//Подключение зависимых модулей
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

module.exports = router;

//Вывод сообщения об успешном подключении модуля в консоль
console.log("[MODERATION] Module connected successfuly!");

//Подключение главной страницы личного кабинета системы модерации
router.get('/moderation', function(req,res){
    var data = req.data;
    //Проверяем роль пользователя в целях защиты от несанкционированного доступа
    //В случае входа пользователя с ролью поддержки перенаправляем его на соответствующую страницу
    if(data.user.roles == "moder"){
        data.title = "Система модерации ''ezReshenie''";
        res.render('moderation', data);
        //Выводим в консоль сообщение об успешном входе
        console.log("[MODERATION] User", data.user.username, "login successfully!");
    }
    //При попытке несанкционированного доступа сообщаем об отсутствии прав на доступ к странице
    else{
         res.render('denied');
         //В консоль сервера выводим сообщение о попытке несанкционированного доступа
         console.log("[MODERATION] Access for", data.user.username, "denied!");
    }
});

module.exports = router

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


router.get('/moderation/work', function(req, res, next) {
    //Задаем необходимые переменные. В данном случае - заголовок страницы и 2 массива для хранения данных
    // var data = req.data;
    // data.title = "ezReshenie"
    // data.support = [];
    // data.support_inwork = [];

//Подключение к базе данных
var mySqlConfig = {
    host: 'localhost', //расположение БД
    user: 'root', //имя пользователя
    password: '', //пароль
    database: 'diplom', //название БД
};

//Обращение к базе данных
var con = mysql.createConnection(mySqlConfig)
 con.connect(function(err){
   if(!err){
     console.log("DB Connected.")
   }else{
     console.log("DB error.")
   };
 })

//  //Выполнение запросов к БД для получения хранящихся в ней заявок
//  //Сначала выполняем запрос необработанных заявок (status = 0)
//  con.query('SELECT * from diplom.support WHERE status=0',function(err, rows, fields) {
//        if (!err)
//          //Проверяем выполнение запроса. Если он выполнен успешно, выводим сообщение с количеством записей
//          console.log('The solution is: ' + rows.length);
//        else
//          //В случае ошибки выводим в консоль сообщение
//          console.log('Error while performing Query.');
//          //
//          if(rows != ""){
//           for(var i =0; i < rows.length;i++){
//              for(var i in rows){
//               data.support.push(JSON.stringify(rows[i]))
//             }   
//           }
//         }
//         //Если необработанных заявок нет, то выводим сообщение в консоль
//         else{
//           console.log("Support data with STATUS = 0 not found!");
//         }
//     });
//     //То же самое, что и в 1 случае, только для обработанных заявок (в случае, если был дан ответ)
//     //Данный код дублирует предыдущий лишь с той разницей, что выбираются заявки с значением status = 1
//     con.query('SELECT * from diplom.support WHERE status=1',function(err, rows, fields) {
//       if (!err)
//         console.log('The solution is: ' + rows.length);
//       else
//         console.log('Error while performing Query.');
//         if(rows != ""){
//           for(var i =0; i < rows.length;i++){
//               for(var i in rows){
//               data.support_solved.push(JSON.stringify(rows[i]))
//             }   
//           }
//         }
//         else{
//           console.log("Support data with STATUS = 1 not found!");
//         }
//    })
})