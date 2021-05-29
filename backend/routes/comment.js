const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);

router.post("/insertComment",(req,res)=>{
    var co_Writer = req.body.c_writer;
    var co_Time = req.body.c_time;
    var co_Content = req.body.c_content;
    var co_Bid = req.body.c_bid;
    var sql = 'INSERT into COMMENT VALUES(null, ?, ?, ?, ?)'

    db.query(sql,[co_Writer,co_Time,co_Content,co_Bid], (err,rows)=>{
        if(err) console.log(err);
        else{
            console.log("Insert Comment : ", rows);
            res.json(rows);
        }
    });
});

router.post("/getComment",(req,res)=>{
    var co_Bid = req.body.c_bid;
    var sql = 'SELECT * FROM COMMENT where co_Bid=?'
    db.query(sql, [co_Bid], (err, rows)=>{
        if(err) console.log(err);
        else{
            console.log(rows);
            res.json(rows);
        }
    });
});

router.post('/deleteComment',(req,res)=>{
    var co_Writer = req.body.c_writer;
    var sql = "DELECT FROM COMMENT WHERE co_Writer = ?";
    db.query(sql,[co_Writer],(err,rows)=>{
        if(err) console.log(err);
        else{
            res.json({state : "Delete done"});
        }
    });
});

module.exports = router;