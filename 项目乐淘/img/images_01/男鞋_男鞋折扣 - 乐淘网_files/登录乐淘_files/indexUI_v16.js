﻿var header=Letao.Page.HeaderFooter;var PageLoad={_InitEvent:{OwnBrandEvent:function()
{$(".ownbrand li").each(function()
{var BrandInfo=$(this);var BrandLogo=BrandInfo.find("span");var BrandDesc=BrandInfo.find("i");var BrandLogoOriClass=BrandLogo.attr("class");BrandInfo.hover(function()
{BrandLogo.addClass(BrandLogoOriClass+"cur");BrandDesc.addClass("cur");},function()
{BrandLogo.attr("class",BrandLogoOriClass);BrandDesc.removeClass("cur");});})},ImgScroll:function()
{},ProductLiHover:function()
{var ProductBoxItems=$(".zt_productlist")
$.each(ProductBoxItems,function()
{var ProductBoxItem=$(this);var LiItems=ProductBoxItem.find("li");LiItems.hover(function()
{var LiItem=$(this);LiItem.addClass("hover");},function()
{var LiItem=$(this);LiItem.removeClass("hover");});});},NavScroll:function()
{$(window).scroll(function()
{if(!$(document).scrollTop())
$("#feedback").stop(true,true).fadeOut();else
$("#feedback").stop(true,true).fadeIn();});},TopSearchHover:function()
{$("#ltsearch em").hover(function()
{$(this).addClass("hover");},function(){$(this).removeClass("hover");});},Righttoolbar_containerV3:function()
{$(".toolsbody li").hover(function()
{$(this).addClass("liCur");},function()
{$(this).removeClass("liCur");});var name=".navigation";var toolbar=$(name);if(toolbar&&toolbar.length>0)
{var toolbar_height=toolbar.height();var toolbar_top=toolbar.css("top").replace("px","");var ImgScrollHeiht=$("#imgroll").height();var ContainerBoxHeight=$("#container").height();$(window).scroll(function()
{var scrollTop=$(document).scrollTop();if(scrollTop<=ImgScrollHeiht)
{toolbar.animate({top:toolbar_top+"px"},{duration:500,queue:false});var timer=setTimeout(function()
{clearTimeout(timer);var scrollTop=$(document).scrollTop();if(scrollTop<=ImgScrollHeiht)
{toolbar.fadeOut();}},500);}
else
{var offset=((toolbar_top- toolbar_height)*1.35)+ scrollTop;if(offset>=toolbar_top&&offset<ContainerBoxHeight)
{toolbar.animate({top:offset+"px"},{duration:500,queue:false}).show();}}});}},CustomAreaImgChance:function()
{var CustomAreaItems=$("div[artid] div[IsOpacityBox='true']");CustomAreaItems.each(function()
{var CustomAreaItem=$(this);var ImgItems=CustomAreaItem.find("img");CustomAreaItem.mouseover(function()
{if(CustomAreaItem.attr("IsOpacityBox")=="true")
{CustomAreaItem.removeAttr("IsOpacityBox");ImgItems.parent().css({"display":"block","position":"relative"});ImgItems.each(function()
{var ImgItem=$(this);var width=ImgItem.width();var height=ImgItem.height();ImgItem.after("<div IsOpacityItem=\"true\"  style=\"z-index:999;opacity:0;width:"+ width+"px ;height:"+ height+"px;position:absolute;left:"+ 0+"px;top:"+ 0+"px;background:none repeat scroll 0 0 #000000;display:block;cursor:pointer\"></div>");ImgItem.next("div[IsOpacityItem = 'true']").css("opacity","0");});}
var OpacityItems=CustomAreaItem.find("div[IsOpacityItem = 'true']");OpacityItems.hover(function()
{OpacityItems.css("opacity","0.3");$(this).css("opacity","0");},function()
{OpacityItems.css("opacity","0");});});});}},Init:function()
{var PageEvent=this._InitEvent;for(var o in PageEvent)
{if(typeof PageEvent[o]=="function")
{PageEvent[o]();}}}}
$(function()
{PageLoad.Init();});