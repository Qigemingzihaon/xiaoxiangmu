const express = require('express');
const async = require('async');
const ejs = require('ejs');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('yueqi');
const uploadModel = require(path.dirname(__dirname) + '/lib/upload.js'); //上传model
module.exports = function () {
    var app = express.Router();
    let dirname = 'img33';
    app.post('/dengyi', function (req, res) {
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
    app.post('/baocsj', function (req, res) {
        var shujuhttp = "/olimage";
        var shuju='';
        var $Up = req.body;
        if ($Up.pdpctid == '') {
            $Up.Rad = 1;
        } else {
            $Up.Rad = 2;
        }

        var $datapdpctid = [$Up.pdtid, $Up.product_pname, $Up.suggestmoney, $Up.money,
            req.session.adminaid, $Up.particular, $Up.shopid, $Up.shotel, req.ip, new Date
        ];
        // var $Upmingc = $Up.mingc;
        // var $Upmingc1 = $Upmingc.split(",");
        var $Uplujin1 = $Up.imgurl;
        // var $Uplujin1 = $Uplujin.split(",");
        //上传数据库
        var sql = '',
            sql1 = '';
        var coll = [];
        var nocoll = [];
        if ($Up.Rad == 1) {
            for (let i = 0; i < $Uplujin1.length; i++) {
                coll.push(i);
            }
            sql = 'INSERT INTO product_particular(pdtid,product_pname,suggestmoney,money,\
                adminid,particular,shopid,shotel,login_ip,putaway_time) VALUES (?,?,?,?,?,?,?,?,?,?)';
            sqlimg = 'INSERT INTO product_particular_img(pdpctid,imgurl) VALUES (?,?)';
            // sql1 = 'SELECT imgname FROM `product_particular` WHERE imgname  = ? LIMIT 1';
            //async
            mysql.query(sql, $datapdpctid, function (err1, namedata) {
                console.log(err1)
                if (err1) {
                    console.log(111)
                    res.json({
                        r: 'no'
                    });
                } else {
                    async.each(coll, function (item, callback) {
                            console.log(item)
                            var $data1 = [namedata.insertId, shujuhttp + $Uplujin1[item]];
                            mysql.query(sqlimg, $data1, function (err11, namedata) {
                                console.log(namedata)
                                if (err11) {
                                    nocoll.push(item);
                                    callback();
                                } else {
                                    callback();
                                }
                            });
                        },
                        function (err) {
                            res.json({
                                r1: nocoll,
                                r: "ok"
                            });
                        });

                }
                console.log(coll)
            });
        } else if ($Up.Rad == 2) {

            var pdpctidupdte = [$Up.pdtid, $Up.product_pname, $Up.suggestmoney, $Up.money,
                req.session.adminaid, $Up.particular, $Up.shopid, $Up.shotel, req.ip, new Date, $Up.pdpctid
            ];
            for (let i = 0; i < $Uplujin1.length; i++) {
                coll.push(i);
            }
            sql = 'UPDATE `product_particular` SET pdtid=?,product_pname=?,suggestmoney=?,money=?,\
                adminid=?,particular=?,shopid=?,shotel=?,login_ip=?,putaway_time=? WHERE pdpctid=?';
            sqlimg = 'INSERT INTO product_particular_img(pdpctid,imgurl) VALUES (?,?)';
            sqldel = "UPDATE `product_particular_img` SET yesno=1  WHERE pdpctid = ?";
            mysql.query(sql, pdpctidupdte, function (err1, namedata) {
                console.log(err1,"ss")
                if (err1) {
                    console.log(111)
                    res.json({
                        r: 'no'
                    });
                } else {
                    mysql.query(sqldel, $Up.pdpctid, function (err1, namedata) {
                        if (err1) {
                            // console.log(111)
                            res.json({
                                r: 'no'
                            });
                        } else {
                            async.each(coll, function (item, callback) {
                                    
                                    // console.log($Uplujin1[item],111)

                                    if($Uplujin1[item].pdpcimgid){
                                        // console.log($Uplujin1[item],111)
                                        shuju=$Uplujin1[item].imgurl
                                    }else{
                                        // console.log($Uplujin1[item],222)
                                        shuju=shujuhttp+$Uplujin1[item]
                                    }
                                    var $data1 = [$Up.pdpctid,shuju];
                                    mysql.query(sqlimg, $data1, function (err11, namedata) {
                                        console.log(namedata,222)
                                        if (err11) {
                                            nocoll.push(item);
                                            callback();
                                        } else {
                                            callback();
                                        }
                                    });
                                },
                                function (err) {
                                    res.json({
                                        r1: nocoll,
                                        r: "ok"
                                    });
                                });
                        }
                    })
                }
            })
        };
    })


    app.post('/wjUpload', function (req, res) {
        /**设置响应头允许ajax跨域访问**/
        res.setHeader("Access-Control-Allow-Origin", "*");
        // console.log(req.body)
        var fsy = path.join(__dirname, '../olimage', dirname);
        if (!fs.existsSync(fsy)) {
            fs.mkdirSync(fsy, 0777);
        };
        uploadModel.uploadPhoto(req, dirname, function (err, fields, uploadPath, uploadname) {
            // console.log(uploadname)
            if (err) {
                return res.json({
                    errCode: 0,
                    errMsg: '上传出错了'
                });
            }
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