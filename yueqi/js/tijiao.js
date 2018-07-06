const express = require('express');
const multer = require('multer');
const async = require('async');
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
  //提交购物车
  route.post('/gouwuche', function (req, res) {
    if (!req.session.graid) {
      // console.log("dl")
      res.send({
        r: "dl"
      });
    } else if (req.session.graid) {
      console.log("dlok")

      var $gwcdata = [req.session.graid, req.body.pdpctid, 0];
      var $gwcdatay = 'SELECT yesno,gwfs,gwc FROM `account_gwc` WHERE pdpctid = ?  LIMIT 1';
      var $gouwuche = 'INSERT INTO `account_gwc` (aid,pdpctid,yesno) VALUES (?,?,?)';
      var $sql1y = 'UPDATE `account_gwc` SET yesno =0 WHERE pdpctid = ?';
      var $sql1yf = 'UPDATE `account_gwc` SET gwfs =? WHERE gwc = ?';
      mysql.query($gwcdatay, [req.body.pdpctid], function (err1, result1) {
        if (result1.length) {
          console.log("已添加商品id")
          if (result1[0].yesno == '1') {
            console.log("已添加商品yesno1")
            mysql.query($sql1y, [req.body.pdpctid], function (err1, result12) {
              if (result12) {
                res.send({
                  r: "ok"
                });
              } else {
                res.send({
                  r: "no"
                });
              }
            });
          } else {
            console.log("已添加商品yesno。0")
            console.log(result1)

            console.log(result1[0].gwfs)

            var gwf = result1[0].gwfs + 1
            console.log(gwf)
            mysql.query($sql1yf, [gwf, result1[0].gwc], function (err1, result12) {
              if (result12) {
                res.send({
                  r: "ok"
                });
              } else {
                res.send({
                  r: "no"
                });
              }
            });
          }
        } else {
          console.log("dl123")

          mysql.query($gouwuche, $gwcdata, function (err, result) {
            if (result) {
              res.send({
                r: "ok"
              });
            } else {
              res.send({
                r: "no"
              });
            }
          });
        }
      });
    }
  });
  //删除购物车
  route.post('/deletegwc', function (req, res) {
    var $sql1yf = 'UPDATE `account_gwc` SET yesno =1 WHERE gwc = ?';
    if (!req.session.graid) {
      // console.log("dl")
      res.send({
        r: "no"
      });
    } else if (req.session.graid) {
      console.log("dlok")
      mysql.query($sql1yf, req.body.gwc, function (err, data) {
        if (data) {
          res.send({
            r: "ok"
          });
        } else {
          res.send({
            r: "no"
          });
        }
      });
    }
  });
  //获取购物车
  route.post('/huoqugwc', function (req, res) {
    $sqlshdz = 'SELECT username,qu,xiangxi,tel,p1id FROM `profile1` WHERE aid = ? AND dizkey=0';
    $sqlgwcsp = "SELECT ag.gwc,ag.aid,ag.pdpctid,pp.product_pname,pp.money,ag.gwfs\
    FROM account_gwc AS ag\
    LEFT JOIN product_particular  AS  pp\
    ON  ag.pdpctid = pp.pdpctid\
    WHERE ag.aid = ? AND ag.yesno=0";
    mysql.query($sqlgwcsp, req.session.graid, function (err11, namedata) {
      console.log(namedata)
      if (err11) {
        res.send({
          r: 'no'
        })
      } else {
        mysql.query($sqlshdz, req.session.graid, function (err11, shdi) {
          var shdz = [];
          var shdz1 = {};
          if (shdi) {
            console.log(shdi);
            for (var i = 0; i < shdi.length; i++) {
              shdz1 = {};
              shdz1["p1id"] = shdi[i].p1id;
              shdz1["xianshidz"] = "姓名：" + shdi[i].username + "电话：" + shdi[i].tel + "地址：" + shdi[i].qu + shdi[i].xiangxi;
              shdz.push(shdz1);
            };
            for (var i1 = 0; i1 < namedata.length; i1++) {
              console.log(namedata[i1])
              namedata[i1].shdz = shdz;
              namedata[i1].p1id = '';
              namedata[i1].checked = false;

            }
            // console.log(namedata)
            res.send({
              r: 'ok',
              rn: namedata
            })
          } else {
            res.send({
              r: 'no'
            })
          }
        });
      }

    });



    // res.send({
    //   r: 'ok'
    // })
  });
  //购物车提交
  route.post('/tongzhidianjia', function (req, res) {
    var tongzhisj = req.body.tongzhi;
    var coll = [];
    var nocoll = [];
    var dianzhangtz = [];
    var gwcid=[];
    $sqlgwcsp = "SELECT a.email,a.aid,pp.product_pname,pp.money,pf.username,pf.qu,pf.xiangxi,pf.tel,pf.postcode,ag.gwfs\
    FROM product_particular AS pp\
    LEFT JOIN account  AS  a\
    ON  pp.adminid = a.aid\
    LEFT JOIN profile1  AS  pf\
    ON  pf.aid = a.aid\
    LEFT JOIN account_gwc  AS  ag\
    ON  ag.pdpctid = pp.pdpctid\
    WHERE pp.pdpctid = ? AND pf.p1id=? AND pp.yesno=0";
    for (let i = 0; i < tongzhisj.length; i++) {
      coll.push(i);
      gwcid.push(tongzhisj[i].gwc);
    }
    console.log(666)
    async.each(coll, function (item, callback) {
        // console.log(item)
        var $data = [tongzhisj[item].pdpctid, tongzhisj[item].p1id];
        mysql.query($sqlgwcsp, $data, function (err11, namedata) {
          // console.log(namedata,66666)
          if (err11) {
            nocoll.push(item);
            callback();
          } else {
            dianzhangtz.push(namedata[0]);
            callback();
          }
        });
      },
      function (err) {
        console.log(dianzhangtz)
        var coll1 = [];
        for (let i1 = 0; i1 < dianzhangtz.length; i1++) {
          coll1.push(i1);
        }
        async.each(coll1, function (item1, callback) {
            var suijidlid='商品：'+dianzhangtz[item1].product_pname+'；</br>\
            单价：'+dianzhangtz[item1].money+'</br>\
            份数'+dianzhangtz[item1].gwfs+'</br>\
            送货信息：收件人：'+dianzhangtz[item1].username+'电话：'+dianzhangtz[item1].tel+'邮编：\
            '+dianzhangtz[item1].postcode+'详细地址：'+dianzhangtz[item1].qu+'-'+dianzhangtz[item1].xiangxi
            console.log(suijidlid)
            console.NodeMailer1(dianzhangtz[item1].email,suijidlid, callback);
          },
          function (err) {
            // console.log(dianzhangtz)
            var qingkgwc='UPDATE `account_gwc` SET yesno =?, gwfs=? WHERE gwc =?';
            
            async.each(coll, function (it1, callback) {
              var datagwc=[1,0,gwcid[it1]];
              mysql.query(qingkgwc, datagwc, function (err11, namedata) {
                // console.log(namedata,66666)
                if (err11) {
                  nocoll.push(item);
                  callback();
                } else {
                  callback();
                }
              });
              console.log(suijidlid)
            },
            function (err) {
              // console.log(dianzhangtz)
              
              res.json({
                r: 'ok'
              });
            });
            
          });
      });

  });
  //忘记密码
  route.post('/wangjimima', function (req, res) {
    // console.log(req.body)
    console.log(req.body)
    var $data1 = '',
      $sql1 = '',
      datal = '';
    var pw = crypto_md5.md5(req.body.passwd);
    //设置sql语句
    if (req.body.tel) {
      $data1 = [req.body.tel];
      datal = "tel";
      $sql1 = 'SELECT aid,username,tel,suijidlid,passwdwt,passwdwtda FROM `account` WHERE tel = ?  LIMIT 1';
      // console.log('tel')
    } else {
      $data1 = [req.body.suijidlid];
      datal = "suijidlid";
      $sql1 = 'SELECT aid,username,tel,suijidlid,passwdwt,passwdwtda FROM `account` WHERE suijidlid = ?  LIMIT 1';
      // console.log('zhangh')
    }
    mysql.query($sql1, $data1[0], function (err, result) {
      if (result.length) {
        console.log(result);
        res.cookie('yhwt', "yhwt", console.co);
        req.session.yhwt = result[0];
        res.json({
          r: 'ok'
        });
      } else if (err) {
        res.json({
          r: 'tel11-exist'
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
  //获取问题
  route.post('/huoquwt', function (req, res) {
    // console.log(req.body)
    res.send({
      r: req.session.yhwt.passwdwt
    });
  });
  //提交答案tijiaodaan对比passwdwtda
  route.post('/tijiaodaan', function (req, res) {
    console.log(req.body.passwdwtda)
    if (req.body.passwdwtda == req.session.yhwt.passwdwtda) {
      res.send({
        r: 'ok'
      });
    } else {
      res.send({
        r: 'no'
      });
    }

  });
  //变更密码
  route.post('/genggaimm', function (req, res) {
    console.log(req.body.passwd)
    var pw = crypto_md5.md5(req.body.passwd);
    var $sqldata = [pw, req.session.yhwt.aid];
    var $sql1 = 'UPDATE `account` SET passwd =? WHERE aid = ?';
    mysql.query($sql1, $sqldata, function (err, result) {
      console.log(result)
      if (result) {
        res.send("ok");
      } else {
        res.send("no");
      }
    });
  });
  //忘记账号
  route.post('/zhaohuizh', function (req, res) {
    console.log(req.body)

    $data1 = [req.body.tel, req.body.email];
    $sql1 = 'SELECT suijidlid FROM `account` WHERE tel = ? AND email=? LIMIT 1';
    mysql.query($sql1, $data1, function (err, result) {
      if (result.length) {
        console.log(result[0])
        // var neirong='账号：'+result[0].suijidlid+'随机密码：'
        console.NodeMailer(req.body.email, result[0].suijidlid, res);

      } else if (err) {
        res.json({
          r: 'tel11-exist'
        });
      } else {
        res.json({
          r: 'no'
        });
      }
    });
  });
  // route.use(express.static('qhview/view'));
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
      $sql1 = 'SELECT aid,username,tel,suijidlid,passwd FROM `account` WHERE tel = ? AND nosid=0 LIMIT 1';
      // console.log('tel')
    } else {
      $data1 = [req.body.suijidlid, pw];
      datal = "suijidlid";
      $sql1 = 'SELECT aid,username,tel,suijidlid,passwd FROM `account` WHERE suijidlid = ? AND nosid=0 LIMIT 1';
      // console.log('zhangh')
    }
    mysql.query($sql1, $data1[0], function (err, result) {
      if (result.length) {
        console.log(result, pw);
        if (result[0].passwd == pw) {
          res.cookie('yhdl', "yhdl", console.co);
          req.session.yhdl = result[0];
          req.session.yhname = result[0].username;
          req.session.graid = result[0].aid;
          req.session.baocpid = {
            p1id: '',
            FuncTion: ''
          };
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
  //更改信息获取值
  route.post('/huoquxx', function (req, res) {
    console.log('66')
    var $sql1 = 'SELECT a.aid,a.suijidlid,a.username,a.usernamep,p.postcode,p.shi,\
    p.qu,p.xiangxi,a.tel,a.email,a.sexType,a.`year`,a.`month`,a.passwd,\
    a.passwdwt,a.passwdwtda,a.mail_magazine_flg\
    FROM `account` AS a\
    LEFT JOIN `profile`  AS  p\
    ON  a.aid = p.aid\
    WHERE a.aid = ? AND p.dizmor=1';
    //根据id获取值    
    // var $sqldata = ["1"];
    var $sqldata = [req.session.graid];
    mysql.query($sql1, $sqldata, function (err, result) {
      console.log(result)
      res.json({
        r: result[0]
      });
    });
  });
  //删除收货地址更改其dizkey为1
  route.post('/deletedz', function (req, res) {
    console.log(req.body);
    var $sqldata = ["1", req.body.p1id];
    var $sql1 = 'UPDATE `profile1` SET dizkey =? WHERE p1id = ?';
    mysql.query($sql1, $sqldata, function (err, result) {
      console.log(result)
      if (result) {
        res.send("ok");
      } else {
        res.send("no");
      }
    });
  });
  //获取用户名信息
  route.post('/huoquname', function (req, res) {
    // console.log(req.body)
    var name = req.session.yhdl.username;
    // var name = "nihao";
    if (req.session.baocpid && req.session.baocpid.FuncTion == 'Change') {
      // var $sqldata=[req.session.graid,'0'];
      var usernameyh = req.session.yhname;
      // var usernameyh = '山本 山姆';
      var $sqldata = [req.session.baocpid.p1id, '0'];
      var $sql1 = 'SELECT p1id,aid,usernames,username,postcode,shi,qu,xiangxi,\
    tel,dizmor FROM `profile1` WHERE p1id = ? AND dizkey=?';
      // console.log(req.body)
      mysql.query($sql1, $sqldata, function (err, result) {
        console.log(result)
        if (result) {
          res.send({
            nameyh: usernameyh,
            shdz: result
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
  //获取收货信息
  route.post('/baocpid', function (req, res) {
    console.log(req.body)
    res.cookie('baocpid', "baocpid", console.co);
    req.session.baocpid = req.body;
    res.send('ok');
  });
  //注册 保存注册更改信息到session
  route.post('/shdzsn', function (req, res) {
    // console.log(req.body)
    res.cookie('shdzsn', "shdzsn", console.co);
    req.session.shdzsn = req.body;
    res.send('ok');
  });
  route.post('/huoqudzsn', function (req, res) {
    // console.log(req.body)
    var ressend = req.session.shdzsn;
    ressend['grname'] = req.session.yhdl.username;
    // ressend['grname'] = "你好";
    res.send({
      r: ressend
    });
  });
  route.post('/shdzbc', function (req, res) {
    // var aid = '1';
    var aid = req.session.graid;
    var data = req.session.shdzsn;
    console.log(req.session.shdzsn)
    var $sqlzcdz = '';
    var $sqldatadz = '';
    if (data.p1id == '') {
      $sqlzcdz = 'INSERT INTO `profile1` (aid,usernames,username,postcode,shi,qu,xiangxi,\
        tel,dizmor) VALUES (?,?,?,?,?,?,?,?,?)';
      $sqldatadz = [aid, data.usernames, data.username, data.postcode, data.shi,
        data.qu, data.xiangxi, data.tel, '1'
      ]
    } else {
      $sqlzcdz = 'UPDATE `profile1` SET aid =?, usernames=?,username=?,postcode=?,\
      shi=?,qu=?,xiangxi=? ,tel=?,dizmor=? WHERE p1id =?';
      $sqldatadz = [aid, data.usernames, data.username, data.postcode, data.shi,
        data.qu, data.xiangxi, data.tel, '1', data.p1id
      ]
    }
    console.log($sqldatadz);
    mysql.query($sqlzcdz, $sqldatadz, function (err, result) {
      if (result) {
        res.send({
          r: "ok"
        });
      } else {
        res.send({
          r: "no"
        });
      }
    });
  });
  //获取session保存的更改信息
  route.post('/huoqubcs', function (req, res) {
    // console.log(req.body)
    if (req.session.shifouzuce && req.session.shifouzuce == "ok") {
      res.send({
        r: req.session.zcxi
      });
    } else {
      res.send({
        r: "no"
      });
    }
  });
  //获取session保存的更改信息
  route.post('/huoquxxz', function (req, res) {
    // console.log(req.body)
    res.send({
      r: req.session.zcxi
    });
  });
  route.post('/baochungg', function (req, res) {
    var data = req.session.zcxi;
    var pw = crypto_md5.md5(req.session.zcxi.passwd);
    var time = new Date;
    var $data_a = [data.username, data.usernamep,
      data.tel, data.email,
      data.sexType, data.year,
      data.month, pw,
      data.passwdwt, data.passwdwtda,
      data.mail_magazine_flg, time,
      req.ip, req.session.yhdl.aid
    ];
    var $data_p = [data.postcode, data.shi,
      data.qu, data.xiangxi,
      req.session.yhdl.aid, '1'
    ];
    var $sqla = 'UPDATE `account` SET username =?, usernamep=?,tel=?,email=?,sexType=?,year=?\
     ,month=? ,passwd=?,passwdwt=?,passwdwtda=?,mail_magazine_flg=?,time=?,login_ip=? WHERE aid =?';
    var $sqlp = 'UPDATE `profile` SET postcode =?, shi=?,qu=?,xiangxi=? WHERE aid =? AND dizmor=?';
    // console.log(req.session.zcxi)
    // console.log($data_a)
    // console.log($data_p)
    mysql.query($sqla, $data_a, function (err, result) {
      if (result) {
        // console.log("result")
        mysql.query($sqlp, $data_p, function (err, result) {
          // console.log(err)
          if (result) {
            req.session.shifouzuce = "no";
            res.send({
              r: "ok"
            });
          } else {
            // console.log("$data_p")
            res.send({
              r: "no"
            });
          }
        });
      } else {
        // console.log(result)
        res.send({
          r: "no"
        });
      }
    });
  });
  //注册 保存注册更改信息到session
  route.post('/zc', function (req, res) {
    // console.log(req.body)
    res.cookie('zcxi', "sss", console.co);
    req.session.zcxi = req.body;
    req.session.shifouzuce = "ok";
    res.send('ok');
  });
  //注册信息保存到数据库
  route.post('/zcqr', function (req, res) {
    var time = new Date,
      timey = time.getFullYear(),
      timeym = time.getMonth() + 1;
    // console.log(req.ip)
    // console.log(req.session.zcxi)
    var suijidlid = timey + '-' + timeym + '-' + Math.floor(Math.random() * 99) + Math.floor(Math.random() * 999999);
    var pw = crypto_md5.md5(req.session.zcxi.passwd);
    console.log(suijidlid)
    var $sql1 = 'SELECT tel FROM `account` WHERE tel = ?  LIMIT 1';
    var $sqlzccr = 'INSERT INTO `account` (suijidlid,username,usernamep,tel,email,\
      sexType,year,month,passwd,passwdwt,passwdwtda,mail_magazine_flg,time,login_ip\
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var $sqlzcdz = 'INSERT INTO `profile` (aid,postcode,shi,qu,xiangxi,\
      dizmor) VALUES (?,?,?,?,?,?)';
    var $sqldata = [
      suijidlid, req.session.zcxi.username,
      req.session.zcxi.usernamep,
      req.session.zcxi.tel, req.session.zcxi.email,
      req.session.zcxi.sexType, req.session.zcxi.year,
      req.session.zcxi.month, pw,
      req.session.zcxi.passwdwt, req.session.zcxi.passwdwtda,
      req.session.zcxi.mail_magazine_flg, time,
      req.ip
    ];
    var $sqldatadz = [];
    mysql.query($sql1, $sqldata[3], function (err, result) {
      if (result.length) {
        // console.log(result[0])
        res.json({
          r: 'tel-exist'
        });
      } else {
        mysql.query($sqlzccr, $sqldata, function (err, result) {
          // console.log(err)
          // console.log(result.insertId)
          if (err) {
            res.json(err);
          } else {
            var aid = result.insertId;
            $sqldatadz = [result.insertId, req.session.zcxi.postcode, req.session.zcxi.shi,
              req.session.zcxi.qu, req.session.zcxi.xiangxi, '1'
            ]
            // console.log($sqldatadz)
            mysql.query($sqlzcdz, $sqldatadz, function (err, result) {
              // console.log(err)
              // console.log(result)
              if (err) {
                res.json(err);
              } else {
                res.cookie('zczhanid', "sss", console.co);
                req.session.zczhanid = suijidlid;
                req.session.graid = aid;
                res.json({
                  r: 'ok'
                });
              }
            });
          }
        });
      }
    });
    // console.log($sqldata)
    // res.send('ok');
  });
  return route;
}