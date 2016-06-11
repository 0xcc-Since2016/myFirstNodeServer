var express = require('express');
var router  = express.Router();
var Content = require('../models/content.js');
var TITLE   = 'TEST';
var url     = require('url');
var Rand1   = Math.floor(Math.random()*30+12);
var Rand2   = Math.floor(Math.random()*30+12);

router.get('/', function(req,res){

	var len = req.url.length;
	console.log(len);
	if( len === 1)
	{
		res.redirect("seaRch");
	}
	var ID  = req.url[5];
	
	Content.getFilmPlayByID( ID, function(err , results){
	if(results == '')
		{
			//Failed to fetch what we want.
			res.locals.error = '场次不存在!';
			res.render('bill', {title:TITLE});
			return;
		}
	else{
			var P = results[1].price+15;
			var con1 = {
				ID       : results[0].ID,
				filmname : results[0].filmname,
				price    : results[0].price,
				timelong : results[0].timelong,
				type     : results[0].type,
				date     : results[0].date,
				time     : results[0].time,
				place    : results[0].place,
				Sitsleft : Rand1
				}
			var con2 = {
				ID       : results[1].ID,
				filmname : results[1].filmname,
				price    : P,
				timelong : results[1].timelong,
				type     : results[1].type,
				date     : results[1].date,
				time     : results[1].time,
				place    : results[1].place,
				Sitsleft : Rand2
				}

			var con = {
				con1 : con1,
				con2 : con2
				}
			
			//console.log(con); //Debugg.
			res.render("bill", {con:con});

			}
		});
		
	});



module.exports = router;
