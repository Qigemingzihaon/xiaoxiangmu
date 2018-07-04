const express=require('express');
const ejs=require('ejs');
module.exports=function(){
	server.engine('html', ejs.renderFile);
	server.set('view engine', 'html');
	server.set('views', 'view-html');
	return ejs;
}