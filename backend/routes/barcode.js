var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/database");
var db = mysql.createConnection(config.mysql);

var fs = require('fs');
const { resetWarningCache } = require("prop-types");
var data = fs.readFileSync('testBarcode.json','utf8');
var jsonData = JSON.parse(data);

router.post('/getBarcode',(req,res)=>{
    //var ret = jsonData.list.find(barcode => barcode.BAR_CD === req.body.barcodeNumber)

    var arrayFound = jsonData.filter(function(item) {
        return item.BAR_CD == req.body.barcodeNumber;
    });
    console.log(arrayFound);
    res.json(arrayFound);
});

module.exports = router;