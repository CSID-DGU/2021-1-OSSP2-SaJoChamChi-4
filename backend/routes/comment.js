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
    //retrieve - co_Bid로 찾는다. 게시글에 달린 댓글을 보여주는 것.
    db.query('SELECT * FROM Comment where co_Bid=?',[req.body.co_Bid], (err,rows)=>{
        if(err) console.log(err);
        else {
            //console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});

router.post('/deleteComment',(req,res)=>{
    //delete - co_Id로 삭제한다.
    const sql = "DELETE FROM Comment WHERE co_Id = ?";
    
    db.query(sql,[req.body.co_Id],(err,rows) =>{
        if(err) console.log(err);
        else{
            res.json({state : "Delete done"});
        }
    });
});




module.exports = router;