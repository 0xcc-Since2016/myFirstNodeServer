var express = require('express');
var router  = express.Router();
var url     = require('url');
var Content = require('../models/content.js');
//var Content = require('../models/content.js');
var TITLE   = 'Picksit';  //Add Chinese Title here.
var Rand    = Math.floor(Math.random()*60+32);


router.get('/', function(req,res){
	var PID 	    = req.url[5]; //Specify PlayID.
	var D = "2D";
	if(PID==='2')
	{
		D="3D";
	}
	var refer   = req.headers.referer;
	if(refer===undefined)
	{
		//not Come from film Detail Page.
		res.redirect("seaRch"); //Can this word be bypassed?.
	}
	var temp    = url.parse(refer).query; 
	var ref     = url.parse(refer).href;
	if(temp ===null)
	{
		//not Come from film Detail Page.
		res.redirect("seaRch");
	}
	var FID     = temp[3];        //Specify FilmID.
	var pid     = FID + '' + '0' + '0' + '' + PID;
	console.log(pid);
	Content.getFilmPlayByTwoID( pid,FID, function(err , results){
	if(results == '')
		{
			//Failed to fetch what we want.
			res.locals.error = '场次不存在!';
			res.render('picksit', {title:TITLE});
			return;
		}

	else{


			var con = {
				ID       : results[0].ID,
				filmname : results[0].filmname,
				price    : results[0].price,
				timelong : results[0].timelong,
				type     : results[0].type,
				date     : results[0].date,
				time     : results[0].time,
				place    : results[0].place,
				D        : D,
				rand     : Rand
				}
			
			
			//console.log(con); //Debugg.
			res.render("picksit", {con:con});

			}
		});
});





module.exports = router;
