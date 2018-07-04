const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require(path.dirname(__dirname) + "/lib/mysql.js")('50sound');
const uuid = require('uuid');