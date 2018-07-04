const express = require('express');
const path = require('path');
const async = require('async');

const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('yueqi');
module.exports = function (db,res) {
  var shoutui;
  var coll = [],
    nocoll = [];
  var $sql1st = 'SELECT pdpctid,pdtid,product_pname,suggestmoney,money,adminid,particular,shopid,\
  shotel FROM `product_particular` WHERE yesnot=9 AND yesno=0';
  // console.log(req.body)
  var $sql1stimg = 'SELECT imgurl FROM `product_particular_img` WHERE pdpctid = ? AND yesno=0';
  mysql.query($sql1st, function (err, result) {
    console.log(err)
    if (result) {
      console.log(result)
      for (let i = 0; i < result.length; i++) {
        coll.push(i);
      }
      async.each(coll, function (item, callback) {
          // console.log(item)
          mysql.query($sql1stimg, result[item].pdpctid, function (err11, namedata) {
            // console.log(namedata)
            var data1=[];
            if (err11) {
              nocoll.push(item);
              callback();
            } else {
              for (var i1 = 0; i1 < namedata.length; i1++) {
                shdz = namedata[i1].imgurl;
                data1.push(shdz);
                // if (i1 == 0) {
                //   data1[0] = shdz;
                // } else {
                  
                // }
              }
              result[item]["imgurl"] =data1 ;
              callback();
            }
          });
        },
        function (err) {
          shoutui = result;
          // console.log(result)
          res.render('view/YAMANOMUSICOnline', {
            dengl: db,
            shouye: shoutui
          });
          return shoutui;

        });
    } else {
      return shoutui;
    }
  });




}