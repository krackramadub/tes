var express = require('express');
var router = express.Router();
var path = require('path');

var mysql = require('mysql');
/* GET home page. */

function connect(data,tableName, variable){

  var mySqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diplom',
  };
  var con = mysql.createConnection(mySqlConfig)
con.connect(function(err){
  if(!err)
    console.log("DB Connected.")
  else
    console.log("DB error.")
})

  con.query('SELECT * from diplom.'+ tableName + ' ' + variable,(err, rows)=>{   
    if (!err)
          console.log('The solution is: ' + rows.length);
        else
          console.log('Error while performing Query.');
          if(rows){
           for(var i =0; i < rows.length;i++){
              for(var i in rows){
                data.bugs.push(JSON.stringify(rows[i]))
             }
             var callback = true
             return callback 
           }
         }
         else{
           console.log("Bugreports with STATUS = 0 not found!");
         }
     });
    //  con.query('SELECT * from diplom.bugreport WHERE status=1',function(err, rows, fields) {
    //    if (!err)
    //      console.log('The solution is: ' + rows.length);
    //    else
    //      console.log('Error while performing Query.');
    //      if(rows){
    //        for(var i =0; i < rows.length;i++){
    //            for(var i in rows){
    //            data.solved.push(JSON.stringify(rows[i]))
    //          }   
    //        }
    //        renderPost();
    //      }
    //      else{
    //        console.log("Bugreports with STATUS = 1 not found!");
    //        renderPost();
    //      }
   // });
}
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
    //var data = req.data;
    res.render('message_test',{title:"TExt"});
        //{user:{username:"Users", role:["1","2"]}})
})
router.get('/message_test',function (req,res, next) {
  res.render('message_test',{ title: 'tSolving' });
})
router.get('/registration', function(req, res, next) {
    res.render('registration', { title: 'tSolving' ,bread: "idol", extend: 'layout_for_reg'});
    
});
router.get('/bugreport', function(req, res, next) {
  var data = req.data
  data.title = "tSolving"
  res.render('bugreport', data);
});
router.get('/bugs', function(req, res, next) {
  var data = req.data;
  data.title = "tSolving"
  data.bugs = [];
  data.solved = [];
  data.user;
  //data.resultArray = [];

//    var mySqlConfig = {
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'diplom',
//  };
//  var con = mysql.createConnection(mySqlConfig)
//  con.connect(function(err){
//    if(!err){
//      console.log("DB Connected.")
//    }else{
//      console.log("DB error.")
//    };
    
//  })
//  con.query('SELECT * from diplom.bugreport WHERE status=0',function(err, rows, fields) {
//        if (!err)
//          console.log('The solution is: ' + rows.length);
//        else
//          console.log('Error while performing Query.');
//          if(rows){
//           for(var i =0; i < rows.length;i++){
//              for(var i in rows){
//               data.bugs.push(JSON.stringify(rows[i]))
//             }   
//           }
//         }
//         else{
//           console.log("Bugreports with STATUS = 0 not found!");
//         }
//     });
//     con.query('SELECT * from diplom.bugreport WHERE status=1',function(err, rows, fields) {
//       if (!err)
//         console.log('The solution is: ' + rows.length);
//       else
//         console.log('Error while performing Query.');
//         if(rows){
//           for(var i =0; i < rows.length;i++){
//               for(var i in rows){
//               data.solved.push(JSON.stringify(rows[i]))
//             }   
//           }
//           renderPost();
//         }
//         else{
//           console.log("Bugreports with STATUS = 1 not found!");
//           renderPost();
//         }
//    })
      getBugsFromDb(data,res)
      //res.render('bugs',data )
      
      

     //console.log("Value: " + JSON.stringify(resultArray));
  
})
function getBugsFromDb(data,res){
  
  var dbRes
  //for(var i=0; i < 1; i++)
    dbRes = connect(data,"bugreport", "WHERE status=0")
    if(dbRes)
      if(dbRes.user.roles == "admin"){
        res.render('bugs',data);
      }else{
        data.info= "Извините, у вас нет доступа к этому разделу."
        data.user = data.user
        res.render('bugs',data )
      }
     //break;
    else
      data.info= "Извините, у вас нет доступа к этому разделу."
      res.render('bugs',data )
}
// router.get('/support',function(req,res,next){
//   var data = req.data;
//   data.title = "tSolving";
//   // if(data.user == undefined){
//   //   data.user = "guest"
//   // }
//   res.render('support',data)
// })
router.post('/insertbugs',function(req,res,next){
  var data = req.data;
  var title = req.body.postTitle;
  var content = req.body.postText;
  var username = req.body.username_h; //получаем имя пользователя (работает!)
  console.log(title + " " + username + " " + content);

 var mySqlConfig = {
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'diplom',
 };
 var con = mysql.createConnection(mySqlConfig)
 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   var sql = "INSERT INTO bugreport (username, title, text) VALUES ('"+ username +"', '"+ title +"', '"+ content +"')";
   con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
   });
 });
  res.redirect('/');
})

router.post('/changebug',function(req,res,next){

 var mySqlConfig = {
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'diplom',
 };
 var con = mysql.createConnection(mySqlConfig)
 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   var sql = "UPDATE bugreport SET status=1 WHERE status=0";
   con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Bug status changed!");
   });
 });
  res.redirect('/bugs');
})

router.post('/register',function(req,res,next){
  var login = req.body.login;
  var passwd = req.body.passwd;
  var phone = req.body.phone;
  var email = req.body.email;
  var nickname = req.body.nickname;

  console.log(login + " | " + passwd + "|" + phone + "|" + email + "|" + nickname);

 var mySqlConfig = {
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'diplom',
 };
 var con = mysql.createConnection(mySqlConfig)
 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   var sql = "INSERT INTO users (login, password,phone,email,nickname) VALUES ('"+ login +"', '"+ passwd +"','"+ phone +"','"+ email +"','"+ nickname +"')";
   con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
   });
 });
  res.redirect('/');
})
router.get('/uploadfile', function(req,res,next){
  var data = req.data;
  data.title = "tSolving";
  res.render('uploadfile', data);
})
router.post('/uploadf', function(req,res){
  console.log("upload")
 var file = req.files.sampleFile;
  var filename = file.name;
  var updir = path.resolve(__dirname,'..') + "/uploadfiles/" + filename;
  file.mv(updir, function(err){
    if(err){
      console.log("error upload");
    } else{
      console.log("done!")
    }
  })
});
module.exports = router;