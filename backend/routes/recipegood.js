const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);

router.post("/IsGood",(req,res)=>{
    var rg_Rno = req.body.rno;
    var rg_Uid = req.body.usr_Id;
    var sql = 'SELECT * FROM recipegood WHERE rg_Rno=? AND rg_Uid=?;'
    db.query(sql,[rg_Rno, rg_Uid], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("레시피 좋아요 data :", rows);
            res.json(rows);}
    });
});


router.post("/Insert",(req,res)=>{
    var rg_Rno = req.body.rno;
    var rg_Uid = req.body.usr_Id;
    var sql = 'INSERT INTO recipegood VALUES(null,?,?);'
    var item = [rg_Rno, rg_Uid];
    var sqls1 = mysql.format(sql,item);
    var sql2 = 'SELECT * FROM recipegood WHERE rg_Rno=? AND rg_Uid=?;'
    var sqls2 = mysql.format(sql2, item);
    db.query(sqls1+sqls2, (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("COMMENT info data :", rows[1]);
            res.json(rows[1]);}
    });
});

router.post("/Delete",(req,res)=>{
    var rg_Rno = req.body.rno;
    var rg_Uid = req.body.usr_Id;
    var sql = 'DELETE FROM recipegood WHERE rg_Rno=? AND rg_Uid=?;'
    var item = [rg_Rno, rg_Uid];
    var sqls1 = mysql.format(sql,item);
    var sql2 = 'SELECT * FROM recipegood WHERE rg_Rno=? AND rg_Uid=?;'
    var sqls2 = mysql.format(sql2, item);
    db.query(sqls1+sqls2, (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("COMMENT info data :", rows[1]);
            res.json(rows[1]);}
    });
});



module.exports = router;