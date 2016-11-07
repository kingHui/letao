$(function(){
	$("#send_id").hover(
		function(){
			$(this).css("color","#E22421");
			$("#send_id").find("img").css("background","#E22421");
			$("#send_province").css("display","block");
		},
		function(){
			$(this).on();
			$(this).css("color","");
			$("#send_province").css("display","none");
                    
			
			      
			      
		}
	);
	
	//AJAX 数据加载
	$.ajax({
		url:"json/letao_send.json",
		type:"GET",
		dataType:"json",
		success:function(data){
			var html = "";
			for(var i = 0;i < data.length; i++){
			    html += "<li id = "+(i+1)+"><a href = '#'>"+data[i].province+"</a></li>";			    
			}
		$("#province_list").html(html);
		}
	}
	);

	$("#celltion").hover (
		function(){
			$(this).css("color","#E22421")
		},
		function(){
			$(this).css("color","")
		}
	);
	$("#look").hover (
		function(){
			$(this).css("color","#E22421")
			$("#QR_code").css("display","block")
		},
		function(){
			$(this).css("color","")
			$("#QR_code").css("display","none")
		}
	);
	$("#myletao").hover(
		function(){			
			$("#my_letao").css("display","block")
			$(this).css("color","red")
			$(this).css("background","#FFFFFF")						
		},
		function(){			
			$("#my_letao").css("display","none")
			$(this).css("color","#000000")
		}
	)
	$("#my_letao").find("a").hover(
		function(){
			$(this).css("color","red")
		},
		function(){
			$(this).css("color","#000000")
		}
	);
	$("#information").hover(
		function(){			
			$("#information_list").css("display","block")
			$(this).css("color","red")
			
		},
		function(){			
			$("#information_list").css("display","none")
			$(this).css("color","#000000")
		}
	)
	$("#information_list").find("a").hover(
		function(){
			$(this).css("color","red")
		},
		function(){
			$(this).css("color","#000000")
		}
	);
	$("#all").siblings().hover(
		function(){
			$(this).css("background","#66D9EF")
		},
		function(){
			$(this).css("background","#024693")
		}
	);
	$("#left_banner_top").hover(
		function(){
			$("#nextGirlNav").css("display","block")
		},
		function(){
			$("#nextGirlNav").css("display","none")
		}
	);
	//轮播图
	$("#center_banner").find("#pic_num").find("li").click(function(){
		$("li").attr("class","");
		$(this).attr("class","active");
		$("#center_banner").find("#roll_pic").animate({"left":-810*($(this).index())},0)
		var timer = null;
		var Now = 0;
		timer = setInterval(function(){
			
		},2000)
	});
	//购物车
	//注册页面js
	$("#account_name").blur(
		function(){
			var str = $(this).val();			
			var phone = /^1(3|4|5|7|8)\d{9}$/;
		    var Email = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
			if(str.length >= 3 && str.length <= 25){
				if(phone.test(str)){
					$("#name_hint").html("✔");
					$("#name_hint").css("color","green")				
				}else if(Email.test(str)){
					$("#name_hint").html("✔");
					$("#name_hint").css("color","green")				
				}else{
					
					$("#name_hint").html("✘请正确输入你的手机号或邮箱");
					$("#name_hint").css("color","red")					
				}
			}else{
				$("#name_hint").html("✘用户名的长度应在6-32位之间");
				$("#name_hint").css("color","red");
			}
	});
	$("#password").blur(
		function(){
			var str1 = $(this).val();
			var word = /^[0-9_a-zA-Z]{3,25}$/;
			if(word.test(str1)){
				$("#password_hint").html("✔");
				$("#password_hint").css("color","green")
			}else{
				$("#password_hint").html("✘密码的长度应在3-25位之间");
				$("#password_hint").css("color","red")				
			}
	});
	$("#confirm_password").blur(
		function(){
			var str2 = $(this).val();
			var str3 = str2
			if(!(str2.length == 0)){
				if(str2 === str3){
					$("#affirm_hint").html("✔");
					$("#affirm_hint").css("color","green")
				}else{
					$("#affirm_hint").html("✘两次输入的密码不一致");
					$("#affirm_hint").css("color","red")				
				}
			}else{
				$("#affirm_hint").html("✘请您再次输入密码");
				$("#affirm_hint").css("color","red")		
		}
	});
	  
	$.ajax({
		url:"json/girlShoes.json",
		type:"GET",
		success:function(data){
			//var html = "";
			var girlnav = "";
			var grilnavtitle = "";
			grilnavtitle = "<p id = 'grilNavTitle'>"+data[0].title_main+"</p>";
			for(var i = 0;i<data[0].main_child.length;i++){
				girlnav += "<li id ='"+data[0].main_child.id+"'>"+data[0].main_child[i].shoes+"</li>";
			};
			grilnavbrand = "<p id = 'grilNavbrand'>"+data[0].child[0].title_brand+"</p>";
			for(var i = 0;i<data[0].child.length;i++){
				for(var i = 0;i<data[0].child[0].brand_name.length;i++);
			};
			html = grilnavtitle + girlnav
			$("#girlNav").html(html);
		}
	});
});
