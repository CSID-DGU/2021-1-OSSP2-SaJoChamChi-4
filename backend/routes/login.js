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
            console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});


module.exports = router;