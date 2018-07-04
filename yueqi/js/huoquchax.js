const express = require('express');
const path = require('path');
const async = require('async');
const waterfall = require('async/waterfall');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('yueqi');
module.exports = function (db, shousuoci, fengye, res) {
  var shoutui;
  var coll = [],
    nocoll = [];
  if (shousuoci == '') {
    //定义SQL语句
    async.waterfall([function (callback) {
        var $totalsql = 'SELECT count(product_pname) AS totalnum FROM product_particular WHERE yesno=0';
        mysql.query($totalsql, function (err, result) {
          console.log(result)
          if (result) {
            callback(null, result[0].totalnum);
          }
        });
      },
      function (arg1, callback) {
        //定义每页显示多少条数据
        var pagenum = 16;
        //当前的页数
        var page = fengye;
        if (page < 1) page = 1;
        //起始位
        var start = pagenum * (page - 1);
        //共有多少页：(总条数/pagenum)  向上取整
        totalpage = Math.ceil(arg1 / pagenum);
        var $sql1st = 'SELECT pdpctid,pdtid,product_pname,suggestmoney,money,adminid,particular,shopid,\
      shotel FROM `product_particular` WHERE yesno=0  LIMIT ?, ?';
        console.log(arg1, totalpage)
        mysql.query($sql1st, [start, pagenum], function (err, result) {
          console.log(err, 2)
          if (result) {
            console.log(result, 1)
            for (let i = 0; i < result.length; i++) {
              coll.push(i);
            }
            console.log(coll,111);
            callback(null, coll, result);
          }
        });
      },
      function (arg1, arg2,callback) {
        var $sql1stimg = 'SELECT imgurl FROM `product_particular_img` WHERE pdpctid = ? AND yesno=0';
        console.log(arg1,arg2)
        async.each(arg1, function (item, callback1) {
          // console.log(item)
          mysql.query($sql1stimg, arg2[item].pdpctid, function (err11, namedata) {
            // console.log(namedata)
            var data1 = [];
            if (err11) {
              // nocoll.push(item);
              // callback();
            } else {
              for (var i1 = 0; i1 < namedata.length; i1++) {
                shdz = namedata[i1].imgurl;
                data1.push(shdz);
              }
              arg2[item]["imgurl"] = data1;
              callback1();
            }
          });
        },
        function (err) {
          shoutui = arg2;
          console.log(arg2,111)
          callback(null,shoutui);
        });
      }
    ], function (err, result) {
      console.log(result,1122222)
      res.render('view/zslb', {
        dengl: db,
        shouye: result
      });
    })
  } else {
    // var $sql1st = 'SELECT pdpctid,pdtid,product_pname,suggestmoney,money,adminid,particular,shopid,\
    //   shotel FROM `product_particular` WHERE product_pname LIKE "%"?"%" || shopid LIKE "%"?"%"';
        //定义SQL语句
        async.waterfall([function (callback) {
          var $totalsql = 'SELECT count(product_pname) AS totalnum FROM product_particular WHERE\
           product_pname LIKE "%"?"%" || shopid LIKE "%"?"%" AND yesno=0';
          mysql.query($totalsql,[shousuoci,shousuoci] ,function (err, result) {
            console.log(result)
            if (result) {
              callback(null, result[0].totalnum);
            }
          });
        },
        function (arg1, callback) {
          //定义每页显示多少条数据
          var pagenum = 16;
          //当前的页数
          var page = fengye;
          if (page < 1) page = 1;
          //起始位
          var start = pagenum * (page - 1);
          //共有多少页：(总条数/pagenum)  向上取整
          totalpage = Math.ceil(arg1 / pagenum);
          var $sql1st = 'SELECT pdpctid,pdtid,product_pname,suggestmoney,money,adminid,particular,shopid,\
        shotel FROM `product_particular` WHERE product_pname LIKE "%"?"%" || shopid LIKE "%"?"%"\
         AND yesno=0 LIMIT ?, ?';
          console.log(arg1, totalpage)
          mysql.query($sql1st, [shousuoci,shousuoci,start, pagenum], function (err, result) {
            console.log(err, 2)
            if (result) {
              console.log(result, 1)
              for (let i = 0; i < result.length; i++) {
                coll.push(i);
              }
              console.log(coll,111);
              callback(null, coll, result);
            }
          });
        },
        function (arg1, arg2,callback) {
          var $sql1stimg = 'SELECT imgurl FROM `product_particular_img` WHERE pdpctid = ? AND yesno=0';
          console.log(arg1,arg2)
          async.each(arg1, function (item, callback1) {
            // console.log(item)
            mysql.query($sql1stimg, arg2[item].pdpctid, function (err11, namedata) {
              // console.log(namedata)
              var data1 = [];
              if (err11) {
                // nocoll.push(item);
                // callback();
              } else {
                for (var i1 = 0; i1 < namedata.length; i1++) {
                  shdz = namedata[i1].imgurl;
                  data1.push(shdz);
                }
                arg2[item]["imgurl"] = data1;
                callback1();
              }
            });
          },
          function (err) {
            shoutui = arg2;
            console.log(arg2,111)
            callback(null,shoutui);
          });
        }
      ], function (err, result) {
        console.log(result,1122222)
        res.render('view/zslb', {
          dengl: db,
          
          shouye: result
        });
      })
  }
}