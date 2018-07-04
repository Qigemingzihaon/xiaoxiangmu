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
    // route.use('/upload', require('./upload.js')());
    var secret = '123asdad45545';
    // route.use(cookieParser(secret));
    // var co = {
    //     maxAge: 30 * 24 * 3600 * 1000
    // };
    // route.use(session({
    //     resave: true,
    //     saveUninitialized: true,
    //     secret: '123asdad45545',
    //     name: 'session_id',
    //     cookie: {
    //         maxAge: 1800 * 1000
    //     }
    // }));
    // route.use(function(req, res, next) {
    //     if (!req.session.username &&
    //         url.parse(req.url).pathname != '/login' &&
    //         url.parse(req.url).pathname != '/loginsubmit' &&
    //         !path.parse(req.url).ext
    //     ) {
    //         res.redirect('./login');
    //     } else {
    //         next();
    //     }
    // });
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
    
    //默认首页设置
    route.get('/', function(req, res) {
      res('66666')
        // res.render('admin/login', {username:'', passwd:''});
        // res.redirect('./admin/login');
    });
    //托管
    // route.use('/uploads', express.static('uploads'))
    route.use(express.static('adminview'));
    return route;
}