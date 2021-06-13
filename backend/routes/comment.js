const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.post("/insertComment",(req,res)=>{
    //insert
    var co_Writer = req.body.co_Writer;
    var co_Time = req.body.co_Time;
    var co_Content = req.body.co_Content;
    var co_Bid = req.body.co_Bid;
    console.log('insert Comment : '+ co_Writer);

    var sql = 'INSERT INTO Comment VALUES(null,?,?,?,?)'
    db.query(sql,[co_Writer,co_Time,co_Content,co_Bid], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json({state : "Insert done"});
        }
    });
});

router.post("/getComment",(req,res)=>{
    var co_Bid = req.body.c_bid;
    var sql = 'SELECT co_Id, co_Writer, co_Time, co_Content, co_Bid, usr_Nickname FROM COMMENT, user where co_Bid=? and usr_Id=co_Writer'
    db.query(sql, [co_Bid], (err, rows)=>{
        if(err) console.log(err);
        else{
            console.log(rows);
            res.json(rows);
        }
    });
});

router.post('/deleteComment',(req,res)=>{
    var co_Id = req.body.c_id;
    var sql = "DELETE FROM COMMENT WHERE co_Id=?";
    db.query(sql,[co_Id],(err,rows)=>{
        if(err) console.log(err);
        else{
            res.json({state : "Delete done"});
        }
    });
});

module.exports = router;