const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.post("/Login",(req,res)=>{
    var user_Id = req.body.id; // req.params.id
    var usr_Pwd = req.body.pwd;
    var sql = 'SELECT usr_Name, usr_Id FROM user WHERE user_Id=? AND usr_Pwd=?'
    db.query(sql,[user_Id, usr_Pwd], (err,rows)=>{
        if(err) console.log(err);
        else {
           // console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});



router.post("/Signup",(req,res)=>{
    var usr_Pwd = req.body.pwd;
    var usr_Name = req.body.name;
    var usr_Nickname = req.body.nickname;
    var usr_Email = req.body.email;
    var usr_Birth = req.body.birth;
    var usr_Address = req.body.address;
    var usr_Day = req.body.day;
    var user_Id = req.body.id;
    var sql = 'INSERT into user(usr_Id, usr_Pwd, usr_Name,usr_Nickname, usr_Email, usr_Birth, usr_Address, usr_Day, usr_Rdate, user_Id) Values(Null,?,?,?,?,?,?,?,now(),?);'
    db.query(sql,[ usr_Pwd,usr_Name,usr_Nickname, usr_Email, usr_Birth, usr_Address, usr_Day, user_Id], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);}
    });
});

router.post("/Profile",(req,res)=>{
    var usr_Id = req.body.id;
    db.query('SELECT * FROM user WHERE usr_Id=?',[usr_Id], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);}
    });
});
module.exports = router;