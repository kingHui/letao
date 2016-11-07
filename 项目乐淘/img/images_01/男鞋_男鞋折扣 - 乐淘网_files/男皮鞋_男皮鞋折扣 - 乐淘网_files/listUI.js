
Letao.Page.List=(function(){var Event=Letao.Base.Event;var LetaoLock={isLock:false,Lock:function(){this.isLock=true;return;},Unlock:function(){this.isLock=false;return;}};return{ProductSort:function(sortid,sorttype,prevfunc,backfunc){sorttype=sorttype=="ASC"?0:1;Letao.Page.List.ProductList().Set({SortBy:sortid,SortType:sorttype,PageIndex:0}).Get(prevfunc,backfunc);},ProductPage:function(pageto,prevfunc,backfunc){pageto=Math.floor(pageto)||1;if(pageto<1){pageto=1;}
pageto--;Letao.Page.List.ProductList().Set({PageIndex:pageto}).Get(prevfunc,backfunc);},ProductImage:function(imageindex,prevfunc,backfunc){imageindex=Math.floor(imageindex)||0;if(typeof pageto!="number"||pageto<0){pageto=0;}
Letao.Page.List.ProductList().Set({ImageIndex:imageindex}).Get(prevfunc,backfunc,false);},ProductList:(function(){var defaultOption={Query:"",Keyword:"",SortBy:"PRICE",SortType:0,ProductCountInPage:40,PageIndex:0,ImageIndex:0}
var isLock=false;var callback=null;var opt=null;function Lock(){isLock=true;return;}
function Unlock(){isLock=false;return;}
return function(option){if(typeof option!="undefined"){opt=$.extend({},defaultOption,option);}
return{Set:function(){var arg=arguments;if(arg.length==0){return this;}
if(arg.length==1&&typeof arg[0]=="object"){for(var i in arg[0]){opt[i]=arg[0][i];}
return this;}
if(arg.length==2){opt[arg[0]]=arg[1];return this;}},Get:function(prevfunc,backfunc,isloadpageinfo){if(isLock){return false;}
Lock();if(typeof prevfunc=="function"){prevfunc();}
if(typeof isloadpageinfo!="boolean"){isloadpageinfo=true}
Letao.UI.YellowFade.Show("正在加载数据,请稍后...",Event,true,"left");function callback(resp){Unlock();if(resp[0]=="SUCCESS"){$("#prodlist").html(resp[1]);if(isloadpageinfo){$("#pageupper").html(resp[2]);$("#pagedowner").html(resp[3]);}
Letao.Business.ClickStat($("#prodlist a"));Letao.Business.ClickStat($("#pageupper a"));Letao.Business.ClickStat($("#pagedowner a"));resp=null;Letao.UI.LazyLoad.Run();}
if(typeof backfunc=="function"){backfunc();}
setTimeout(function(){Letao.UI.YellowFade.Hide("right");},600);}
$.LT_AJAX("get_product_list",[opt.Query,opt.Keyword,opt.SortBy,opt.SortType,opt.ProductCountInPage,opt.PageIndex,opt.ImageIndex],callback,"user_prodlist");}}}})(),Tab:(function(){var tabHandleID=0;var tabObjectID=-1;var tabObject=null;var tabLock=false;function Lock(){tabLock=true;}
function Unlock(){tabLock=false;}
function _ChangeTabStyle(lasttab){if(lasttab==null){this.parent("span").parent(".lttab").children("span").each(function(i){$(this).removeAttr("class");});}
else{lasttab.parent("span").removeAttr("class");}
this.parent("span").addClass("lttabchos");this.blur();}
return function(tabobjects,clickfunc){if(typeof tabobjects!="undefined"){var tabClicked=false;tabobjects.bind("click",function(e){if(tabLock){return;}
Event(e);var me=$(this);if(me.data("tabHandleID")==null){me.data("tabHandleID",tabHandleID);tabHandleID++;}
if(!tabClicked){if(me.parent("span").attr("class")!=null&&me.parent("span").attr("class")=="lttabchos"){tabObjectID=me.data("tabHandleID");}
tabClicked=true;}
if(tabObjectID!=me.data("tabHandleID")||(me.attr("multiclick")!=null&&me.attr("multiclick")=="yes")){_ChangeTabStyle.call(me,tabObject);if(typeof clickfunc!="undefined"){clickfunc.call(me);}
tabObject=me;tabObjectID=me.data("tabHandleID");}
me=null;});}
else{return{Lock:function(){tabLock=true;},Unlock:function(){tabLock=false;},GetLockStatus:function(){return tabLock;},GetTabObjectID:function(){return tabObjectID;},GetTabObject:function(){return tabObject;}}}}})(),PageTurn:(function(){var pageLock=false;return function(pageobjects,clickfunc){if(typeof pageobjects!="undefined"){pageobjects.bind("click",function(e){if(pageLock){return false;}
var me=$(this);Event().Set({pageX:$("#ltlistsort").offset().left+ 460,pageY:$("#ltlistsort").offset().top- 12});if(typeof clickfunc!="undefined"){clickfunc.call(me);}
me=null;return false;});}
else{return{Lock:function(){pageLock=true;},Unlock:function(){pageLock=false;},GetLockStatus:function(){return pageLock;}}}}})(),ImageTurn:(function(){var imageLock=false;return function(imageobjects,clickfunc){if(typeof imageobjects!="undefined"){imageobjects.bind("click",function(e){if(imageLock){return;}
var me=$(this);me.blur();Event().Set({pageX:$("#ltlistsort").offset().left+ 460,pageY:$("#ltlistsort").offset().top- 12});if(typeof clickfunc!="undefined"){clickfunc.call(me);}
me=null;});}
else{return{Lock:function(){imageLock=true;},Unlock:function(){imageLock=false;},GetLockStatus:function(){return imageLock;}}}}})(),BindAllElementEvent:function(){Letao.Page.List.Tab($("#ltlistsort span a"),function(){Letao.Page.List.Tab().Lock();var sortby=this.attr("sortby")==null?"CLICKNUM":this.attr("sortby");var sorttype=this.attr("sorttype")==null?"DESC":this.attr("sorttype");var sortchange=this.attr("sortchange")==null?"no":this.attr("sortchange");var lasttab=Letao.Page.List.Tab().GetTabObject();if(lasttab&&lasttab.data("SORTTYPE_MEMORY")!=null&&lasttab.data("tabHandleID")!=this.data("tabHandleID")){lasttab.attr("sorttype",lasttab.data("SORTTYPE_MEMORY"));}
if(sortchange=="yes"&&this.children("b").length==1){var className=sorttype=="DESC"?"sortdesc":"sortasc";this.children("b").removeAttr("class").addClass(className);className=null;}
Letao.Page.List.ProductSort(sortby,sorttype,null,function(){Letao.Page.List.Tab().Unlock();Letao.Page.List.BindAllElementEvent();});if(sortchange=="yes"){this.data("SORTTYPE_MEMORY",sorttype);var sortchangeto=sorttype=="DESC"?"ASC":"DESC";this.attr("sorttype",sortchangeto);sortchangeto=null;}
sortby=null;sorttype=null;sortchange=null;lasttab=null;});Letao.Page.List.PageTurn($("#pageupper a,#pagedowner a"),function(){Letao.Page.List.PageTurn().Lock();var pageto=this.attr("pageto")==null?0:this.attr("pageto");if(this.parent().attr("id")=="pagedowner"){$("html,body").scrollTop($("#listmain").offset().top);}
Letao.Page.List.ProductPage(pageto,null,function(){Letao.Page.List.PageTurn().Unlock();Letao.Page.List.BindAllElementEvent();});pageto=null;});},BindLeftChooseEvent:function(){var obj=$("#listpropertyleft a");obj.bind("click",function(){$(this).css("background","#efefef url(/letaozu/images/ui/aloader_gray.gif) no-repeat 90% 50%");});},BrandAutoComplete:function(){var obj=$("#searchBrandAC"),outer=obj.parent("strong").next("span"),option=outer.find("a"),arr=[],href="",text="";option.each(function(i){var opt=$(this);var _obj=opt.clone();href=$.trim(opt.attr("href"));text=$.trim(opt.text());var hash={};hash["href"]=href.toLowerCase();;hash["text"]=text.toLowerCase();;hash["obj"]=_obj;arr.push(hash);});if(obj.length==0){return;}
var timer=null,nowHref=null,matchOption=function(val){val=$.trim(val);val=val.toLowerCase();var em=outer.children("em");if(val==""){if(em.length==1){em.html("").hide();nowHref=null;}
return;}
var href="",text="",obj=null,ret=[];for(var i=0,count=arr.length;i<count;i++){obj=arr[i].obj;href=arr[i].href;text=arr[i].text;if(href.indexOf(val)==1){ret.push(obj);continue;}
if(text.indexOf(val)==0){ret.push(obj);continue;}}
if(ret.length==0){if(em.length==1){em.html("").hide();nowHref=null;}
return;}
createMatchOption(ret);},createMatchOption=function(arg){var tmp=$("<div>"),obj=null;for(var i=0,count=arg.length;i<count;i++){obj=arg[i];obj.css({"color":"#fc3398","font-weight":"700","background-color":"#fff"}).data("nowhref","0");if(i==0){obj.css("background-color","#efefef").data("nowhref","1");nowHref=obj.attr("href");}
tmp.append(obj);}
var em=outer.children("em").eq(0);if(em.length==0){outer.prepend($("<em>"));}
else{em.hide();}
var em=outer.children("em").eq(0);em.html(tmp.children()).show();outer.scrollTop(0);em.children("a").hover(function(){if($(this).data("nowhref")=="0"){$(this).css("background-color","#efefef");}},function(){if($(this).data("nowhref")=="0"){$(this).css("background-color","#fff");}});},optionsKeyboardEvent=function(position){var em=outer.children("em").eq(0);if(em.length==0){return;}
var nowObj=null;em.find("a").each(function(i){if($(this).data("nowhref")=="1"){nowObj=$(this);}});if(!nowObj){return;}
var sib=null;if(position=="up"){sib=nowObj.prev();}
else{sib=nowObj.next();}
if(sib.length==1){nowObj.css("background-color","#fff").data("nowhref","0");sib.css("background-color","#efefef").data("nowhref","1");nowHref=sib.attr("href");}};obj.keyup(function(event){var key=event.keyCode;if(key=="38"){optionsKeyboardEvent("up");}
else if(key=="40"){optionsKeyboardEvent("down");}
else if(key=="13"){if(!nowHref){Letao.Base.Event().Set({pageX:obj.offset().left-14,pageY:obj.offset().top- 8});Letao.UI.YellowFade.Show("没有找到相匹配的品牌",Event,false,"left");setTimeout(function(){Letao.UI.YellowFade.Hide("up");},1200);return false;}
window.location.href=nowHref;}
else{clearTimeout(timer);timer=setTimeout(function(){matchOption(obj.val());},300);return false;}});},BindSearchAbout:function(){var sahmax=$("#sea_abo_cont").outerHeight();var sahmin=$("#searchabout").height();if(sahmax<=sahmin){$("#aboutmore").hide();}
else
{$("#aboutmore").click(function(){var _sahcont=$("#searchabout").height();if(_sahcont==sahmin){$("#searchabout").animate({height:sahmax},400);$("#aboutmore").css("background-position","0 -17px");}
else{$("#searchabout").animate({height:sahmin},400);$("#aboutmore").css("background-position","0 0");}});}}}})();$(function(){Letao.Page.List.BindAllElementEvent();Letao.Page.List.BindLeftChooseEvent();Letao.Page.List.ImageTurn($("#imgdisplay a"),function(){Letao.Page.List.ImageTurn().Lock();$("#imgdisplay a").removeAttr("class");this.addClass("chosimg");var imageindex=this.attr("imgindex");Letao.Page.List.ProductImage(imageindex,null,function(){Letao.Page.List.ImageTurn().Unlock();});imageindex=null;});$("#viewhistory .shoe_img").hover(function(){var p=$(this).position();var shoeInfo=$(this).next(".shoe_info");shoeInfo.show().css({"left":(p.left- 208)+"px","top":(p.top)+"px"});var shoeImg=shoeInfo.children(".shoe_info_b").children("img[ldsrc]")[0];if(typeof shoeImg!="undefined"){$(shoeImg).attr("src",$(shoeImg).attr("ldsrc")).removeAttr("ldsrc");}},function(){$(this).next(".shoe_info").hide();});Letao.Page.List.BrandAutoComplete();Letao.Page.List.BindSearchAbout();});