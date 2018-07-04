const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('50sound');
const crypto_md5 = require(path.dirname(__dirname) + "/lib/crypto_md5.js");
const fs = require('fs');
const url = require('url');
const cookieParser = require('cookie-parser');
const session = require('express-session');
module.exports = function() {
    var route = express.Router();
    route.use('/upload', require('./upload.js')());
    var secret = '123asdad45545';
    route.use(cookieParser(secret));
    var co = {
        maxAge: 30 * 24 * 3600 * 1000
    };
    route.use(session({
        resave: true,
        saveUninitialized: true,
        secret: '123asdad45545',
        name: 'session_id',
        cookie: {
            maxAge: 1800 * 1000
        }
    }));
    route.use(function(req, res, next) {
        if (!req.session.username &&
            url.parse(req.url).pathname != '/login' &&
            url.parse(req.url).pathname != '/loginsubmit' &&
            !path.parse(req.url).ext
        ) {
            res.redirect('./login');
        } else {
            next();
        }
    });
    route.get('/login', function(req, res) {
        req.session.destroy(function(err) {
            // cannot access session here
        })
        res.render('login.html', {
            username: req.cookies.username,
            passwd: req.cookies.passwd
        });
    });
    route.post("/loginsubmit", function(req, res) {
        var $sql1 = 'SELECT * FROM admin WHERE username = ?  LIMIT 1';
        var $sqldata = [req.body.username, req.body.passwd];
        var pw = crypto_md5.md5(req.body.passwd);
        mysql.query($sql1, $sqldata[0], function(err, data) {
            if (data.length) {
                if (data[0].passwd == pw) {
                    if (req.body.rember) {
                        res.cookie('username', req.body.username, console.co);
                        res.cookie('passwd', req.body.passwd, console.co);
                        req.session.username = data[0].username;
                        req.session.passwd = data[0].passwd;
                        req.session.aid = data[0].aid;
                    } else {
                        res.clearCookie('username', {
                            maxAge: 0
                        });
                        res.clearCookie('passwd', {
                            maxAge: 0
                        });
                        req.session.username = data[0].username;
                        req.session.passwd = data[0].passwd;
                        req.session.aid = data[0].aid;
                    }
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
    route.get('/catelist', function(req, res) {
        var $sql = 'SELECT * FROM 50sound WHERE status = 1';
        mysql.query($sql, function(err, data) {
            console.log(err)
            res.render('catelist.html', {
                username: req.session.username,
                catelist: data
            });
        });
    });
    route.get('/newslist', function(req, res) {
        //从数据库里面查询栏目信息
        var $sql = '	SELECT n.*, c.catename FROM news AS n  \
						LEFT JOIN cate AS c \
						ON n.cid = c.cid \
						WHERE n.status = 1';
        mysql.query($sql, function(err, data) {
            res.render('newslist.html', {
                username: req.session.username,
                newslist: data
            });
        });
    });
    route.get('/addnews', function(req, res) {
        var $sql = 'SELECT cid, catename FROM cate WHERE status = 1';
        //判断是不是修改新闻信息
        var nid = 0;
        nid = req.query.nid;
        mysql.query($sql, function(err, data) {
            if (nid) {
                var $newssql = 'SELECT * FROM news WHERE nid = ? LIMIT 1';
                mysql.query($newssql, nid, function(err1, newsdata) {
                    res.render('addnews.html', {
                        username: req.session.username,
                        catelist: data,
                        newsdata: newsdata[0]
                    });
                });
            } else {
                res.render('addnews.html', {
                    username: req.session.username,
                    catelist: data,
                    newsdata: {}
                });
            }

        });
    });
    route.get("/addcate", function(req, res) {
        res.render('addcate.html', {
            username: req.session.username,
            passwd: req.session.passwd
        });
    });
    route.post('/addcatesubmit', function(req, res) {
        //添加数据到数据库
        //TODO:检查栏目名称是否存在
        console.log(req.body.catename);
        var $data = [req.body.catename, req.session.aid, req.session.username]
        var $sql1 = 'SELECT * FROM 50sound WHERE catename = ?  LIMIT 1';
        var sql = 'INSERT INTO 50sound(catename, aid, username) VALUES (?, ?, ?)';
        mysql.query($sql1, $data[0], function(err1, newsdata) {
            if (newsdata.length) {
                res.json({ r: "no" });
            } else {
                mysql.query(sql, $data, function(err, result) {
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

    route.get("/uploadht", function(req, res) {
        res.render('upload.html', {
            username: req.session.username,
            passwd: req.session.passwd
        });
    });
    //默认首页设置
    route.get('/', function(req, res) {
        // res.render('admin/login', {username:'', passwd:''});
        res.redirect('./admin/login');
    });
    //托管
    // route.use('/uploads', express.static('uploads'))
    route.use(express.static('adminview'));
    return route;
}