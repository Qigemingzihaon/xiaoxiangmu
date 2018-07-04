const express = require('express');
const multer = require('multer');
// const bodyParser = require('body-parser');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('yueqi');
const crypto_md5 = require(path.dirname(__dirname) + "/lib/crypto_md5.js");
const fs = require('fs');
// const url = require('url');
const cookieParser = require('cookie-parser');
const session = require('express-session');
module.exports = function () {
  var route = express.Router();
  //登录 保存用户信息到session
  route.post('/dl', function (req, res) {
    console.log(req.body)
    var $data1 = '',
      $sql1 = '',
      datal = '';
    var pw = crypto_md5.md5(req.body.passwd);
    //设置sql语句
    if (req.body.tel) {
      $data1 = [req.body.tel, pw];
      datal = "tel";
      $sql1 = 'SELECT aid,username,tel,suijidlid,passwd,adminproduct FROM `account` WHERE tel = ? AND adminproduct>0 AND nosid=0 LIMIT 1';
      // console.log('tel')
    } else {
      $data1 = [req.body.suijidlid, pw];
      datal = "suijidlid";
      $sql1 = 'SELECT aid,username,tel,suijidlid,passwd,adminproduct FROM `account` WHERE suijidlid = ? AND adminproduct>0 AND nosid=0 LIMIT 1';
      // console.log('zhangh')
    }
    mysql.query($sql1, $data1[0], function (err, result) {
      if (result.length) {
        console.log(result, pw);
        if (result[0].passwd == pw) {
          res.cookie('addl', "addl", console.co);
          req.session.addl = result[0];
          req.session.adname = result[0].username;
          req.session.adminaid = result[0].aid;
          // req.session.baocpid = {
          //   p1id: '',
          //   FuncTion: ''
          // };
          res.json({
            r: 'ok'
          });
        } else {
          res.json({
            r: 'pw-exist'
          });
        }
      } else if (err) {
        res.json({
          r: 'tel-exist'
        });
      } else {
        if (datal == "tel") {
          res.json({
            r: 'tel-exist'
          });
        } else {
          res.json({
            r: 'id-exist'
          });
        }
      }
    });





  });
  //获取用户名信息
  route.post('/huoquname', function (req, res) {
    var data1=[];
    // console.log(req.body)
    var name = req.session.adname;
    // var name = "nihao";
    if (req.session.baocpid && req.session.baocpid.FuncTion == 'Change') {
      // var $sqldata=[req.session.graid,'0'];
      var usernameyh = req.session.adname;
      // var usernameyh = '山本 山姆';
      var $sqldata = [req.session.baocpid.p1id, '0'];
      var $sql1 = 'SELECT pdpctid,pdtid,product_pname,suggestmoney,money,adminid,particular,shopid,\
      shotel FROM `product_particular` WHERE pdpctid = ? AND yesno=?';
      // console.log(req.body)
      var $sql1img = 'SELECT pdpcimgid,imgurl FROM `product_particular_img` WHERE pdpctid = ? AND yesno=?';
      mysql.query($sql1, $sqldata, function (err, result) {
        console.log(result)
        if (result) {
          mysql.query($sql1img, $sqldata, function (err, resultimg) {
            console.log(resultimg[0])
            if(resultimg){
              for (var i1 = 0; i1 < resultimg.length; i1++) {
                shdz = {};
                for (var obj in resultimg[i1]) {
                    shdz[obj] = resultimg[i1][obj];
                }
                if (i1 == 0) {
                  data1[0] = shdz;
                } else {
                  data1.push(shdz);
                }
              }
              console.log(data1)
              
              res.send({
              nameyh: usernameyh,
              shdz: result,
              imgurl:data1
            });
            }else{
              res.send({
                nameyh: usernameyh,
                shdz: result
              });
            }
          });
        } else {
          res.send({
            nameyh: usernameyh
          });
        }

      });


    } else {
      res.send({
        nameyh: name
      });
    }



  });
  //注册 保存注册更改信息到session
  route.post('/shdzsn', function (req, res) {
    console.log(req.body)
    res.cookie('adminshdzsn', "adminshdzsn", console.co);
    req.session.adminshdzsn = req.body;
    res.send('ok');
  });
  //获取收货信息
  route.post('/baocpid', function (req, res) {
    console.log(req.body)
    res.cookie('baocpid', "baocpid", console.co);
    req.session.baocpid = req.body;
    res.send('ok');
  });
  //删除收货地址更改其dizkey为1
  route.post('/deletedz', function (req, res) {
    console.log(req.body);
    var $sqldata = ["1", req.body.pdpctid];
    var $sql1 = 'UPDATE `product_particular` SET yesno =? WHERE pdpctid = ?';
    var $sqlimg = 'UPDATE `product_particular_img` SET yesno =? WHERE pdpctid = ?'
    mysql.query($sql1, $sqldata, function (err, result) {
      console.log(result)
      if (result) {
        mysql.query($sqlimg, $sqldata, function (err, result1) {
          if(result1){
            res.send("ok");
          }
          
        })
      } else {
        res.send("no");
      }
    });
  });
  return route;
}