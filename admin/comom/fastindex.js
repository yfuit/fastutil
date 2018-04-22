$(function(){
			$('#tree').tree({
				onClick: function(node){
					if($("#tree").tree("isLeaf",node.target)){
						var index = node.id;
						var title = "<span style='display:none;'>"+index+"</span>"+ node.text +""; 
						var state = node.state;
						//id":11,"text":"菜单管理","iconCls":"fa fa-circle-thin","state":"open","domId":"_easyui_tree_19
						
						if($('#tabs').tabs('exists', title)){
							$('#tabs').tabs('select', title);
						}else{
							var url = null;
							if(node.attributes){
								url = node.attributes.url;
							}else{
								alert("无效菜单"+node.text);return;
							}
							if(!url){alert("无效菜单"+node.text);return;}
							
							$('#tabs').tabs('add',{
								id:index,
								title : title,
								content : '<iframe src="'+ url	+ '" scrolling="auto"></iframe>',
								closable : true
							});
						}
						return;
					}else{
						if('open'==node.state){
							$('#tree').tree('collapse', node.target)
						}else if('closed'== node.state){
							$('#tree').tree('expand', node.target)
						}
					}
				}
			});
			
			$('#tabs').tabs(
				{
					"onSelect":
					function(title,index){
						var id = $(title).filter("span").html();
						if(id){
							$('#tree').tree('expandTo', $('#tree').tree('find', id).target);
							$('#tree').tree('select', $('#tree').tree('find', id).target);
						}
					},
					"onContextMenu":
					function(e,title,index){
						e.preventDefault();
						$('#tabsMenu').menu('show', {left : e.pageX,top : e.pageY});
						$('#tabsMenu').data("currtab", title);
						$('#tabs').tabs('select', title);
					}
				}
			);
			
			tabCloseEven();
		})
		
	//绑定右键菜单事件
	function tabCloseEven() {
		//刷新
		$('#mm-tabupdate').click(
						function() {
							var currTab = $('#tabs').tabs('getSelected');
							var url = $(currTab.panel('options').content).attr(
									'src');

							if (url != undefined
									&& currTab.panel('options').title != 'welcome') {
								var content = '<iframe scrolling="no" frameborder="0"  src="'
										+ url
										+ '" style="width:100%;height:100%;"></iframe>';

								$('#tabs').tabs('update', {
									tab : currTab,
									options : {
										content : content
									}
								})
							}
						})
		//关闭当前
		$('#mm-tabclose').click(function() {
			var currtab_title = $('#tabsMenu').data("currtab");
			$('#tabs').tabs('close', currtab_title);
		})
		//全部关闭
		$('#mm-tabcloseall').click(function() {
			$('.tabs-inner span').each(function(i, n) {
				var t = $(n).html();
				if (t != '首页') {
					$('#tabs').tabs('close', t);
				}
			});
		});
		//关闭除当前之外的TAB
		$('#mm-tabcloseother').click(function() {
			var prevall = $('.tabs-selected').prevAll();
			var nextall = $('.tabs-selected').nextAll();
			if (prevall.length > 0) {
				prevall.each(function(i, n) {
					var t = $('a:eq(0) span', $(n)).html();
					if (t != '首页') {
						$('#tabs').tabs('close', t);
					}
				});
			}
			if (nextall.length > 0) {
				nextall.each(function(i, n) {
					var t = $('a:eq(0) span', $(n)).html();
					if (t != '首页') {
						$('#tabs').tabs('close', t);
					}
				});
			}
			return false;
		});
		//关闭当前右侧的TAB
		$('#mm-tabcloseright').click(function() {
			var nextall = $('.tabs-selected').nextAll();
			if (nextall.length == 0) {
				$.messager.alert("提示消息", "后边没有啦~~");
				return false;
			}
			nextall.each(function(i, n) {
				var t = $('a:eq(0) span', $(n)).html();
				$('#tabs').tabs('close', t);
			});
			return false;
		});
		//关闭当前左侧的TAB
		$('#mm-tabcloseleft').click(function() {
			var prevall = $('.tabs-selected').prevAll();
			if (prevall.length == 0) {
				$.messager.alert("提示消息", "到头了，前边没有啦~~");
				return false;
			}
			
			if (prevall.length == 1 && $(prevall.get(0)).html() == '首页') {
				$.messager.alert("提示消息", "到头了，前边没有啦~~");
				return false;
			}
			prevall.each(function(i, n) {
				var t = $('a:eq(0) span', $(n)).html();
				if (t != '首页') {
					$('#tabs').tabs('close', t);
				}
			});
			return false;
		});

		//退出
		$("#mm-exit").click(function() {
			$('#tabsMenu').menu('hide');
		})
	}