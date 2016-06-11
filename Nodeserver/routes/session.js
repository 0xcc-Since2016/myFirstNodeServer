var express = require('express');
var router  = express.Router();
//var Content = require('../models/content.js');
var TITLE   = 'session';  //Add Chinese Title here.

router.get('/', function(req,res){
	res.render('session' , {title:TITLE});
});





module.exports = router;
