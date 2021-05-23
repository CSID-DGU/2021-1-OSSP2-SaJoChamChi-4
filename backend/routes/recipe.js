var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);

const { resetWarningCache } = require("prop-types");
// var fs = require('fs');
// var data = fs.readFileSync('testRecipe.json','utf8');
// var jsonData = JSON.parse(data);

// router.post('/',(req,res)=>{
//     for(idx in jsonData){
//         //console.log('hi : '+req.body.id);
//         //if(jsonData[idx].id==req.body.id){
//             var sql = 'INSERT INTO RECIPE VALUES(?,?,?,?)'
//             var id = jsonData[idx].id;
//             var name = jsonData[idx].name;
//             var img = jsonData[idx].img;
//             var summary = jsonData[idx].summary;
            
//             db.query(sql,[id,name,img,summary], (err,rows)=>{
//             if(err) console.log(err);
//             else {
//              //console.log(rows);
//              //res.json({state : "Insert done"});
//              }
//             });
            
//             sql = 'INSERT INTO info VALUES(?,?,?,?)';
//             console.log("info1 : "+jsonData[idx].info.info1);
            
//             db.query(sql,[id,jsonData[idx].info.info1,jsonData[idx].info.info2,jsonData[idx].info.info3], (err,rows)=>{
//                 if(err) console.log(err);
//                 else {
//                  //console.log(rows);
//                  //res.json({state : "Insert done"});
//                  }
//                 });
                         
//             sql = 'INSERT INTO INGRE VALUES(?,?,?,?)';
//             for(i in jsonData[idx].ingre){
//                 var ingre_name = jsonData[idx].ingre[i].ingre_name;
//                 var ingre_count = jsonData[idx].ingre[i].ingre_count;
//                 var ingre_unit = jsonData[idx].ingre[i].ingre_unit;
                
//                 db.query(sql,[id,ingre_name,ingre_count,ingre_unit], (err,rows)=>{
//                     if(err) console.log(err);
//                     else {
//                      //console.log(rows);
//                      //res.json({state : "Insert done"});
//                      }
//                     });
                    
//             }

//             sql = 'INSERT INTO detailRecipe VALUES(?,?,?)';
//             console.log('sadfdas');
//             for(i in jsonData[idx].recipe){
//                 var txt = jsonData[idx].recipe[i].txt;
//                 var img = jsonData[idx].recipe[i].img;
//                 console.log(txt);
//                 db.query(sql,[id,txt,img], (err,rows)=>{
//                     if(err) console.log(err);
//                     else {
//                      //console.log(rows);
//                      //res.json({state : "Insert done"});
//                      }
//                     });
//             }
            

//             //console.log()
//             //res.json({state : "Insert done"});
//             //db.query(sql,[])

//         //}
//     }
//     res.json({state : "Insert done"});
//     //console.log(jsonData);
//     //res.json(jsonData);
// });

router.post('/RecipeList',(req,res)=>{
    var id = req.body.id;
    console.log('id==?'+id);
    var sql = 'SELECT * FROM recipe r limit 20;';

    db.query(sql,[id], (err,rows)=>{
        if(err) console.log(err);
        else {
         res.json(rows);
         }
        });    
});

router.post('/RecipeList',(req,res)=>{
    var id = req.body.id;
    console.log('id==?'+id);
    var sql = 'SELECT * FROM recipe r, info i, ingre n, detailrecipe d WHERE r.id=? AND r.id=i.id AND r.id=n.id AND r.id = d.id;';

    db.query(sql,[id], (err,rows)=>{
        if(err) console.log(err);
        else {
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
module.exports = router;