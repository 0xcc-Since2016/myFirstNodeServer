var express = require('express');
var router  = express.Router();
var Content = require('../models/content.js');
var TITLE   = 'FilmDetail';  //Add Chinese Title here.

router.get('/', function(req,res){
	var ID = req.url[5];
	//res.render('filmDetail' , {title:TITLE});

	Content.getFilmDetailByID(ID , function(err , results){
		if(results == '')
		{
			//Failed to fetch what we want.
			res.locals.error = 'Film不存在!';
			res.render('filmDetail', {title:TITLE});
			return;
		}
		else
		{
			var Rand1   = Math.floor(Math.random()*3000+1000);
			var content = { //Json attention.
				ID 		 : results[0].ID,
				filmname : results[0].filmname,  
				director : results[0].director,
				Mactor   : results[0].Mactor,
				price    : results[0].price,
				time     : results[0].timelong,
				type     : results[0].type,
				descr    : results[0].descr,
				Rand     : Rand1
			};
			console.log(content);
			res.render('filmDetail', {content:content});

		}
		
	});
});





module.exports = router;
