const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('50sound');
// const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('jianshu');
// const crypto_md5 = require(path.dirname(__dirname) + "/lib/crypto_md5.js");
module.exports = function() {
    var router = express.Router();
    //获取对应soundid的图片音频url
    router.post('/huoqusounid', function(req, res) {
        var $sqlsdata = [req.body.sounid, req.body.bgc, req.body.pjaorpja]
        console.log(req.body)
        var $sqls = 'SELECT url,imgname FROM `imageurl` WHERE sounid  = ? AND bgc=? AND pjaorpja=? AND imgny=1';
        mysql.query($sqls, $sqlsdata, function(err, result) {
            console.log(result)
            res.json(result)
        });

    });
    router.post('/huoqusounidbgc', function(req, res) {
        var $sqlsdata = [req.body.sounidq, req.body.sounidz, req.body.bgc, req.body.pjaorpja]
        console.log(req.body)
        var sqllj = "SELECT i.sounid,i.pjaorpja,i.url, i.imgname,`y`.urly,`y`.ypname\
        FROM `50sound` AS s\
        LEFT JOIN imageurl AS i\
        ON s.sounid = i.sounid\
        LEFT JOIN yinpurl AS `y`\
        ON s.sounid = `y`.sounid\
        WHERE ? <= s.sounid <= ? AND i.bgc = ? AND i.pjaorpja = ? AND i.imgny = 1 ";
        var $sqls = 'SELECT sounid,pjaorpja,url,imgname FROM `imageurl` WHERE ?<= sounid <= ? AND bgc=? AND pjaorpja=? AND imgny=1';
        mysql.query(sqllj, $sqlsdata, function(err, result) {
            console.log(result)
            res.json(result)
        });

    });








    router.get('/huoqutupian', function(req, res) {
        var $sqls = 'SELECT url FROM `imageurl` WHERE imgny  = 1';
        mysql.query($sqls, function(err, result) {
            // console.log(result)
            res.json(result)
        });

    });
    return router;
}