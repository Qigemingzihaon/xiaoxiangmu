const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const server = express();


server.use(bodyParser.urlencoded({
    extended: false
}));

server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'adminview');

server.use('/admin', require('./admin/adminlogin.js')());
//server.use('/admin', require('./adminview/module/admin')());
server.use('/wxlogin', require('./admin/login.js')());
server.use('/kaishixuexi', require('./admin/kaishixuexi.js')());
server.use('/olimage', express.static('olimage'));
server.listen(8080);