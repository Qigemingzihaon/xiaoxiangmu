const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('yueqi');
const crypto_md5 = require(path.dirname(__dirname) + "/lib/crypto_md5.js");
const fs = require('fs');
const url = require('url');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = function () {
  var route = express.Router();
  //使用cookie
  // console.log("admin")
  route.get('/tc', function (req, res) {
    req.session.destroy(function(err) {
		  // cannot access session here
		})

    res.render('view/YAMANOMUSICOnline', {
      dengl: 'no'
    });
  });
  route.use('/upload', require('./upload.js')());
  route.get('/tc', function (req, res) {
    req.session.destroy(function(err) {
		  // cannot access session here
		})
    res.redirect('/admin');
  });
  route.get('/zc', function (req, res) {
    res.render('view/zc');
  });
  route.get('/zcnr', function (req, res) {
    // console.log(666,1)

    console.log(req.session.zcxi)
    if(req.session.zcxi){
    console.log(req.session.zcxi,666)

      res.render('view/zcnr', {
        zcxi: req.session.zcxi
      });
    }else{
      res.redirect('/zc');
    }
  });
  route.get('/', function (req, res) {
    console.log(666,111)
    res.render('view/adminlogin');
  });
  // 判断是否登录
  route.use(function (req, res, next) {
    if (!req.session.adminaid &&
      !path.parse(req.url).ext
    ) {
      res.redirect('/admin/');
    } else {
      next();
    }
  });
  //获取菜单
  route.get('/adminshangp', function (req, res) {
    console.log("adminshangp")
    var data1 = [];
    var $sqldata=[req.session.adminaid];
    var usernameyh=req.session.adname;
    // var usernameyh = '山本 山姆'
    // var $sqldata = ["1", '0'];
    var $sql1 = 'SELECT p.pdpctid,p.product_pname,p.suggestmoney,p.money,pd.productname \
    FROM `product_particular` AS p\
    LEFT JOIN `product`  AS  pd\
    ON  p.pdtid = pd.pdtid\
    WHERE p.adminid = ? AND p.yesno=0';
    // console.log(req.body)
    mysql.query($sql1, $sqldata, function (err, result) {
      console.log(err)
      if (result) {
        for (var i1 = 0; i1 < result.length; i1++) {
          shdz = {};
          for (var obj in result[i1]) {
              shdz[obj] = result[i1][obj];
          }
          if (i1 == 0) {
            data1[0] = shdz;
          } else {
            data1.push(shdz);
          }
        }
        console.log(data1)
        res.render('view/adminshangp',{nameyh:usernameyh,shdz:data1});
        // res.send({
        //   r: result,
        //   yhname: usernameyh
        // });
      } else {
        res.render('view/adminshangp',{nameyh:usernameyh,shdz:data1});
      }
    });
    // res.render('view/adminshangp');
  });
  route.get('/admintjsh', function (req, res) {
    console.log(666)
    var arg = url.parse(req.url, true).query;
    if(arg.FuncTion&&req.session.baocpid){
      delete req.session["baocpid"];
    }
    res.render('view/admintjsh');
  });
  route.get('/admindlwl', function (req, res) {
    //发送个人信息到页面
    res.render('view/admindlwl', {
      yhdl: req.session.adname
    });
  });
  





  
  
  route.use(express.static('qhview/view'));
  return route;
}