$.py=function(js,call){
	params ={};
	params.uri = "https://yfuit.github.io/utils/admin/run/"+js;
	$.get("http://localhost:8081/run",params,call).error(function() { alert("网络异常"); });
}

//guri 执行url
//gstr
runUrl="http://localhost:8083/grun";
//参数 {guri:'',gstr:''}
//下面参数 com.CTX.param ;
//放回结果 com.CTX.result;

