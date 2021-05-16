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

var fs = require('fs');
var data = fs.readFileSync('recipe.json','utf8');
var jsonData = JSON.parse(data);


router.post('/jsontest',(req,res)=>{
    for(idx in jsonData){
        console.log('hi : '+req.body.id);
        if(jsonData[idx].id==req.body.id)
                res.send(jsonData[idx]);
    }

});



router.post("/Receipt",(req,res)=>{
    var sql = 'INSERT into recipe(r_Id, name, img, summary, info, ingre, recipe) Values(?,?,?,?,?,?,?);'
    for(idx in jsonData){
        db.query(sql,[jsonData[idx].id, jsonData[idx].name, jsonData[idx].img, jsonData[idx].summary, jsonData[idx].info,jsonData[idx].ingre,jsonData[idx].recipe ], (err,rows)=>{
            if(err) console.log(err);
            else {
                console.log(jsonData[idx].name)}
        });
    }
   
});

module.exports = router;
