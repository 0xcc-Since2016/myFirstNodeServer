var express = require('express');
var router  = express.Router();
var Content = require('../models/content.js');
var TITLE   = 'TEST';
var url     = require('url');


router.get('/', function(req,res){
	
	res.render("seaRch", {title:TITLE});

});

router.post('/', function(req,res){

	var searchContent = req.body.text;
	//console.log(searchContent);
	Content.getFilmPlayBySearch(searchContent, function(err,results){

		if(err)
		{	
			res.locals.error = '场次不存在!';
			res.render('bill', {title:TITLE});
			return;
		}
		else
		{
			if(results.length===0)
			{
				res.redirect('nores');
				console.log('jumped.');
			}
			else
			{
				console.log("ResultsID: " + results[0].ID);
				switch(results[0].ID)
				{
					case 1:
					res.redirect('bill?id=1');
					break;
					case 2:
					res.redirect('bill?id=2');
					break;
					case 3:
					res.redirect('bill?id=3');
					break;
					case 4:
					res.redirect('bill?id=4');
					break;
					case 5:
					res.redirect('bill?id=5');
					break;
					case 6:
					res.redirect('bill?id=5');
					break;
					case 7:
					res.redirect('bill?id=5');
					break;
					case 8:
					res.redirect('bill?id=5');
					break;
				}
			}
		}
	});
	
});


module.exports = router;
