var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);

var fs = require('fs');
var data = fs.readFileSync('testRecipe.json','utf8');
var jsonData = JSON.parse(data);

router.get('/',(req,res)=>{
        jsonData.filter(function(element){
            console.log(element);
            if(element.name='닭똥집보다 맛있는 골뱅이튀김! 에어프라이어 만들어봐요! ')
                res.send(element);
        });
    //console.log(jsonData);
    //res.json(jsonData);
});

module.exports = router;