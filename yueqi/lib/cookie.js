const cookieParser = require('cookie-parser');
const session = require('express-session');
module.exports 		= {
	cokie:function(str){
		var secret = '123asdad45545';
  route.use(cookieParser(secret));
  var co = {
    maxAge: 30 * 24 * 3600 * 1000
  };
  route.use(session({
    secret: '123asdad45545',
    name: 'session_id',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1800 * 1000
    }
  }));
  }
}