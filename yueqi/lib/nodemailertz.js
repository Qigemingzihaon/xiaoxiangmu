const express = require('express');
const nodeMailer = require('nodemailer');
module.exports = function (email,suijidlid,callback) {
  console.log(66666)
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
    text: "发货通知", // plaintext body
    html: suijidlid // html body
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      callback();
    }
  });
}