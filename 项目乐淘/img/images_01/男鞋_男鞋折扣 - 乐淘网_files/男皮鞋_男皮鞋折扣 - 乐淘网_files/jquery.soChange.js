;(function($){$.fn.extend({"soChange":function(o){o=$.extend({thumbObj:null,botPrev:null,botNext:null,changeType:'fade',thumbNowClass:'now',thumbOverEvent:true,slideTime:0,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300},o||{});var _self=$(this);var thumbObj;var size=_self.size();var nowIndex=0;var index;var startRun;var delayRun;function fadeAB(){if(nowIndex!=index){if(o.thumbObj){$(o.thumbObj).removeClass(o.thumbNowClass).eq(index).addClass(o.thumbNowClass);}
if(o.slideTime<=0){_self.eq(nowIndex).hide();_self.eq(index).show();}else if(o.changeType=='fade'){_self.eq(nowIndex).fadeOut(o.slideTime);_self.eq(index).fadeIn(o.slideTime);}else{_self.eq(nowIndex).slideUp(o.slideTime);_self.eq(index).slideDown(o.slideTime);}
nowIndex=index;if(o.autoChange){clearInterval(startRun);startRun=setInterval(runNext,o.changeTime);}}}
function runNext(){index=(nowIndex+ 1)%size;fadeAB();}
_self.hide().eq(0).show();if(o.thumbObj){thumbObj=$(o.thumbObj);thumbObj.removeClass(o.thumbNowClass).eq(0).addClass(o.thumbNowClass);thumbObj.click(function(){index=thumbObj.index($(this));fadeAB();if(o.clickFalse){return false;}});if(o.thumbOverEvent){thumbObj.hover(function(){index=thumbObj.index($(this));delayRun=setTimeout(fadeAB,o.delayTime);},function(){clearTimeout(delayRun);});}}
if(o.botNext){$(o.botNext).click(function(){if(_self.queue().length<1){runNext();}
return false;});}
if(o.botPrev){$(o.botPrev).click(function(){if(_self.queue().length<1){index=(nowIndex+ size- 1)%size;fadeAB();}
return false;});}
if(o.autoChange){startRun=setInterval(runNext,o.changeTime);if(o.overStop){_self.hover(function(){clearInterval(startRun);},function(){startRun=setInterval(runNext,o.changeTime);});}}}})})(jQuery);