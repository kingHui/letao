$(function(){
	//乐淘的子页的AJAX 加载
	$.ajax({
		url:"json/letao_mainbody.json",
		type:"GET",
		dataType:"json",
		success:function(data){
			var subpage = "";
			for(var i = 0;i<data.length; i++){
				alert(data.length)
				shoespic = "<a class = 'shoePic' href = '#'><img src ="+data[i].img+"/></a>";
				shoesname = "<span class = 'shoeName'>"+data[i].title+"</span>";
				shopprice = "<span class = 'shopPrice'>"+data[i].shop_price+"</span>";
				letaoprice = "<span class = 'letaoPrice'>"+data[i].letao_price+"</span>";
				shoeexplain = "<p class = 'shoeExplain'>"+shoesname+shopprice+letaoprice+"</p>";
				subpage +="<li id = "+(i+100)+">"+shoespic+shoeexplain+"</li>"
			}
		 	$("#shoesShow").html(subpage);
		}
	}
	);
});