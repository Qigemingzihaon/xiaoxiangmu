const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const NodeMailer = require(path.dirname(__dirname) + "/yueqi/lib/nodemailer.js");//传入收件人邮箱，发送内容
const NodeMailer1 = require(path.dirname(__dirname) + "/yueqi/lib/nodemailertz.js");//传入收件人邮箱，发送内容
const server = express();
//使用cookie
console.secret = '123asdad45545';
console.co= {maxAge:30*24*3600*1000};
console.NodeMailer=NodeMailer;
console.NodeMailer1=NodeMailer1;

server.use(cookieParser(console.secret));
server.use(session({
    secret:'123asdad45545',
    name:'session_id',
    resave: true,
      saveUninitialized: true,
    cookie:{maxAge:1800*1000}
}));

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json()); 

server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'qhview');


server.use('/yue',require('./js/yueqiqd.js')());

server.use('/admin',require('./js/admin.js')());
server.use('/admintj',require('./js/admintj.js')());

server.use('/tijiao',require('./js/tijiao.js')());
// server.use('/tijiao',require('./js/tijiao.js')());
// var a=require('./js/huoqust.js')()
// console.log(a.imgurl)

server.use('/',require('./js/yueqiqd.js')());
// server.use(function (req, res, next) {
//       res.redirect('/');
// });
// server.get('/dl',function (req,res) {
//   console.log(666)
//   res.render('view/dl');
// });


// server.get('/',function (req,res) {
//   res.render('view/YAMANOMUSICOnline');
// });
// server.get('/',require('./js/adminlogin.js')());
// server.use('/admin', require('./admin/adminlogin.js')());
// //server.use('/admin', require('./adminview/module/admin')());
// server.use('/wxlogin', require('./admin/login.js')());
// server.use('/kaishixuexi', require('./admin/kaishixuexi.js')());
server.use('/olimage', express.static('olimage'));

server.use(express.static('qhview/view'));
server.listen(80,'www.yueqi1803h5.com');