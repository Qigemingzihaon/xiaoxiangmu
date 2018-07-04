const express = require('express');
const async = require('async');
const ejs = require('ejs');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('50sound');
const uploadModel = require(path.dirname(__dirname) + '/lib/upload.js'); //上传model
module.exports = function() {
    var app = express.Router();
    let dirname = 'img33';
    app.post('/dengyi', function(req, res) {
        dirname = req.body.dir;
        // console.log(dirname)
        var fsy = path.join(__dirname, '../olimage', dirname);
        if (!fs.existsSync(fsy)) {
            fs.mkdirSync(fsy, 0777);
        };
        res.json({
            r: "ok",
            dirname: fsy
        });
    })

    //{ sounid: [ '1', '1' ],
    // pjaorpja: '1',
    //     ypid: '1',
    //     yuming: '1',
    //     mingc: '1-3.png,1-4.png,1-5.png',
    //     lujin: '/img33/20180608182038_50543.png,/img33/20180608182038_284220.png,/img33/20180608182038_23952.png'
    // }http://192.168.3.177:8080
    app.post('/baocsj', function(req, res) {
        var shujuhttp = "/olimage";
        var $Up = req.body;
        var $Upmingc = $Up.mingc;
        var $Uplujin = $Up.lujin;
        var $Upmingc1 = $Upmingc.split(",");
        var $Uplujin1 = $Uplujin.split(",");
        //上传数据库
        var sql = '',
            sql1 = '';
        var $data = '';
        var coll = [];
        if ($Up.Rad == 1) {
            for (let i = 0; i < $Upmingc1.length; i++) {
                coll.push(i);
            }
            sql = 'INSERT INTO imageurl_copy(sounid,url,imgname,bgc,pjaorpja,ypid) VALUES (?,?,?,?,?,?)';
            sql1 = 'SELECT imgname FROM `imageurl_copy` WHERE imgname  = ? LIMIT 1';
            //async
            console.log(coll)
            var terraceCount = "";
            async.each(coll, function(item, callback) {
                    console.log(item)
                    var $data1 = [$Up.sounid, shujuhttp + $Uplujin1[item], $Upmingc1[item], $Up.bgc, $Up.pjaorpja, $Up.ypid];
                    mysql.query(sql1, $data1[2], function(err1, namedata) {
                        console.log(namedata)
                        if (!namedata.length) {
                            console.log(666)
                            mysql.query(sql, $data1, function(err1, newsdata) {
                                callback();
                            });
                        } else {
                            console.log(66611)
                            callback();
                        }
                    });
                },
                function(err) {
                    res.json({
                        r: "ok",
                    });
                });
        } else if ($Up.Rad == 2) {
            for (let i = 0; i < $Upmingc1.length; i++) {
                coll.push(i);
            }
            sql = 'INSERT INTO yinpurl_copy(sounid,url,ypname) VALUES (?,?,?)';
            sql1 = 'SELECT ypname FROM `yinpurl_copy` WHERE ypname  = ? LIMIT 1';
            async.each(coll, function(item, callback) {
                    console.log(item)
                    var $data1 = [$Up.sounid, shujuhttp + $Uplujin1[item], $Upmingc1[item], $Up.bgc, $Up.pjaorpja, $Up.ypid];
                    mysql.query(sql1, $data1[2], function(err1, namedata) {
                        console.log(namedata)
                        if (!namedata.length) {
                            console.log(666)
                            mysql.query(sql, $data1, function(err1, newsdata) {
                                callback();
                            });
                        } else {
                            console.log(66611)
                            callback();
                        }
                    });
                },
                function(err) {
                    res.json({
                        r: "ok",
                    });
                });
        };
    })


    app.post('/wjUpload', function(req, res) {
        /**设置响应头允许ajax跨域访问**/
        res.setHeader("Access-Control-Allow-Origin", "*");
        // console.log(req.body)
        var fsy = path.join(__dirname, '../olimage', dirname);
        if (!fs.existsSync(fsy)) {
            fs.mkdirSync(fsy, 0777);
        };
        uploadModel.uploadPhoto(req, dirname, function(err, fields, uploadPath, uploadname) {
            // console.log(uploadname)
            if (err) {
                return res.json({
                    errCode: 0,
                    errMsg: '上传出错了'
                });
            }
            var $data = [];
            var sql = 'INSERT INTO imageurl(sounid,url,imgname,imgny) VALUES (?,?,?,?)';
            // mysql.query($sql1, $data[0], function(err1, newsdata) {
            //     if (newsdata.length) {
            //         res.json({
            //             r: "no"
            //         });
            //     } else {
            //         mysql.query(sql, $data, function(err, result) {
            //             if (err) {
            //                 res.json(err);
            //             } else {
            //                 res.json({
            //                     r: 'ok'
            //                 });
            //             }
            //         });
            //     }
            // });
            console.log(uploadname); //上传图片名称
            console.log(fields); //表单中字段信息
            console.log(uploadPath); //上传图片的相对路径
            res.json({
                errCode: 1,
                errMsg: '上传成功',
                fields: fields,
                uploadPath: uploadPath,
                uploadname: uploadname
            });
        });
    });
    app.use('/wjUpload', express.static('upload'));
    app.use(express.static('view'));
    return app;
}