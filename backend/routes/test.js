var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.get("/getUser",(req,res)=>{
    db.query('SELECT * FROM user', (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});


module.exports = router;
