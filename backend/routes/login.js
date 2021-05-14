const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.post("/Login",(req,res)=>{
    //login
    var user_Id = req.body.id; // req.params.id
    var usr_Pwd = req.body.pwd;
    var sql = 'SELECT usr_Name, usr_Id FROM user WHERE user_Id=? AND usr_Pwd=?'
    db.query(sql,[user_Id, usr_Pwd], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);}
    });
});


router.post("/insertUser",(req,res)=>{
    //insert
    var usr_id = null;
    var usr_Pwd = req.body.usr_pwd;
    var usr_Name = req.body.usr_Name;
    var usr_Nickname = req.body.usr_Nickname;
    var usr_Email = req.body.usr_Email;
    var usr_Birth = req.body.usr_Birth;
    var usr_Address = req.body.usr_Address;
    var usr_Day = req.body.usr_Day;
    var usr_Rdate = req.body.usr_Rdate;
    var user_Id = req.body.user_Id; // req.params.id
    

    var sql = 'INSERT INTO user VALUES(null, ?,?,?,?,?,?,?,?,?)'
    db.query(sql,[usr_Pwd,usr_Name,usr_Nickname,usr_Email,usr_Birth,usr_Address,usr_Day,usr_Rdate,user_Id], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json({state : "Insert done"});
        }
    });
});


router.post("/getUser",(req,res)=>{
    //retrieve
    db.query('SELECT * FROM user where user_Id=?',[req.body.id], (err,rows)=>{
        if(err) console.log(err);
        else {
            //console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});

router.post('/deleteUser',(req,res)=>{
    //delete
    const sql = "DELETE FROM user WHERE user_Id = ?";
    
    db.query(sql,[req.body.id],(err,rows) =>{
        if(err) console.log(err);
        else{
            res.json({state : "Delete done"});
        }
    });
});


/*
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

*/

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