
$.fn.pickarea = function(options) {
	var self=this;
	var elem_id=$(this).attr('id');
	if(options=='getdata'){
		var json={
			province:{
				code: $("#container_"+elem_id).find('.province .active').attr('value'),
				name: $("#container_"+elem_id).find('.province .active').text(),
			},
			city:{
				code: $("#container_"+elem_id).find('.city .active').attr('value'),
				name: $("#container_"+elem_id).find('.city .active').text(),
			},
			area:{
				code: $("#container_"+elem_id).find('.area .active').attr('value'),
				name: $("#container_"+elem_id).find('.area .active').text(),
			},
		}
		return json
	}
	var input=$(this).find("input");
	var pickbody="<div class='pickbody' id='container_"+elem_id+"'><ul class='province'></ul><ul class='city'></ul><ul class='area'></ul></div>";
	$("body").append(pickbody);
	var bodybox=$("#container_"+elem_id);
	var provinceul=$("#container_"+elem_id).find('.province');
	var cityul=$("#container_"+elem_id).find('.city');
	var areaul=$("#container_"+elem_id).find('.area');

	var provinceindex=-1,cityindex=-1,areaindex=-1;

	
	if($(this).attr('data')){
		var datajson=JSON.parse($(this).attr('data'));
		loadprovince(datajson.provincecode);
		if(provinceindex!=-1){
			loadcity(datajson.provincecode,datajson.citycode);
		}
		if(cityindex!=-1){
			loadarea(datajson.citycode,datajson.areacode);
		}
		if(areaindex!=-1){
			var provincename=$(provinceul).find('.active').text();
			var cityname=$(cityul).find('.active').text();
			var areaname=$(areaul).find('.active').text();
			var name=provincename+"/"+cityname+"/"+areaname;
			$(input).val(name);
		}
		
	}else{
		loadprovince();
	}
	
	function loadprovince(selfcode){
		var str='';
		for (var i = provincedata.length-1; i >= 0; i--) {
			if(selfcode==provincedata[i].code){
				var onestr="<li value="+provincedata[i].code+" class='active'>"+provincedata[i].name+"</li>";
			}else{
				var onestr="<li value="+provincedata[i].code+">"+provincedata[i].name+"</li>";
			}
			str=onestr+str;
		}
		$(provinceul).html(str);
		provinceindex=$(provinceul).find('.active').index();
		
	}
	
	$(input).click(function(){
		event.stopPropagation();
		show();
		$(bodybox).slideDown(function(){
			$(provinceul).scrollTop((provinceindex-6)*25);
			$(cityul).scrollTop((cityindex-6)*25);
			$(areaul).scrollTop((areaindex-6)*25);
		});
	})
	
	$(provinceul).find("li").click(function(){
		event.stopPropagation();
		$(provinceul).find("li").removeClass('active');
		$(this).addClass('active');
		var code=$(this).attr("value");
		loadcity(code);
		$(input).val('');
	})
	$(cityul).on('click','li',function(){
		event.stopPropagation();
		$(cityul).find("li").removeClass('active');
		$(this).addClass('active');
		var code=$(this).attr("value");
		loadarea(code);
		$(input).val('');
	})
	$(areaul).on('click','li',function(){
		event.stopPropagation();
		$(areaul).find("li").removeClass('active');
		$(this).addClass('active');
		var provincename=$(provinceul).find('.active').text();
		var cityname=$(cityul).find('.active').text();
		var areaname=$(areaul).find('.active').text();
		var name=provincename+"/"+cityname+"/"+areaname;
		$(input).val(name);
		$(bodybox).slideUp();
	})
	function loadcity(parentcode,selfcode){
		var str='';
		for (var i = citydata.length-1; i >= 0; i--) {
			if (citydata[i].parentId==parentcode) {
				if(citydata[i].code==selfcode){
					var onestr="<li value="+citydata[i].code+" class='active'>"+citydata[i].name+"</li>";
				}else{
					var onestr="<li value="+citydata[i].code+">"+citydata[i].name+"</li>";
				}
				
				str=onestr+str;
			}
		}
		$(cityul).html(str);
		$(areaul).html('');
		cityindex=$(cityul).find('.active').index();

	}
	function loadarea(parentcode,selfcode){
		var str='';
		for (var i = areadata.length-1; i >= 0; i--) {
			if (areadata[i].parentId==parentcode) {
				if(areadata[i].code==selfcode){
					var onestr="<li value="+areadata[i].code+" class='active'>"+areadata[i].name+"</li>";
					areaindex=i;
				}else{
					var onestr="<li value="+areadata[i].code+">"+areadata[i].name+"</li>";
				}
				str=onestr+str;
			}
		}
		$(areaul).html(str);
		areaindex=$(areaul).find('.active').index();
	}
	function show(){
		var height=$(self).height();
		var top = $(self).offset().top;
		var left = $(self).offset().left;
		var screenwidth=$(window).width();
		$(bodybox).css("top",top+height);
		
		if(screenwidth-left<280){
			$(bodybox).css("left",screenwidth-280);
		}else{
			$(bodybox).css("left",left);
		}
		
	}
	$(document).click(function(){
		$(bodybox).slideUp();
	})
	$(window).resize(function(){
		show()
	});
}