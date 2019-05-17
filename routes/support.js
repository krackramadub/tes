//Модуль технической поддержки проекта 431ПО
//Разработал Пыжов Павел, группа 431ПО
//еще один комментарий на всякий случай

//Подключение зависимых модулей
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

module.exports = router;

//Вывод сообщения об успешном подключении модуля в консоль
console.log('[SUPPORT] Module connected successfuly!');

//Подключение главной страницы личного кабинета поддержки
router.get('/support', function (req, res) {
    var data = req.data;
    //Проверяем роль пользователя в целях защиты от несанкционированного доступа
    //В случае входа пользователя с ролью поддержки перенаправляем его на соответствующую страницу
    if (data.user.roles == 'support') {
        data.title = 'Поддержка 431ПО';
        res.render('support', data);
        //Выводим в консоль сообщение об успешном входе
        console.log('[SUPPORT] User', data.user.username, 'login successfully!');
    }
    //При попытке несанкционированного доступа сообщаем об отсутствии прав на доступ к странице
    else {
        res.render('denied');
        //В консоль сервера выводим сообщение о попытке несанкционированного доступа
        console.log('[SUPPORT] Access for', data.user.username, 'denied!');
    }
});


router.get('/support/work', function (req, res, next) {
    //Задаем необходимые переменные. В данном случае - заголовок страницы и 2 массива для хранения данных
    var data = req.data;
    data.title = 'tSolving';
    data.support = [];
    data.support_inwork = [];

    //Подключение к базе данных
    var mySqlConfig = require('../config');
    //Обращение к базе данных для получения заявок
    var con = mysql.createConnection(mySqlConfig);
    con.connect(function (err) {
        if (!err) {
            console.log('DB Connected.');
        } else {
            console.log('DB error.');
        }
    });

    //Выполнение запросов к БД для получения хранящихся в ней заявок
    //Сначала выполняем запрос необработанных заявок (status = 0)
    con.query('SELECT * from diplom.support WHERE status=0', function (err, rows, fields) {
        if (!err)
        //Проверяем выполнение запроса. Если он выполнен успешно, выводим сообщение с количеством записей
            console.log('The solution is: ' + rows.length);
        else
        //В случае ошибки выводим в консоль сообщение
            console.log('Error while performing Query.');
        //
        if (rows != '') {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.support.push(JSON.stringify(rows[i]));
                }
            }
        }
        //Если необработанных заявок нет, то выводим сообщение в консоль
        else {
            console.log('Support data with STATUS = 0 not found!');
        }
    });
    //То же самое, что и в 1 случае, только для обработанных заявок (в случае, если был дан ответ)
    //Данный код дублирует предыдущий лишь с той разницей, что выбираются заявки с значением status = 1
    con.query('SELECT * from diplom.support WHERE status=1', function (err, rows, fields) {
        if (!err)
            console.log('The solution is: ' + rows.length);
        else
            console.log('Error while performing Query.');
        if (rows != '') {
            for (var i = 0; i < rows.length; i++) {
                for (var i in rows) {
                    data.support_solved.push(JSON.stringify(rows[i]));
                }
            }
        } else {
            console.log('Support data with STATUS = 1 not found!');
        }
    });
});
