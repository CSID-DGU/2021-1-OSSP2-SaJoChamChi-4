const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);

router.post("/IsGood",(req,res)=>{
    var g_Bno = req.body.bno;
    var g_Uid = req.body.usr_Id;
    var sql = 'SELECT * FROM good WHERE g_Bno=? AND g_Uid=?;'
    db.query(sql,[g_Bno, g_Uid], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("냉장고 안의 data :", rows);
            res.json(rows);}
    });
});


router.post("/Insert",(req,res)=>{
    var g_Bno = req.body.bno;
    var g_Uid = req.body.usr_Id;
    var sql = 'INSERT INTO good VALUES(null,?,?);'
    var item = [g_Bno, g_Uid];
    var sqls1 = mysql.format(sql,item);
    var sql2 = 'SELECT * FROM good WHERE g_Bno=? AND g_Uid=?;'
    var sqls2 = mysql.format(sql2, item);
    var sql3 = `UPDATE board SET b_Hits = b_Hits + 1 WHERE b_Id=?;`
    var sqls3 = mysql.format(sql3,g_Bno);
    db.query(sqls1+sqls2+sqls3, (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("COMMENT info data :", rows[1]);
            res.json(rows[1]);}
    });
});

router.post("/Delete",(req,res)=>{
    var g_Bno = req.body.bno;
    var g_Uid = req.body.usr_Id;
    var sql = 'DELETE FROM good WHERE g_Bno=? AND g_Uid=?;'
    var item = [g_Bno, g_Uid];
    var sqls1 = mysql.format(sql,item);
    var sql2 = 'SELECT * FROM good WHERE g_Bno=? AND g_Uid=?;'
    var sqls2 = mysql.format(sql2, item);
    var sql3 = `UPDATE board SET b_Hits = b_Hits - 1 WHERE b_Hits > 0 AND b_Id=?;`
    var sqls3 = mysql.format(sql3,g_Bno);
    db.query(sqls1+sqls2+sqls3, (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log("COMMENT info data :", rows[1]);
            res.json(rows[1]);}
    });
});



module.exports = router;