var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);

const { resetWarningCache } = require("prop-types");
var fs = require('fs');
var data = fs.readFileSync('recipea.json','utf8');
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

router.post('/RecipeList',(req,res)=>{
    var id = req.body.id;
    console.log('id==?'+id);
    var sql = 'SELECT * FROM recipe r order by rand();';

    db.query(sql,[id], (err,rows)=>{
        if(err) console.log(err);
        else {
           // console.log("check random", rows);
         res.json(rows);
         }
        });    
});


router.post('/getdetailrecipe',(req,res)=>{
    var id = req.body.id;
    var sql = 'SELECT * FROM detailrecipe WHERE id=?;';

    db.query(sql,[id], (err,rows)=>{
        if(err) console.log(err);
        else {
         res.json(rows);
         }
        });    
});
router.post('/getinfo',(req,res)=>{
    var id = req.body.id;
    console.log('id==?'+id);
    var sql = 'SELECT * FROM info WHERE id=?;';

    db.query(sql,[id], (err,rows)=>{
        if(err) console.log(err);
        else {
         res.json(rows);
         }
        });    
});
router.post('/getingre',(req,res)=>{
    var id = req.body.id;
    console.log('id==?'+id);
    var sql = 'SELECT * FROM ingre WHERE id=?;';

    db.query(sql,[id], (err,rows)=>{
        if(err) console.log(err);
        else {
         res.json(rows);
         }
        });    
});

router.post('/getRefriRecipeList',(req,res)=>{
    var id = req.body.usr;

    var sql1 = 'set @food = (SELECT f_Name FROM refrigerator, food  WHERE rf_usr=? AND rf_Foodid=f_Id ORDER BY rf_Fkind ASC, rf_Epdate ASC limit 0,1);'
    var sqls1 = mysql.format(sql1, id);
    var sql2 = 'set @food1 = (SELECT f_Name FROM refrigerator, food  WHERE rf_usr=? AND rf_Foodid=f_Id ORDER BY rf_Fkind ASC, rf_Epdate ASC limit 1,1);'
    var sqls2 = mysql.format(sql2, id);
    var sql3 = 'set @food2 = (SELECT f_Name FROM refrigerator, food  WHERE rf_usr=? AND rf_Foodid=f_Id ORDER BY rf_Fkind ASC, rf_Epdate ASC limit 2,1);'
    var sqls3 = mysql.format(sql3, id);
    var sql4 = 'set @food3 = (SELECT f_Name FROM refrigerator, food  WHERE rf_usr=? AND rf_Foodid=f_Id ORDER BY rf_Fkind ASC, rf_Epdate ASC limit 3,1);'
    var sqls4 = mysql.format(sql4, id);
    var sql5 = 'set @food4 = (SELECT f_Name FROM refrigerator, food  WHERE rf_usr=? AND rf_Foodid=f_Id ORDER BY rf_Fkind ASC, rf_Epdate ASC limit 4,1);'
    var sqls5 = mysql.format(sql5, id);  
    var sql6 = `select * from recipe r WHERE id IN (SELECT id from ingre WHERE (ingre_name  LIKE concat('%', @food, '%') OR ingre_name  LIKE concat('%', @food1, '%') OR ingre_name  LIKE concat('%', @food2, '%') OR ingre_name  LIKE concat('%', @food3, '%') OR ingre_name  LIKE concat('%', @food4, '%')));`
    
    db.query(sqls1+ sqls2+sqls3+sqls4+sqls5+sql6,(err,rows)=>{
            if(err) console.log(err);
            else {
                console.log(rows);
                res.json(rows[5]);  
             }});    
});

router.post('/getEpdatList',(req,res)=>{
    var id = req.body.usr;

    var sql1 = 'set @food = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 0,1);'
    var sqls1 = mysql.format(sql1, id);

    var sql2 = 'set @food1 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 1,1);'
    var sqls2 = mysql.format(sql2, id);

    var sql3 = 'set @food2 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 2,1);'
    var sqls3 = mysql.format(sql3, id);

    var sql4 = 'set @food3 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 3,1);'
    var sqls4 = mysql.format(sql4, id);
    
    var sql5 = 'set @food4 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 4,1);'
    var sqls5 = mysql.format(sql5, id); 

    var sql6 = 'set @food5 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 5,1);'
    var sqls6 = mysql.format(sql6, id); 

    var sql7 = 'set @food6 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 6,1);'
    var sqls7 = mysql.format(sql7, id);

    var sql8 = 'set @food7 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 7,1);'
    var sqls8 = mysql.format(sql8, id);

    var sql9 = 'set @food8 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 8,1);'
    var sqls9 = mysql.format(sql9, id);

    var sql10 = 'set @food9 = (SELECT f_Name FROM refrigerator, food WHERE DATEDIFF(rf_EPdate,now())<=5 AND rf_Foodid=f_Id AND rf_usr=? ORDER By rf_EPdate limit 9,1);'
    var sqls10 = mysql.format(sql10, id);

    var sql11 = `select * from recipe r WHERE id IN (SELECT id from ingre WHERE (ingre_name  LIKE concat('%', @food, '%') OR ingre_name  LIKE concat('%', @food1, '%') OR ingre_name  LIKE concat('%', @food2, '%') OR ingre_name  LIKE concat('%', @food3, '%') 
    OR ingre_name  LIKE concat('%', @food4, '%') OR ingre_name  LIKE concat('%', @food5, '%')OR ingre_name  LIKE concat('%', @food6, '%')OR ingre_name  LIKE concat('%', @food7, '%')OR ingre_name  LIKE concat('%', @food8, '%')OR ingre_name  LIKE concat('%', @food9, '%'))) ORDER BY rand() limit 100;`
    
    db.query(sqls1 + sqls2 + sqls3 + sqls4 + sqls5 + sqls6 + sqls7 + sqls8 + sqls9 + sqls10 + sql11,(err,rows)=>{
            if(err) console.log(err);
            else {
                console.log(rows);
                res.json(rows[10]);  
             }});    
});

module.exports = router;