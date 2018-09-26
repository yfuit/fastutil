$.py=function(js,call){
	params ={};
	params.uri = "https://yfuit.github.io/utils/admin/run/"+js;
	$.get("http://localhost:8081/run",params,call).error(function() { alert("error"); });
}
