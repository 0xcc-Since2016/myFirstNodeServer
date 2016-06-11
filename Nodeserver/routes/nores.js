var express = require('express');
var router  = express.Router();
var Content = require('../models/content.js');
var TITLE   = 'TEST';
var url     = require('url');

router.get('/',function(req,res){

	res.render('nores');
});





module.exports = router;
