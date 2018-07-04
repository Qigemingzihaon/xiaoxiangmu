const express = require('express');
const nodeMailer = require('nodemailer');
module.exports = function (email,suijidlid,res1) {
  var transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: '1591006423@qq.com',
      pass: 'eureyxyujmoofgfc'
    }
  });
  var mailOptions = {
    from: '1591006423@qq.com', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: "账号找回", // plaintext body
    html: '<b>你的账号是：'+suijidlid+' ✔</b>' // html body
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      res1.json({
        r: 'ok'
      });
    }
  });
}