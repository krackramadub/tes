var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var user_data = require('./user_data')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req,res){
  res.render('login', {title:"Login page"})
})
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
          res.redirect("/users/user_info");

        }
      }
    }
    res.render("login", {info:"error. try again"})
    
  })
})
router.get('/user_info', function(req,res){
  var data = req.data;
  data.title = "tSolving"
    res.render('user_info', data)
})
module.exports = router;
