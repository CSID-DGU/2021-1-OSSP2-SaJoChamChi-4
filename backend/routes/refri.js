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

router.post("/Insert",(req,res)=>{
    var rf_Pname = req.body.rf_Pname;
    var rf_Number = req.body.rf_Number;
    var rf_EPdate = req.body.rf_EPdate;
    var rf_Indate = req.body.rf_Indate;
    var rf_Frozen = req.body.rf_Frozen;
    var rf_Foodid = req.body.rf_Foodid;
    var rf_FKind = req.body.rf_FKind;
    var rf_usr = req.body.rf_usr;
    var sql = 'INSERT into refrigerator(rf_Pname, rf_Number, rf_EPdate,rf_Indate, rf_Frozen, rf_Foodid,rf_FKind, rf_usr) Values(?,?,?,?,?,?,?,?);'
    db.query(sql,[ rf_Pname,rf_Number,rf_EPdate, rf_Indate, rf_Frozen, rf_Foodid, rf_FKind, rf_usr], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("Refri insert log :", rows);
            res.json(rows);}
    });
});

router.post("/delete",(req,res)=>{
    var item = req.body.Pname;
    var sql = 'Delete FROM refrigerator WHERE rf_Pname=?;'
    db.query(sql,[item], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("Refri Delete log :", rows);
            res.json(rows);}
    });
});

router.post("/Update",(req,res)=>{
    var rf_Pname = req.body.rf_Pname;
    var rf_Number = req.body.rf_Number;
    var rf_EPdate = req.body.rf_EPdate;
    var rf_Indate = req.body.rf_Indate;
    var rf_Frozen = req.body.rf_Frozen;
    var rf_Foodid = req.body.rf_Foodid;
    var rf_FKind = req.body.rf_FKind;
    var rf_usr = req.body.rf_usr;
    var sql = 'UPDATE refrigerator SET rf_Pname=?, rf_Number=?, rf_EPdate=?,rf_Indate=?, rf_Frozen=?, rf_Foodid=?,rf_FKind=? WHERE rf_Pname=? AND rf_usr=?;'
    db.query(sql,[ rf_Pname,rf_Number,rf_EPdate, rf_Indate, rf_Frozen, rf_Foodid, rf_FKind, rf_Pname, rf_usr], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("Refri update log :", rows);
            res.json(rows);}
    });
});

module.exports = router;
