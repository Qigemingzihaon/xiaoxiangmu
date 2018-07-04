const express=require('express');
const mySql=require('mysql');
module.exports=function(db){
	var mysql=mySql.createConnection({
		host:'localhost',
		user:'root',
		password:'root',
		port:3306,
		database:db
	});
	mysql.connect(function(err,result){
//		console.log("链接数据库异常");
//		console.log(result);
//		console.log(err);
	});
	mysql.query('SET NAMES UTF8');
	return mysql;
}
