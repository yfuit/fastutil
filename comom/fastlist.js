var listStyle =".searchForm{padding:8px;} .searchForm .textbox{margin:5px;} " +
"form .textbox{margin:10px;} " +
".tool-seq{ " +
"	display:inline-block; " +
"	border-left: 1px solid rgb(221, 221, 221);  " +
"	border-right: 1px solid rgb(255, 255, 255); " +
"	height:20px;margin:-7px 1px; " +
"} " +
".fa{color: green;line-height: 18px;} " +
".l-btn-text{margin: 0 10px;} ";
$("<style></style>").text(listStyle).appendTo($("head"));

function getPost(url,param,success,type){
	$.messager.progress();
	$.post(url,param,success,type)
	.fail(function(data) {
		if(0==data.readyState){
			$.messager.alert('错误','服务器关闭!','error');
		}else if(4 == data.readyState){
			if("Internal Server Error" == data.statusText){
				$.messager.alert('错误','服务器异常!','error');
			}else if("Not Found" == data.statusText){
				$.messager.alert('警告','无效请求，请联系管理员!','warning');
			}else if("Ajax BindException" == data.statusText){
				$.messager.alert('错误',data.msg,'error');
			}
		}else{
			$.messager.alert('错误','未知错误，请联系管理员!','error');
		}
	}).always(function(){
		$.messager.progress('close');
	})
}

function ajaxForm(url,param,success,type){
	$.messager.progress();
	$.ajax({
	    url: url,
	    type: 'POST',dataType:type, 
	    cache: false,
	    data: param,
	    processData: false,
	    contentType: false,
	}).done(function(data){
		
		if('object' == typeof data){
			try {
				var e = data;
		        if (e.sysErrorCode) {
		        	if(e.sysErrorCode == '512'){
		        		$.messager.alert('错误',e.sysErrorMsg,'error');
		        	}else{
		        		$.messager.alert('错误',e.sysErrorMsg,'error'); 
		        	}
		        	return;
		        }
		    } catch (err) {
		    	$.messager.alert('异常',err,'error');
		    }
		}
		success(data);
	})
	.fail(function(data) {
		if(0==data.readyState){
			$.messager.alert('错误','服务器关闭!','error');
		}else if(4 == data.readyState){
			if("Internal Server Error" == data.statusText){
				$.messager.alert('错误','服务器异常!','error');
			}else if("Not Found" == data.statusText){
				$.messager.alert('警告','无效请求，请联系管理员!','warning');
			}else if("Ajax BindException" == data.statusText){
				$.messager.alert('错误',data.msg,'error');
			}
		}else{
			$.messager.alert('错误','未知错误，请联系管理员!','error');
		}
	}).always(function(){
		$.messager.progress('close');
	});
}

function forTarget(targetSrc){
	var target = $(targetSrc).data('target');
	target = target.substring(1,target.length-1);
	target = target.split('|');
	
	var targetMethod = target[0];
	if('query'== targetMethod){
		var targetForm = target[1];
		var targetDg = target[2];
		$(targetSrc).click(function(){
			var arrs = $(targetForm).serializeArray() ;
			var parram = {};
			if(arrs instanceof Array){
				for(var i =0 ;i<arrs.length;i++){
					parram[arrs[i].name]=arrs[i].value;
				}
			}
			$(targetDg).datagrid('load',parram);
		});
		return;
	}else if('reset' == targetMethod){
		var targetForm = target[1];
		$(targetSrc).click(function(targetObj){
			$(targetForm).form('disableValidation');
			$(targetForm).form('reset');
		});
		return;
	}
}

$(function(){
	
	$('[data-target^="["][data-target$="]"]').each(function(){
		forTarget(this);
	});
	
})



$.extend($.fn.validatebox.defaults.rules, {
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少（2）个字符.'
    },
    length: { validator: function (value, param) {
        var len = $.trim(value).length;
        return len >= param[0] && len <= param[1];
    },
        message: "输入内容长度必须介于{0}和{1}之间."
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^(13|15|18)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: {// 验证QQ,从10000开始
        validator: function (value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    integer: {// 验证整数 可正负数
        validator: function (value) {
            //return /^[+]?[1-9]+\d*$/i.test(value);
            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },
    chinese: {// 验证中文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: {// 验证用户名
        validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno: {// 验证传真
        validator: function (value) {
            //            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '清输入合适的日期格式'
    },
    msn: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    same: {
        validator: function (value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    }
});