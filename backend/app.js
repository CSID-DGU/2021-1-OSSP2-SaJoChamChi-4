const express = require('express');
var mysql = require('mysql');
const cors = require('cors');

var http = require('http');
var app = express();
app.use(cors());
// bodyParser (in express)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
var server = http.createServer(app);

var indexRouter = require("./routes/index");
var testRouter = require("./routes/test");
var loginRouter = require("./routes/login");
var refriRouter = require("./routes/refri");
var boardRouter = require("./routes/board")
var config = require("./config/database");
const db = mysql.createConnection(config.mysql);

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql connected!!");
});


app.use("/",indexRouter);
app.use("/test",testRouter);
app.use("/login",loginRouter);
app.use("/refri",refriRouter)
app.use("/board", boardRouter)
server.listen(3344, ()=>{
    console.log('Server listen on port' + server.address().port);
})