var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.get("/getUser",(req,res)=>{
    console.log(req.body.id);
    db.query('SELECT * FROM user where user_Id=?',[req.body.id], (err,rows)=>{
        if(err) console.log(err);
        else {
            //console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});

router.post("/insert",(req,res)=>{
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
            res.redirect('/test/getUser');}
    });
});

router.get("/delete",(req,res)=>{
    const sql = "DELETE FROM user WHERE user_Id = '"+req.query.id+"'";
    
    db.query(sql,[req.params.id],(err,rows) =>{
        if(err) console.log(err);
        else{
            res.redirect('/test/getUser');
        }
    })
});




module.exports = router;
