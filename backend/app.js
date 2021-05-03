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

const db = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "0000",
    database: "refrigerator",
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql connected!!");
});

app.get("/getUser",(req,res)=>{
    db.query('SELECT * FROM user where usr_Day=1', (err,rows)=>{
        if(err) console.log(err);
        else {
            console.log(res);
            console.log(rows);
            res.json(rows);}
    });
});

app.get('/', function(req,res){
    res.send('root page');
})

app.get('/start', function(req,res){
    res.send('start page');
})


server.listen(3344, ()=>{
    console.log('Server listen on port' + server.address().port);
})