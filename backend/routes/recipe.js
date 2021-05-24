var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);

var fs = require('fs');
const { resetWarningCache } = require("prop-types");
var data = fs.readFileSync('testRecipe.json','utf8');
var jsonData = JSON.parse(data);

router.post('/',(req,res)=>{
    for(idx in jsonData){
        //console.log('hi : '+req.body.id);
        //if(jsonData[idx].id==req.body.id){
            var sql = 'INSERT INTO RECIPE VALUES(?,?,?,?)'
            var id = jsonData[idx].id;
            var name = jsonData[idx].name;
            var img = jsonData[idx].img;
            var summary = jsonData[idx].summary;
            
            db.query(sql,[id,name,img,summary], (err,rows)=>{
            if(err) console.log(err);
            else {
             //console.log(rows);
             //res.json({state : "Insert done"});
             }
            });
            
            sql = 'INSERT INTO info VALUES(?,?,?,?)';
            console.log("info1 : "+jsonData[idx].info.info1);
            
            db.query(sql,[id,jsonData[idx].info.info1,jsonData[idx].info.info2,jsonData[idx].info.info3], (err,rows)=>{
                if(err) console.log(err);
                else {
                 //console.log(rows);
                 //res.json({state : "Insert done"});
                 }
                });
                         
            sql = 'INSERT INTO INGRE VALUES(?,?,?,?)';
            for(i in jsonData[idx].ingre){
                var ingre_name = jsonData[idx].ingre[i].ingre_name;
                var ingre_count = jsonData[idx].ingre[i].ingre_count;
                var ingre_unit = jsonData[idx].ingre[i].ingre_unit;
                
                db.query(sql,[id,ingre_name,ingre_count,ingre_unit], (err,rows)=>{
                    if(err) console.log(err);
                    else {
                     //console.log(rows);
                     //res.json({state : "Insert done"});
                     }
                    });
                    
            }

            sql = 'INSERT INTO detailRecipe VALUES(?,?,?)';
            console.log('sadfdas');
            for(i in jsonData[idx].recipe){
                var txt = jsonData[idx].recipe[i].txt;
                var img = jsonData[idx].recipe[i].img;
                console.log(txt);
                db.query(sql,[id,txt,img], (err,rows)=>{
                    if(err) console.log(err);
                    else {
                     //console.log(rows);
                     //res.json({state : "Insert done"});
                     }
                    });
            }
            

            //console.log()
            //res.json({state : "Insert done"});
            //db.query(sql,[])

        //}
    }
    res.json({state : "Insert done"});
    //console.log(jsonData);
    //res.json(jsonData);
});

router.post('/getRecipe',(req,res)=>{
    var ret='';
    var id = req.body.id;
    console.log('id==?'+id);
    var sql = 'SELECT * FROM RECIPE WHERE id='+id+';';
    var sqls = mysql.format(sql,id);
    //ret+='asdf';

    sql = 'SELECT * FROM info WHERE id='+id+';';
    sqls += mysql.format(sql,id);

    sql = 'SELECT * FROM ingre WHERE id='+id+';';
    sqls += mysql.format(sql,id);

    sql = 'SELECT * FROM detailRecipe WHERE id='+id+';';
    sqls += mysql.format(sql,id);
    
    var options = {sqls, nestTables: true};
    db.query(sqls,(err,rows)=>{
        if(err) console.log(err);
        else {
            console.log('rows[0] : '+rows);
         res.json({main : rows[0], info: rows[1], ingre: rows[2], rec: rows[3]});
         }
        });
    //console.log(ret);
    
});

module.exports = router;