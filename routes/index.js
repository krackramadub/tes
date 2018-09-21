var express = require('express');
var router = express.Router();

var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  var users = [];
  var mySqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'webwork',
  };
  var con = mysql.createConnection(mySqlConfig)
  con.connect(function(err){
    if(!err){
      console.log("DB Connected.")
    }else{
      console.log("DB error.")
    };
    
  })
  con.query('SELECT * from user LIMIT 2',
      function(err, rows, fields) {
        con.end();
        if (!err)
          console.log('The solution is: ' + rows.length);
        else
          console.log('Error while performing Query.');
          
          //for(var i =0; i < rows.length;i++){
        for(var i in rows){
        users.push(rows[i])
          
        }
        homepage();
      });
      function homepage(){
        res.render('index', { title: 'BRANDI', someonetext:'textxt',top: JSON.stringify(users)});
      }
});

router.get('/registration', function(req, res, next) {
    res.render('registration', { title: 'BRANDI' ,bread: "idol"});
    
});
router.get('/download', function(req, res, next) {
  res.render('download', { title: 'BRANDI' });
});
router.get('/posts', function(req, res, next) {
  var resultArray = [];

  var mySqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'webwork',
  };
  var con = mysql.createConnection(mySqlConfig);
  con.connect(function(err){
    if(!err){
      console.log("DB Connected.")
    }else{
      console.log("DB error.")
    };
    
  })
  con.query('SELECT * from webwork.posts',
      function(err, rows, fields) {
        if (!err)
          console.log('The solution is: ' + rows.length);
        else
          console.log('Error while performing Query.');
          
          //for(var i =0; i < rows.length;i++){
        for(var i in rows){
          resultArray.push(rows[i]);
          
        }
        
        render()
        con.end();
      });
      function render(){

        res.render('posts', { item: JSON.stringify(resultArray), title: 'BRANDI' });
        //console.log("Value: " + JSON.stringify(resultArray));
      }
  
});
router.post('/insert',function(req,res,next){
  var title = req.body.postTitle;
  var content = req.body.postText;
  console.log(title + " " + content);

  var mySqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'webwork',
  };
  var con = mysql.createConnection(mySqlConfig)
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO posts (post_title, post_text) VALUES ('"+ title +"', '"+ content +"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
  res.redirect('/posts');
})
module.exports = router;
