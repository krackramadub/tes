var express = require('express');
var router = express.Router();

var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
    
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
        data.title= "tSolving";
           res.render('index', data);
 //     }
});
router.get('/logout', function(req,res){
    res.clearCookie("auth_token");
    res.redirect('/');

})
router.get('/messages',function (req,res) {
    var data = req.data;
    res.render('message_test', data);
        //{user:{username:"Users", role:["1","2"]}})
})
router.get('/registration', function(req, res, next) {
    res.render('registration', { title: 'tSolving' ,bread: "idol", extend: 'layout_for_reg'});
    
});
router.get('/download', function(req, res, next) {
  res.render('download', { title: 'tSolving' });
});
router.get('/posts', function(req, res, next) {
  var resultArray = [];

 // var mySqlConfig = {
 //   host: 'localhost',
 //   user: 'root',
 //   password: '12345',
 //   database: 'webwork',
//  };
//  var con = mysql.createConnection(mySqlConfig);
//  con.connect(function(err){
//    if(!err){
//      console.log("DB Connected.")
//    }else{
 //     console.log("DB error.")
//    };
//    
//  })
//  con.query('SELECT * from webwork.posts',
//      function(err, rows, fields) {
 //       if (!err)
//          console.log('The solution is: ' + rows.length);
//        else
//          console.log('Error while performing Query.');
          
          //for(var i =0; i < rows.length;i++){
//        for(var i in rows){
//          resultArray.push(rows[i]);
          
//        }
        
 //       render()
//        con.end();
//      });
 //     function render(){

        res.render('posts', { item: JSON.stringify(resultArray), title: 'tSolving' });
        //console.log("Value: " + JSON.stringify(resultArray));
//      }
  
});
router.post('/insert',function(req,res,next){
  var title = req.body.postTitle;
  var content = req.body.postText;
  console.log(title + " " + content);

//  var mySqlConfig = {
//    host: 'localhost',
//    user: 'root',
 //   password: '12345',
//    database: 'webwork',
//  };
//  var con = mysql.createConnection(mySqlConfig)
//  con.connect(function(err) {
 //   if (err) throw err;
//    console.log("Connected!");
//    var sql = "INSERT INTO posts (post_title, post_text) VALUES ('"+ title +"', '"+ content +"')";
 //   con.query(sql, function (err, result) {
//      if (err) throw err;
//      console.log("1 record inserted");
//    });
//  });
  res.redirect('/posts');
})
router.post('/register',function(req,res,next){
  var login = req.body.email;
  var passwd = req.body.pwd;
  console.log(login + " | " + passwd);

 var mySqlConfig = {
   host: 'localhost',
   user: 'root',
   password: '12345',
   database: 'diplom',
 };
 var con = mysql.createConnection(mySqlConfig)
 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   var sql = "INSERT INTO testUsers (login, passwd) VALUES ('"+ login +"', '"+ passwd +"')";
   con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
   });
 });
  res.redirect('/');
})
module.exports = router;
