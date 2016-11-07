var RollImage=function(imgdata,outer,hover,fnload,prev,next,background)
{if(!RollImage.init)
{RollImage.init=(function()
{var F=function(imgdata,outer,hover,fnLoad,prev,next,background)
{if(arguments.callee.length<3)
{return null;}
this.images=imgdata||[];this.outer=outer;this.hover=hover;this.fnPreload=function()
{var o=arguments[0],hover=arguments[1],index=arguments[2];o._hovers[o._index].removeClass("cur");hover.addClass("cur");}
this.fnLoad=fnLoad||function(){};this._index=0;this._loaded={};this._hovers={};this._timer=null;this._isauto=0;this._isstop=0;this.prev=prev;this.next=next;this.isFirstLoad=true;this.background=background;}
F.prototype.loadImage=function(index)
{if(this.background&&this.background.length>0&&this.background[index])
{var bg=this.background[index];if(bg)
{if(bg.indexOf('.')>=0)
{this.outer.parent().css({"background-image":"url('"+"http://img.letao.com"+ bg+"')","background-color":"transparent"});}
else
{this.outer.parent().css({"background-color":bg,"background-image":"none"});}}
else
{this.outer.parent().css({"background-color":"transparent","background-image":"none"});}}
if(this._loaded.hasOwnProperty(index)&&this._loaded.index!="preload")
{if(typeof this._loaded[index]!="undefined"&&this._loaded[index].length!=0&&typeof this._loaded[index].fadeIn!="undefined")
{return;}}
else
{var _this=this;var imgobj=this.outer.find("div").eq(index);this._loaded[index]="preload";var img=new Image();img.src="http://img.letao.com"+ this.images[index];this.stoproll();if(img.complete)
{if(this.background&&this.background.length>0&&this.background[index])
{var bg=this.background[index];if(bg)
{if(bg.indexOf('.')>=0)
{this.outer.parent().css({"background-image":"url('"+"http://img.letao.com"+ bg+"')","background-color":"transparent"});}
else
{this.outer.parent().css({"background-color":bg,"background-image":"none"});}}
else
{this.outer.parent().css({"background-color":"transparent","background-image":"none"});}}
if(this._isauto&&this._isstop)
{this.autoroll();}
imgobj.attr("img_index",index).css("background-image","url("+ img.src+")")
this._loaded[index]=imgobj;if(this._index==index)
{this.fnLoad(this);}}
else
{img.onload=function()
{if(this.background&&this.background.length>0&&this.background[index])
{var bg=this.background[index];if(bg)
{if(bg.indexOf('.')>=0)
{this.outer.parent().css({"background-image":"url('"+"http://img.letao.com"+ bg+"')","background-color":"transparent"});}
else
{this.outer.parent().css({"background-color":bg,"background-image":"none"});}}
else
{this.outer.parent().css({"background-color":"transparent","background-image":"none"});}}
if(_this._isauto&&_this._isstop)
{_this.autoroll();}
imgobj.attr("img_index",index).css("background-image","url("+ img.src+")")
_this._loaded[index]=imgobj;if(_this._index==index)
{_this.fnLoad(_this);}}}}}
F.prototype.initFirstImage=function(func)
{var images=this.outer.find("div[img_index]");if(this.background&&this.background.length>0&&this.background[0])
{var bg=this.background[0];if(bg)
{if(bg.indexOf('.')>=0)
{this.outer.parent().css({"background-image":"url('"+"http://img.letao.com"+ bg+"')","background-color":"transparent"});}
else
{this.outer.parent().css({"background-color":bg,"background-image":"none"});}}
else
{this.outer.parent().css({"background-color":"transparent","background-image":"none"});}}
if(images.length==1)
{this._loaded["0"]=images;}
if(typeof func=="function")
{func();}
else
{this.hover.first().addClass("cur");var FirstImgElem=this.outer.find("div:first");var FirstImg=FirstImgElem.attr("lazyload");if(!FirstImg)
FirstImg="http://img.letao.com"+ this.images[0];FirstImgElem.css("background-image","url("+ FirstImg+")").removeAttr("lazyload");}}
F.prototype.roll=function(index)
{var _this=this;_this.fnPreload&&_this.fnPreload(_this,_this._hovers[index],index);var _height=_this.outer.parent().height();_this.outer.find("div").hide();_this.outer.find("div:eq("+ index+")").stop(true,true).fadeIn(1000);_this._index=index;_this.loadImage(index);}
F.prototype.autoroll=function()
{var _this=this;if(_this._timer!=null)
return false;_this._timer=setInterval(function()
{if(!_this._isstop)
{_this.stoproll();return false;}
var index=_this._index+ 1;if(index>=_this.hover.length)
index=0;_this.roll(index);},7000);};F.prototype.stoproll=function()
{var _this=this;if(_this._timer==null)
return false;window.clearInterval(_this._timer);_this._timer=null;};F.prototype.run=function(isauto)
{var _this=this;_this._isauto=isauto||_this._auto;this.hover.each(function(i)
{var index=i;var hovertimer=null;_this._hovers[index]=$(this);$(this).hover(function()
{if(_this._index!=index)
{hovertimer=setTimeout(function()
{_this.roll(index);},200);}},function()
{window.clearTimeout(hovertimer);hovertimer=null;});});if(isauto)
{this.outer.parent().hover(function()
{_this._isstop=0;_this.stoproll();},function()
{_this._isstop=1;_this.autoroll();});_this._isstop=1;_this.autoroll();}
if(this.prev)
{this.prev.click(function()
{_this._isstop=0;_this.stoproll();var hovertimer=setTimeout(function()
{var index=_this._index- 1;if(index<0)
index=(_this.hover.length- 1);_this.roll(index);window.clearTimeout(hovertimer);},200);_this._isstop=1;_this.autoroll();});}
if(this.next)
{this.next.click(function()
{_this._isstop=0;_this.stoproll();var hovertimer=setTimeout(function()
{var index=_this._index+ 1;if(index>=_this.hover.length)
index=0;_this.roll(index);_this._isstop=1;_this.autoroll();window.clearTimeout(hovertimer);},200);});}
if(this.isFirstLoad)
{this.isFirstLoad=false;this.initFirstImage();}}
return F;})();}
return new RollImage.init(imgdata,outer,hover,fnload,prev,next,background);}