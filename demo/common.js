layui.use('table', function(){
	var table = layui.table;
  	var form = layui.form;
  	$ = layui.$;
  	
  	var active ={
  		searchDataButton:function(){
  			
  			let keys = {};
  			$('.search-form').find("input[name!=''],select[name!='']").each(function(){
  				keys[$(this).attr('name')]=$(this).val();
  			});
		    //执行重载
		    table.reload('tableData', {
		        page: { curr: 1  }, //重新从第 1 页开始
		        where: {key: keys},
		    });
		    
  		},
   		resetDataButton:function(){
   			if($('.search-form').size()>0){
   				$('.search-form')[0].reset();
   			}
  		},
   		chekedSearchFormButton:function(){
   			if($('.search-form').is(":hidden")){
   				$('.search-form').show('fast');
   				$(this).text('隐藏');
   			}else{
   				$('.search-form').hide('fast');
   				$(this).text('显示');
   			}
  		},
  	}
  	
  	$('.common-opration-btn .layui-btn').on('click', function(){
	    var type = $(this).data('type');
	    active[type] ? active[type].call(this) : '';
	});
	
	
	$('.search-form .layui-inline').css('margin-top','5px');
	$('hr.layui-bg-blue').css('margin','5px 0');
	
	$('.common-opration-btn').css('float','right');
	$('.common-opration-btn').css('margin-right','20px');

});