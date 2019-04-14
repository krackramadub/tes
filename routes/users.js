var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var user_data = require('./user_data');
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req,res){
  res.render('login',{title:'tSolving'})
})
var user_db = [];
router.post('/login',function(req,res){
 

  var form = new multiparty.Form();
  form.parse(req, function(error,fields,files){
    if(fields){
      var login = fields.login[0];
      var password = fields.password[0];
      if(login && password){
        var user_result = user_data.check_login(login,password);
        if(user_result.is_authenticate == true){
          var secret = req.app.get('secret');
          var token = user_data.get_token(user_result.user,secret);
          res.cookie("auth_token", token);
          //Перенаправления на страницы в зависимости от роли пользователя, указанной в БД:
          if(user_result.user.roles == "user"){
            res.redirect("/users/user_info");
            console.log("User login!")
          }
          //Для админа:
          if(user_result.user.roles == "admin"){
            res.redirect("/users/user_info");
            console.log("Admin login!"); //отладка
          }
          //Для технической поддержки:
          if(user_result.user.roles == "support"){
            res.redirect("/support");
            console.log("Support login!");
          }
          else{
            res.render("login", {info:"error. try again"})
          }
        }else{
          var data = []
          data.title = "tSolving"
          data.info = "Введен неправильный логин или пароль"
          res.render("login",data)
        }
      }
    }
  })
})

//Для пользователя
router.get('/user_info', function(req,res){
  var data = req.data;
  data.title = "tSolving"
    res.render('user_info', data)
})

module.exports = router