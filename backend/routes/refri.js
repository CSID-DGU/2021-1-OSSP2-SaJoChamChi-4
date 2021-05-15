var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.post("/getList",(req,res)=>{
    var usr_Id = req.body.usr_id;
    db.query('SELECT * FROM refrigerator WHERE rf_usr=?',[usr_Id], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);}
    });
});


module.exports = router;
