var path = require('path');
var fs = require('fs'); //文件系统
var formidable = require('formidable'); //引用formidable来解析请求，上传文件
var dateFormat = require('dateformat'); //生成时间对象，来重命名上传的图片，避免图片的重复

module.exports = {
    /**通过formdata上传图片
     * 参数1--req,express请求
     * 参数2--dirName,静态资源下的路径
     * 参数3--callback,回调函数，callback(err,fields,uploadPath),返回错误对象,表单字段和图片上传的地址
     */
    uploadPhoto: function(req, dirName, callback) {
        //上传文件
        // parse a file upload
        var form = new formidable.IncomingForm();
        // console.log(form)
        form.uploadDir = path.join(__dirname, '../olimage', dirName);
        //如果文件夹不存在则创建
        var folder = form.uploadDir;
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, 0777);
        };
        //保留文件扩展名
        form.multiples = true; //设置为多文件上传
        form.keepExtensions = true;
        form.maxFileSize = 200 * 1024 * 1024;
        form.maxFieldsSize = 200 * 1024 * 1024;
        form.encoding = 'utf-8';

        form.onPart = function(part) {
            if (part.filename != '') {
                // let formidable handle all non-file parts 
                form.handlePart(part);
            }
        };
        //通过formidable进行图片的上传
        form.parse(req, function(err, fields, files) {
            if (err) {
                callback && callback(err, null, null);
                return;
            }
            if (!files.userfile) { //前台上传表单的时候，文件使用的字段名是userfile,这里对文件是否为空进行判断
                var errMsg = {
                    errCode: -10,
                    errMsg: '文件为空'
                };
                callback && callback(errMsg, null, null);
                return;
            }
            //文件不为空的情况下，说明文件已经上传到我们的服务器中
            //这时，需要我们使用fs模块把我们已经上传的路径改为我们想要的位置
            //并且使用dateFormat来创建时间字符串，从而避免文件的重名
            var time = dateFormat(new Date(), "yyyymmddHHMMss");
            console.log(files.userfile)
            var finalPath = []; //上传文件保存路径
            var finalname = []; //上传文件名字
            var finalPath2 = '',
                extName, newName, oldPath, newPath;
            // console.log(files.userfile.length)
            if (!Array.isArray(files.userfile)) {
                time = dateFormat(new Date(), "yyyymmddHHMMss");
                //files.userfile.path代表的是formidable为我们上传文件后绝对路径，通过path的extname来获取图片后缀
                extName = path.extname(files.userfile.path);
                newName = time + '_' + Math.floor(Math.random() * 999999) + extName; //使用dateFormat+随机数+文件后缀生成新文件名
                // console.log(66)
                oldPath = files.userfile.path;
                var newPath = path.join(__dirname, '../olimage', dirName, newName);
                //修改文件的名字
                fs.renameSync(oldPath, newPath);
                finalPath2 = path.join('/', dirName, newName).split('\\').join('/'); //将路径中的'\'替换为'/''
                finalname.push(files.userfile.name)
                finalPath.push(finalPath2)
            } else {
                for (var userFile of files.userfile) {
                    //files.userfile.path代表的是formidable为我们上传文件后绝对路径，通过path的extname来获取图片后缀
                    extName = path.extname(userFile.path);
                    newName = time + '_' + Math.floor(Math.random() * 999999) + extName; //使用dateFormat+随机数+文件后缀生成新文件名
                    oldPath = userFile.path;
                    newPath = path.join(__dirname, '../olimage', dirName, newName);
                    //修改文件的名字
                    fs.renameSync(oldPath, newPath);
                    finalPath2 = path.join('/', dirName, newName).split('\\').join('/'); //将路径中的'\'替换为'/'
                    finalname.push(userFile.name)
                    finalPath.push(finalPath2)
                }
            }
            callback && callback(null, fields, finalPath, finalname); //回掉函数返回表单字段以及图片上传的相对路径
        });
    }
};