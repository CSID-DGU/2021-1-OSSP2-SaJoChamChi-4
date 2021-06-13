const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
//import Expo from 'expo-server-sdk'


var http = require('http');
var app = express();
// const expo = require('expo-server-sdk');
// let savedPushTokens = [];

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
var server = http.createServer(app);


var indexRouter = require("./routes/index");
var testRouter = require("./routes/test");
var loginRouter = require("./routes/login");
var boardRouter = require("./routes/board");
var commentRouter = require("./routes/comment");
var RecipeRouter = require("./routes/Recipe");
var refriRouter = require("./routes/refri");
var barcodeRouter = require("./routes/barcode");
var goodRouter = require("./routes/good");
var recipegoodRouter = require("./routes/recipegood")

var config = require("./config/database");
const db = mysql.createConnection(config.mysql);

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql connected!!");
});

app.post("/token",(req,res)=>{
    var usr_Id = req.body.id;
    db.query('SELECT * FROM refrigerator WHERE rf_usr=?',[usr_Id], (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log('토큰 보냄'+rows);
            res.json(rows);}
    });
});

app.use("/",indexRouter);
app.use("/test",testRouter);
app.use("/login",loginRouter);
app.use('/board',boardRouter);
app.use('/comment',commentRouter);
app.use('/Recipe',RecipeRouter);
app.use("/refri",refriRouter);
app.use("/barcode",barcodeRouter);
app.use("/good", goodRouter);
app.use("/recipegood", recipegoodRouter);

server.listen(3344, ()=>{
    console.log('Server listen on port' + server.address().port);
})