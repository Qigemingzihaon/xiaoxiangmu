const crypto 		= require('crypto');
module.exports 		= {
	md5:function(str){
		var secret = '89$%&^^gg78678jkgugyu不爱国阿斯顿撒多大都会';
		//创建一个hash对象，并指定使用md5算法
		var md5obj = crypto.Hash('md5');
		//把字符串更新到hash对象
		////给需要加密的字符串加个密钥
		md5obj.update(str + secret);
		//获取加密后的字符串的摘要：使用十六进制
		return md5obj.digest('hex');
	}
}