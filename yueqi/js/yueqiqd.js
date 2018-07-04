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
  var dengl='no';
  //查出首页所需数据，存放在服务器；
  route.get('/zssp', function (req, res) {
    // console.log(url.parse(req.url, true).query.pdpctid)
    var pid=url.parse(req.url, true).query.pdpctid;
    
    // var dengl='no';
    require('../js/huoqustsp.js')(dengl,pid,res)
  });
  route.get('/zslb', function (req, res) {
    var shou=url.parse(req.url, true).query.shou;
    var fengye=url.parse(req.url, true).query.page;
    // var dengl='no';
    require('../js/huoquchax.js')(dengl,shou,fengye,res)
    // res.render('view/zslb');
  });
  route.get('/dl', function (req, res) {
    res.render('view/dl');
  });
  route.get('/wjmm', function (req, res) {
    res.render('view/wjmm');
  });
  route.get('/wjmm1', function (req, res) {
    if (req.session.yhwt) {
      res.render('view/wjmm1');
    } else {
      res.redirect('/wjmm');
    }
  });
  route.get('/wjmm2', function (req, res) {
    if (req.session.yhwt) {
      res.render('view/wjmm2', {
        name: req.session.yhwt.suijidlid
      });
    } else {
      res.redirect('/wjmm');
    }
  });
  route.get('/wjzh', function (req, res) {
    res.render('view/wjzh');
  });
  route.get('/wjzh1', function (req, res) {
    if (req.session.yhzh) {
      res.render('view/wjzh1');
    } else {
      res.redirect('/wjzh');
    }
  });
  route.get('/tc', function (req, res) {
    req.session.destroy(function (err) {
      // cannot access session here
    })

    dengl='no';
    require('../js/huoqust.js')(dengl,res)
  });
  route.get('/zc', function (req, res) {
    res.render('view/zc');
  });
  route.get('/zcnr', function (req, res) {
    console.log(req.session.zcxi)
    if (req.session.zcxi) {
      console.log(req.session.zcxi, 666)

      res.render('view/zcnr', {
        zcxi: req.session.zcxi
      });
    } else {
      res.redirect('/zc');
    }
  });
  route.get('/', function (req, res) {
    // var dengl='no';
    require('../js/huoqust.js')(dengl,res)
    
  });

  // 判断是否登录
  route.use(function (req, res, next) {
    if (!req.session.graid &&
      !path.parse(req.url).ext
    ) {
      res.redirect('/');
    } else {
      next();
    }
  });



  route.get('/zcwc', function (req, res) {
    res.render('view/zcwc', {
      zczhanid: req.session.zczhanid
    });
  });





  route.get('/dlwl', function (req, res) {
    //发送个人信息到页面
    dengl='ok';
    res.render('view/dlwl', {
      yhdl: req.session.yhdl
    });
  });
  route.get('/dlzj', function (req, res) {
    var data1 = [];
    var $sqldata = [req.session.graid, '0'];
    var usernameyh = req.session.yhname;
    // var usernameyh = '山本 山姆'
    // var $sqldata = ["1", '0'];
    var $sql1 = 'SELECT p1id,aid,usernames,username,postcode,shi,qu,xiangxi,\
    tel,dizmor FROM `profile1` WHERE aid = ? AND dizkey=?';
    // console.log(req.body)
    mysql.query($sql1, $sqldata, function (err, result) {

      console.log(err)
      if (result) {
        for (var i1 = 0; i1 < result.length; i1++) {
          shdz = {};
          for (var obj in result[i1]) {
            if (obj == 'usernames' || obj == 'username' || obj == 'tel' || obj == "p1id") {
              shdz[obj] = result[i1][obj];
            }
          }
          shdz["dz"] = result[i1]["postcode"] + '' + result[i1]["shi"] + '' + result[i1]['qu'] + '' + result[i1]['xiangxi'];
          if (i1 == 0) {
            data1[0] = shdz;
          } else {
            data1.push(shdz);
          }
        }
        console.log(data1)


        res.render('view/dlzj', {
          nameyh: usernameyh,
          shdz: data1
        });
        // res.send({
        //   r: result,
        //   yhname: usernameyh
        // });
      } else {
        res.render('view/dlzj', {
          nameyh: usernameyh,
          shdz: data1
        });
      }
    });
  });
  route.get('/grzlxg', function (req, res) {
    res.render('view/grzlxg');
  });
  route.get('/grzlxg1', function (req, res) {
    res.render('view/grzlxg1', {
      zcxi: req.session.zcxi
    });
  });
  route.get('/gwc', function (req, res) {
    res.render('view/gwc');
  });
  route.get('/tjsh', function (req, res) {
    var arg = url.parse(req.url, true).query; //方法二arg => { aa: '001', bb: '002' }
    // console.log(arg);
    if (arg.FuncTion && req.session.baocpid) {
      delete req.session["baocpid"];
    }
    res.render('view/tjsh');
  });
  route.get('/tjsh1', function (req, res) {
    res.render('view/tjsh1');
  });

  route.get('/xgwc', function (req, res) {
    res.render('view/xgwc');
  });

  route.get('/YAMANOMUSICOnline', function (req, res) {
    var dengl='ok';
    require('../js/huoqust.js')(dengl,res)
  });

  route.use(express.static('qhview/view'));
  return route;
}