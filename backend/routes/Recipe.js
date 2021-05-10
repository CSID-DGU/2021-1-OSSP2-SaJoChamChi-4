var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);

var fs = require('fs');
var data = fs.readFileSync('testRecipe.json','utf8');
var jsonData = JSON.parse(data);

router.post('/',(req,res)=>{
    for(idx in jsonData){
        console.log('hi : '+req.body.id);
        if(jsonData[idx].id==req.body.id)
                res.send(jsonData[idx]);
    }
    //console.log(jsonData);
    //res.json(jsonData);
});

module.exports = router;