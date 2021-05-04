var express = require("express");
var router = express.Router();

router.get('/', function(req,res){
    res.send('root page');
})

router.get('/start', function(req,res){
    res.send('start page');
})

module.exports = router;