const express = require('express');
const multer = require('multer');
const request = require('request');
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('50sound');
const crypto_md5 = require(path.dirname(__dirname) + "/lib/crypto_md5.js");
module.exports = function() {
    var router = express.Router();
    //获取授权信息
    router.post("/author1", function(req, res) {
        console.log(req.body.code);
        var wxurl = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx194f42bd579eb79f&secret=f904232afb228a4b5a9dc7c7a614c1ff&js_code=' + req.body.code + '&grant_type=authorization_code'
        request(wxurl, function(error, response, databody) {
            if (error) {
                res.json({
                    r: 'openid-exist',
                });
            }
            var $uuid = uuidv1();
            var datajson = JSON.parse(databody);
            var $sqldata = [datajson.openid, datajson.session_key, $uuid, new Date];
            console.log($sqldata);
            var $sqls = 'SELECT openid FROM `account` WHERE openid = ?';
            var sql = 'INSERT INTO `account`(openid,session_key,uuid,zucetime) VALUES (?,?,?,?)';
            mysql.query($sqls, $sqldata[0], function(err, result) {
                if (err) {
                    res.json({
                        r: 'openid-exist',
                    });
                } else if (result.length) {
                    res.json({
                        r: 'ok',
                        openid: $uuid
                    });
                } else {
                    mysql.query(sql, $sqldata, function(err, result) {
                        if (err) {
                            res.json({
                                r: 'openid-exist',
                            });
                        } else {
                            res.json({
                                r: 'ok',
                                openid: $uuid
                            });
                        }
                    });
                }
            });
        });
    });

    router.post("/author", function(req, res) {
        console.log(req.body.code);
        var wxurl = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa00283de60450b43&secret=f904232afb228a4b5a9dc7c7a614c1ff&js_code=' + req.body.code + '&grant_type=authorization_code'
        request(wxurl, function(error, response, databody) {
            if (error) {
                res.json({
                    r: 'openid-exist',
                });
            }
            var $uuid = uuidv1();
            var datajson = JSON.parse(databody);
            var $sqldata = [datajson.openid, datajson.session_key, $uuid, new Date];
            console.log($sqldata);
            var $sqls = 'SELECT openid FROM `account` WHERE openid = ?';
            var sql = 'INSERT INTO `account`(openid,session_key,uuid,zucetime) VALUES (?,?,?,?)';
            mysql.query($sqls, $sqldata[0], function(err, result) {
                if (err) {
                    res.json({
                        r: 'openid-exist',
                    });
                } else if (result.length) {
                    res.json({
                        r: 'ok',
                        openid: $uuid
                    });
                } else {
                    mysql.query(sql, $sqldata, function(err, result) {
                        if (err) {
                            res.json({
                                r: 'openid-exist',
                            });
                        } else {
                            res.json({
                                r: 'ok',
                                openid: $uuid
                            });
                        }
                    });
                }
            });
        });
    });


    router.post("/addcatesubmit", function(req, res) {
        var way = req.body.way
        var myDate = new Date(); //获取日期与时间
        myDate.toLocaleString();
        var pw = crypto_md5.md5(req.body.passwd);
        var $sqltj = [req.body[way], req.body[way], pw, myDate, req.ip];
        var $sqlselect = [req.body.tel]
        console.log(way)
        var $sqls = 'SELECT ' + way + ' FROM `account` WHERE ' + way + '  = ?';
        var sql = 'INSERT INTO `account`(username,' + way + ',passwd, logintime,ip) VALUES (?,?,?,?,?)';
        if (way == 'email') {
            $sqltj = [req.body[way], req.body[way], req.body.tel, pw, myDate, req.ip];
            $sqlselect = [req.body.tel, req.body.email]
            $sqls = 'SELECT tel,email FROM `account` WHERE tel  = ? || email=? LIMIT 1';
            sql = 'INSERT INTO `account`(username,email,tel, passwd, logintime,ip) VALUES (?,?,?,?,?,?)';
        }
        // ('liyang',123456, 15910064231, 1111,111111,'2018 - 05 - 29 10: 46: 43',111111)';
        console.log($sqltj)
        console.log(sql)
        mysql.query($sqls, $sqlselect, function(err, result) {
            if (result.length) {
                console.log(result[0])
                if (result[0].email == req.body.email && req.body.email) {
                    res.json({
                        r: 'email-exist'
                    });
                } else {
                    res.json({
                        r: 'tel-exist'
                    });
                }
            } else {
                mysql.query(sql, $sqltj, function(err, result) {
                    // console.log(err)
                    // console.log(result)
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            r: 'ok'
                        });
                    }
                });
            }
        });
    });
    // 登录
    router.post("/loginsubmit", function(req, res) {
        var $sqldata = [];
        console.log($sqldata)
            //    INTO`account`(username, passwd, tel, via, email, loginnum, logintime, ip)
            //    VALUES('liyang', 123456, 15910064231, 1111, 111111, 0, '2018-05-29 10:46:43', 111111)
            //SELECT aid,username, passwd, tel,via,email FROM `account` WHERE tel  = 111111 || email=1111112  LIMIT 1
        var $sql1 = 'SELECT aid,username, passwd, tel,via,email FROM `account` WHERE tel  = ? || email=? || username=? LIMIT 1';

        var pw = crypto_md5.md5(req.body.passwd);
        mysql.query($sql1, $sqldata, function(err, data) {
            if (data.length) {
                if (data[0].passwd == pw) {
                    res.json({
                        r: 'ok'
                    });
                } else {
                    res.json({
                        r: 'pw_error'
                    });
                }
            } else {
                res.json({
                    r: 'username_no_exist'
                });
            }
        });
    });
    return router;
}