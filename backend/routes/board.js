const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const config = require("../config/database");
var db = mysql.createConnection(config.mysql);


router.post("/insertBoard",(req,res)=>{
    //insert
    var b_Title = req.body.b_Title;
    var b_Content = req.body.b_Content;
    var b_Time = req.body.b_Time;
    var b_Hits = req.body.b_Hits;
    var b_Writer = req.body.b_Writer;
    console.log('hihi');

    var sql = 'INSERT INTO Board VALUES(?,?,?,?, null,?)'
    db.query(sql,[b_Title,b_Content,b_Time,b_Hits,b_Writer], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(rows);
            res.json({state : "Insert done"});
        }
    });
});


router.post("/getBoard",(req,res)=>{
    //retrieve - b_Id�� ã�´�.
    db.query('SELECT * FROM Board where b_Id=?',[req.body.b_Id], (err,rows)=>{
        if(err) console.log(err);
        else {
            //console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});

router.post("/allBoard",(req,res)=>{
    //retrieve - b_Id로 찾는다.
    db.query('SELECT * FROM Board', (err,rows)=>{
        if(err) console.log(err);
        else {
            //console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});

router.post('/deleteBoard',(req,res)=>{
    //delete - b_Id로 삭제한다.
    const sql = "DELETE FROM Board WHERE b_Id = ?";
    
    db.query(sql,[req.body.b_Id],(err,rows) =>{
        if(err) console.log(err);
        else{
            res.json({state : "Delete done"});
        }
    });
});

router.post('/GoodUp',(req,res)=>{
    //delete - b_Id로 삭제한다.
    const sql = "INSERT INTO good VALUES(?,?,?,?, null,?) ";
    
    db.query(sql,[req.body.b_Id],(err,rows) =>{
        if(err) console.log(err);
        else{
            res.json({state : "Delete done"});
        }
    });
});

router.post('/MygoodBoard',(req,res)=>{
    var usr_Id = req.body.usr_Id;
    const sql = 'SELECT * FROM Board, good where b_Id=g_Bno AND g_Uid=?';
    
    db.query(sql,[usr_Id],(err,rows) =>{
        if(err) console.log(err);
        else{
            res.json(rows);
        }
    });
});


module.exports = router;