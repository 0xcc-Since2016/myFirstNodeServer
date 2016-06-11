var express = require('express');
var router  = express.Router();
var url     = require('url');
var Content = require('../models/content.js');
//var Content = require('../models/content.js');
var TITLE   = 'finish';  //Add Chinese Title here.

router.get('/', function(req,res){
	
	
	res.render('finish');
	
});



module.exports = router;
