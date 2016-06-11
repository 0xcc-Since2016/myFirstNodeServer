var mysql   = require('mysql');
var DB_NAME = ;

var pool = mysql.createPool(
	{
		host     :   'localhost',
		user     :   'root',
		password :	 						//Mysql Connection pool.
	}
); 

pool.on('connection' , function(connection) {
		connection.query('SET SESSION auto_increment_increment=1');
});

function Content(content){
	this.ID 	  = content.ID;
	this.filmname = content.filmname;
	this.director = content.director;
	this.Mactor   = content.Mactor;
	this.price    = content.price;
	this.time     = content.time;
	this.type     = content.type;
	this.descr    = content.descr;
}

module.exports = Content;
//These are queries from user. And it's now being checked in mysql.
pool.getConnection (function(err,connection){
	var useDbSql = "USE " + DB_NAME;   //Construct a Mysql sentence: USE (database) 0xccnodesample.
	connection.query(useDbSql, function(err){
	if(err)
	{
		console.log("USE ERROR:" + err.message);
		return;
	}
	console.log("USE Succeed.");
});
	//Save data.
	Content.prototype.save = function save(callback) {
	var content = { //Json attention.
		ID 		 : this.ID,
		filmname : this.filmname,  
		director : this.director, 
		Mactor   : this.Mactor,
		price    : this.price,
		time     : this.time,
		type     : this.type,
		descr    : this.descr
	};  //Content is a json pattern.

	var insertFilm_Sql = "INSERT INTO film(id,filmname,director,Mactor,price,time,type,descr) VALUES			    (?,?,?,?,?,?,?,?)";
	connection.query(insertFilm_Sql, [content.ID, content.filmname, content.director, content.Mactor, 		 content.price , content.time , content.type , content.descr], function (err,result){
	if(err){
		console.log("insertSqlError:" + err.message);
		return;		
	}
	//Finish insert without failure.
	//connection.release();
	
	console.log("invoked[save]");
	callback(err,result);
});
};
		
	Content.getFilmDetailByName = function getFilmDetailByName(filmname, callback){
		var getFilmDetailByName_Sql = "SELECT * FROM film WHERE filmname = ?";
		connection.query(getFilmDetailByName_Sql, [filmname], function(err, result){
			if(err)
				{
					console.log("getFilmDetailByName Error" + err.message);
					return;
				}
			//connection.release();
			console.log("invoked[getUserNumByName]");
			callback(err, result);
		});
	};

	//Get-Content with Filmname Or ID. 
	Content.getFilmDetailByID = function getFilmDetailByID(ID, callback){
	
		var getFilmDetailByID_Sql = "SELECT * FROM film WHERE ID = ?";
		
		connection.query(getFilmDetailByID_Sql, [ID], function(err, result){
		 if(err)
			{
				console.log("getFilmDetailByID Error." + err.message);
				return;
			}
		//connection.release();
		console.log("invoked[getFilmDetailByID]");
		callback(err, result);	
		});
		
	};
	//场次信息。
	Content.getFilmPlayByID = function getFilmPlayByID(ID, callback){
		
		var getFilmPlayByID_Sql = "SELECT * FROM film_play,film WHERE film_play.id = ? and film.id = ?";
		
		connection.query(getFilmPlayByID_Sql, [ID,ID], function(err, result){
		if(err)
		{
			console.log("getFilmDetailByID Error. " + err.message);
			return;
		}	
		console.log("invoked[getFilmPlayByID]");
		callback(err, result);
	}); 	
   }

   Content.getFilmPlayBySearch = function getFilmPlayBySearch(SearchToken, callback){
		
		var getFilmPlayBySearch_Sql = "SELECT * FROM film natural join film_play WHERE filmname LIKE ?";
		
		connection.query(getFilmPlayBySearch_Sql, ['%'+SearchToken+'%'], function(err, result){
		if(err)
		{
			console.log("getFilmDetailByID Error. " + err.message);
			return;
		}	
		console.log("invoked[getFilmPlayByID]");
		callback(err, result);
	}); 	
   }
	
   Content.getFilmPlayByTwoID = function getFilmPlayByTwoID(PID,FID,callback){
		
		var getFilmPlayByID_Sql = "SELECT * FROM film_play,film WHERE film_play.playid = ? and film.id = ?";
		
		connection.query(getFilmPlayByID_Sql, [PID,FID], function(err, result){
		if(err)
		{
			console.log("getFilmDetailByID Error. " + 	err.message);
			return;
		}	
		console.log("invoked[getFilmPlayByID]");
		callback(err, result);
	}); 	
   }	


});
