var express = require('express');
var router  = express.Router();
var User    = require('../models/user.js');
var crypto      = require('crypto');
var TITLE_LOGIN = '登录';

router.get('/', function(req,res){
	res.render('login', {title: TITLE_LOGIN});
});

router.post('/', function(req,res){
	var userName = req.body['txtUserName'];
	var userPwd  = req.body['txtUserPwd'];
	var isRem    = req.body['chbRem'];
	var md5      = crypto.createHash('md5');
	
	//Check if logging-in.
	User.getUserByUserName(userName, function(err, results){
	if(results == '')
		{
			res.locals.error = '用户不存在';
			res.render('login', {title:TITLE_LOGIN});
			return;
		}
	userPwd = md5.update(userPwd).digest('hex');
	if(results[0].UserName !== userName || results[0].UserPass !== userPwd)
		{
			res.locals.error  =  '用户名或密码错误.';
			res.render('login', {title:TITLE_LOGIN});
			console.log(1);  //LOg failed attempts here.
			return;
		}
	else
		{
			if(isRem)
			{
				res.cookie('islogin', userName, {maxAge: 60000}); //60s for remember.
			}
			
			res.locals.username = userName;
			res.session.username = res.locals.username;
			console.log(req.session.username);
			
			res.redirect('/');
			return;
		}
});
});

module.exports = router;
