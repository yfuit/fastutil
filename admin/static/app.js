//npm install express --save

/* gh-pages   	https://${github_username}.github.io/${path}
				https://yfuit.github.io/utils/admin/
*/


//var hostname = "127.0.0.1";
var hostname = "https://yfuit.github.io/utils/admin/run/";
//var port = 80;

var express = require("express");
var http = require('http');
var https = require('https');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
var yfuitApp={};
app.get('/run',function(req,res){
	//let urlAddress = req.query.uri;
	//"https://yfuit.github.io/utils/admin/static/vue.js"
	console.log("run:"+req.query.uri)
	let reqRestlt = https.request(req.query.uri,function(res){
		res.on('data',function(chunk){
			let randName = Math.floor(Math.random()*100000);
			//console.log('BOODY:'+ chunk);
			eval("function tmp"+randName+"(){" +chunk+"}");
			eval("tmp"+randName+"()");
			//console.log('end');
		})
	})

	reqRestlt.on('error', function (e) {  
	    console.log('problem with request: ' + e.message);  
	});  
	  
	reqRestlt.end();
	if(yfuitApp.result){
		res.send(yfuitApp.result);
	}
	yfuitApp.result=null;
});

var server = app.listen(8081,function(){

	var host = server.address().address;
	var port = server.address().port;

	console.log("应用实例：访问地址http://%s:%s",host,port);
})