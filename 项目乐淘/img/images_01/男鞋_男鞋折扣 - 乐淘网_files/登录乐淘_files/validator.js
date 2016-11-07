var EVENTGROUP={Group:[],Add:function(ev){for(i=0;i<this.Group.length;i++){if(this.Group[i]==ev)
return false;}
this.Group.push(ev);},Run:function(){while(this.Group.length>0){this.Group[0]();this.Group.shift();}},Clear:function(){this.Group=[];}};(function(){var Letao=window.Letao||{};Letao.Validator=(function(){function _TestRegExp(re,text){var regex=new RegExp(re);return regex.test(text);}
return{IsUpperCase:function(text){var re=/^[A-Z]+$/g;return _TestRegExp(re,text);},IsLowerCase:function(text){var re=/^[a-z]+$/g;return _TestRegExp(re,text);},IsEmail:function(text,limitWebSite){if(typeof(limitWebSite)!="undefined"&&limitWebSite.constructor==String){var re=new RegExp("^([\\w\\.\\-]+)@"+ limitsite+"$","g");return _TestRegExp(re,text);}
else{var re=/^([\w\.\-]+)@((([A-Za-z0-9\-]+)\.)+)[A-Za-z]{2,3}$/g;return _TestRegExp(re,text);}},IsPhone:function(text){var re=/^1(\d{10})$/g;return _TestRegExp(re,text);},IsPassword:function(text){return(text.length<3||text.length>32)?false:true;}}})();Letao.RegLogPublic=function(){var IsUserName=null;var IsPassword=null;var CheckStatus={Status:"ERROR",Message:"This is a ERROR message, please check your code first"}
var SubmitStatus={};function _checkLimitLength($$length){if(typeof($$length)=="number")$$length=[0,parseInt($$length)];if($$length.constructor!=Array||$$length.length<2)return false;for(var i=0;i<2;i++){if(typeof($$length[i])!="number")return false;}
return $$length;}
function _checkPasswordMatch($$obj,$$originalPwdObj){if($$originalPwdObj.value==""||$$obj.value==""){CheckStatus.Status="ERROR";CheckStatus.Message="请您再次输入密码";return CheckStatus;}
if($$obj.value!=$$originalPwdObj.value){CheckStatus.Status="ERROR";CheckStatus.Message="两次输入的密码不一致";return CheckStatus;}
CheckStatus.Status="SUCCESS";CheckStatus.Message="";return CheckStatus;}
return{CheckUserName:function(obj,$nameLength){$nameLength=$nameLength||[6,32];obj["onblur"]=obj["$$check"]=function(){IsUserName=IsUserName||function($$text,$$nameLength){$$nameLength=_checkLimitLength($$nameLength);if(!$$nameLength){CheckStatus.Status="ERROR";CheckStatus.Message="错误的参数类型:[nameLength]";return CheckStatus;}
if($$text.length<$$nameLength[0]||$$text.length>$$nameLength[1]){CheckStatus.Status="ERROR";CheckStatus.Message="用户名的长度应在"+ $$nameLength[0]+"-"+ $$nameLength[1]+"位之间";return CheckStatus;}
if(!Letao.Validator.IsEmail($$text)&&!Letao.Validator.IsPhone($$text)){CheckStatus.Status="ERROR";CheckStatus.Message="用户名的格式应为手机号码或E-Mail";return CheckStatus;}
CheckStatus.Status="SUCCESS";CheckStatus.Message="";return CheckStatus;}
var checkResult=IsUserName(obj.value,$nameLength);SubmitStatus["UserName"]=checkResult.Status;ShowMessage.call(this,checkResult.Status,checkResult.Message);}},CheckUserNameXHR:function(obj,$nameLength){var _this=this;$nameLength=$nameLength||16;obj["onchange"]=function(){SubmitStatus["UserName"]="UNKNOWN";};obj["onblur"]=obj["$$check"]=function(){IsUserName=IsUserName||function($$text,$$nameLength){$$nameLength=_checkLimitLength($$nameLength);if(!$$nameLength){CheckStatus.Status="ERROR";CheckStatus.Message="错误的参数类型:[nameLength]";return CheckStatus;}
if($$text.length<$$nameLength[0]||$$text.length>$$nameLength[1]){CheckStatus.Status="ERROR";CheckStatus.Message="用户名的长度应在"+ $$nameLength[0]+"-"+ $$nameLength[1]+"位之间";return CheckStatus;}
if(!Letao.Validator.IsEmail($$text)&&!Letao.Validator.IsPhone($$text)){CheckStatus.Status="ERROR";CheckStatus.Message="请正确输入你的手机号或邮箱";return CheckStatus;}
CheckStatus.Status="SUCCESS";CheckStatus.Message="";return CheckStatus;}
var checkResult=IsUserName(obj.value,$nameLength);if(checkResult.Status=="ERROR"){ShowMessage.call(obj,checkResult.Status,checkResult.Message);return;}
if(typeof(SubmitStatus["UserName"])=="undefined"||SubmitStatus["UserName"]=="UNKNOWN"){$.LT_AJAX("V2_check_auth_exist",obj.value,__callbackCheckUserExist,"user_auth");checkResult.Status=SubmitStatus["UserName"]="XHR";checkResult.Message="正在检测用户名, 请稍后...";ShowMessage.call(obj,checkResult.Status,checkResult.Message);}
else{EVENTGROUP.Clear();}
function __callbackCheckUserExist(al_return){if(typeof(al_return)=="undefined"||al_return.constructor!=Array||al_return.length!=2){CheckStatus.Status="ERROR";CheckStatus.Message="服务器繁忙，请稍后重试";}
CheckStatus.Status=al_return[0];CheckStatus.Message=al_return[1];ShowMessage.call(obj,CheckStatus.Status,CheckStatus.Message);if(CheckStatus.Status=="SUCCESS"){SubmitStatus["UserName"]="SUCCESS";EVENTGROUP.Run();}
else{SubmitStatus["UserName"]=CheckStatus.Status;EVENTGROUP.Clear();}}}},CheckPassword:function(obj,$passwordLength,$matchPwdObj){$passwordLength=$passwordLength||[3,32];obj["onblur"]=obj["$$check"]=function(){IsPassword=IsPassword||function($$text,$$passwordLength){$$passwordLength=_checkLimitLength($$passwordLength);if(!$$passwordLength){CheckStatus.Status="ERROR";CheckStatus.Message="错误的参数类型:[nameLength]";return CheckStatus;}
if($$text.length<$$passwordLength[0]||$$text.length>$$passwordLength[1]){CheckStatus.Status="ERROR";CheckStatus.Message="密码的长度应在"+ $$passwordLength[0]+"-"+ $$passwordLength[1]+"位之间";return CheckStatus;}
CheckStatus.Status="SUCCESS";CheckStatus.Message="";return CheckStatus;}
var checkResult=IsPassword(obj.value,$passwordLength);ShowMessage.call(this,checkResult.Status,checkResult.Message);if(typeof($matchPwdObj)!="undefined"&&$matchPwdObj.nodeType!=3){var checkResult=_checkPasswordMatch($matchPwdObj,obj);ShowMessage.call($matchPwdObj,checkResult.Status,checkResult.Message);}
SubmitStatus["Password"]=checkResult.Status;}},CheckPasswordMatching:function(obj,originalPwdObj){obj["onblur"]=obj["$$check"]=function(){var checkResult=_checkPasswordMatch(obj,originalPwdObj);ShowMessage.call(this,checkResult.Status,checkResult.Message);SubmitStatus["RePassword"]=checkResult.Status;}},GetSubmitStatus:function(){for(i in SubmitStatus){if(SubmitStatus[i]!="SUCCESS")
return false;}
return true;}}};Letao.Register=(function(){return new Letao.RegLogPublic();})();Letao.Register.isSubmit=false;Letao.Login=(function(){return new Letao.RegLogPublic();})();Letao.Login.isSubmit=false;Letao.Register.UserRegister=function(username,password)
{if(Letao.Register.isSubmit){return false;}
else{Letao.Register.isSubmit=true;}
$.LT_AJAX("auth_add_new_user",[username,password],_callbackUserLogin,"user_auth")
function _callbackUserLogin(al_return){var checkResult={};if(typeof(al_return)=="undefined"||al_return.constructor!=Array||al_return.length!=2){checkResult.Status="ERROR";checkResult.Message="服务器繁忙，请稍后重试";}
if(al_return[0]=="SUCCESS"){if($("#btn_reg_dialog").length>0){window.location.reload();}
else{if($("#requestUrl").val()!=undefined&&$("#requestUrl").val()!=""){window.location.href=$("#requestUrl").val();}
else{window.location.href="/";}}}
else{$("#txtPwd").val("").focus();$("#txtRePwd").val("");Letao.Register.isSubmit=false;alert(al_return[0]);}}}
Letao.Login.UserLogin=function(username,password){if(Letao.Login.isSubmit){return false;}
else{Letao.Login.isSubmit=true;}
$.LT_AJAX("auth_set_session",[username,password],_callbackUserLogin,"user_auth")
function _callbackUserLogin(al_return){var checkResult={};if(typeof(al_return)=="undefined"||al_return.constructor!=Array||al_return.length!=2){checkResult.Status="ERROR";checkResult.Message="服务器繁忙，请稍后重试";}
checkResult.Status=al_return[0];checkResult.Message=al_return[1];if(al_return[0]=="SUCCESS")
{if($("#btn_login_dialog").length>0){window.location.reload();}
else{if($("#requestUrl").val()!=undefined&&$("#requestUrl").val()!=""){window.location.href=$("#requestUrl").val();}
else{window.location.href="/";}}}
else{$("#txtPwd").val("").focus();Letao.Login.isSubmit=false;alert("用户名或密码错误，请重新输入。");}}}
function ShowMessage(status,message){var inputObj=$(this);if(status=="ERROR"){if(inputObj.next("span").length==0){inputObj.after("<span class=\"regInfo regInfo_error\">"+ message+"</span>");}
else{inputObj.next("span").removeClass("regInfo_right").removeClass("regInfo_loadding").addClass("regInfo_error").text(message);}
return;}
if(status=="SUCCESS"){if(inputObj.next("span").length==0){inputObj.after("<span class=\"info regInfo_right\"></span>");}
else{inputObj.next("span").removeClass("regInfo_error").removeClass("regInfo_loadding").addClass("regInfo_right").text(message);}}
if(status=="XHR"){if(inputObj.next("span").length==0){inputObj.after("<span class=\"regInfo_loadding\">"+ message+"</span>");}
else{inputObj.next("span").removeClass("regInfo_error").removeClass("regInfo_right").addClass("regInfo_loadding").text(message);}}}
window["Letao"]=Letao;})();(function(g)
{g.EmailMatch=function(inputObject)
{if(typeof g.EmailMatch.Init=="undefined")
{var F=function(inputObject)
{this._inputObject=inputObject;this._focusObject=null;this._focusData=null;this._mouseBind=false;this._keyBind=false;this._emailList=[];this._timer=null;this.dom={outer:{obj:null,label:"dl",css:{"position":"absolute","border":"1px solid #ccc","border-top":"0","background-color":"#fff"}},inner:{label:"dd",css:{"line-height":"20px","height":"20px","padding":"0 6px","background-color":"#fff","color":"#999","position":"relative","overflow":"hidden","cursor":"default"},focus:{"background-color":"#e8f4fc","color":"#000"},blur:{"background-color":"#fff","color":"#999"}},title:{label:"dt",css:{},text:"请选择手机或邮箱"}};var input="";this.getInput=function()
{return input;};this.setInput=function(txt)
{input=txt;};this._callBack=null;$.extend(this.dom.title.css,this.dom.inner.css);};F.prototype._focus=function(item)
{this._focusObject=item.css(this.dom.inner.focus);this._focusData=item.html();return this;};F.prototype._blur=function(item)
{if(!item)
{return this;}
item.css(this.dom.inner.blur);return this;};F.prototype.flag="@";F.prototype.setEmailList=function(data)
{if($.isArray(data))
{this._emailList=data;}
return this;};F.prototype.setInputData=function()
{if(this._focusData!=null)
{this._inputObject.val(this._focusData).focus();this.setInput(this._focusData);this.hideOuter();this.callBack();}};F.prototype.clear=function()
{this._focusObject=null;this._focusData=null;};F.prototype.makeItem=function(txt,_item)
{var inner=this.dom.inner,label=inner.label,css=inner.css,flag=this.flag,_html=null,obj=$("<"+ label+">").css(css);if(typeof _item=="undefined"||_item.length==0)
{_html=txt;}
else
{var index=txt.indexOf(flag);if(index<0)
{_html=txt+ flag+ _item;}
else
{var _name=txt.substring(0,index),_addr=txt.substring(index+ 1,txt.length);if(_item.indexOf(_addr)>=0&&_item!=_addr)
{_html=_name+ flag+ _item;}}}
if(_html!=null)
return obj.attr({title:_html}).html(_html);return null;};F.prototype.makeOuter=function()
{var outer=this.dom.outer,o_label=outer.label,o_css=outer.css,title=this.dom.title,t_label=title.label,t_css=title.css,t_text=title.text,inputObject=this._inputObject;var _outer=$("<"+ o_label+">").css(o_css);var _title=$("<"+ t_label+">").html(t_text).css(t_css);var zindex=Math.floor(new Date().getTime()/ 1000);$("body").append(_outer.css({"z-index":zindex,"width":(inputObject.outerWidth()- 2)+"px","left":inputObject.offset().left+"px","top":(inputObject.offset().top+ inputObject.outerHeight())+"px"}).append(_title));if(_outer.length==1)
{outer.obj=_outer;}
$(window).resize(function()
{_outer.css({"left":inputObject.offset().left+"px","top":(inputObject.offset().top+ inputObject.outerHeight())+"px"});});return _outer;};F.prototype.makeList=function(txt)
{this.clear();var list=this._emailList,html=null;var _outer=this.dom.outer.obj,_title=this.dom.title.label;if(_outer==null)
{_outer=this.makeOuter();this.bindMouse();this.bindKey();}
_outer.find(_title).nextAll().remove();if(list==null||list.length==0)
{this.hideOuter();return this;}
var inputitem=this.makeItem(txt);_outer.append(inputitem);this._focus(inputitem);for(var i=0,len=list.length,itm=null;i<len;i++)
{itm=this.makeItem(txt,list[i]);if(itm==null)
continue;_outer.append(itm);}
this.showOuter();return this;};F.prototype.getFirstObject=function()
{var outer=this.dom.outer.obj,label=this.dom.inner.label;if(outer==null)
return null;return outer.find(label).first();};F.prototype.getLastObject=function()
{var outer=this.dom.outer.obj,label=this.dom.inner.label;if(outer==null)
return null;return outer.find(label).last();};F.prototype.hideOuter=function()
{var _outer=this.dom.outer.obj;if(_outer!=null&&_outer.length==1)
{_outer.hide();}};F.prototype.showOuter=function()
{var _outer=this.dom.outer.obj;if(_outer!=null&&_outer.length==1)
{_outer.show();}};F.prototype.listener=function(obj,sec,fn)
{var _this=this,timer=null,_sec=typeof sec=="number"?sec:25,_fn=typeof fn=="function"?fn:function()
{var lastInput=_this.getInput(),currentInput=_this._inputObject.val();if(lastInput!=currentInput)
{clearTimeout(_this._timer);_this.setInput(currentInput);_this._timer=null;_this._timer=setTimeout(function(){_this.makeList(currentInput);},180);}};obj.focus(function()
{timer=setInterval(_fn,_sec);}).blur(function(e)
{clearInterval(timer);timer=null;clearTimeout(_this._timer);_this._timer=null;});return this;};F.prototype.run=function(fn)
{if(this._inputObject==null)
{return this;}
this._callBack=fn;return this.listener(this._inputObject);};F.prototype.bindMouse=function()
{var outer=this.dom.outer.obj;if(outer==null||this._mouseBind)
{return;}
var _this=this,inner=this.dom.inner,title=this.dom.title,i_label=inner.label.toLowerCase(),t_label=title.label.toLowerCase(),focus=inner.focus,blur=inner.blur;outer.mouseover(function(event)
{var e=event||window.event,tar=e.target||e.srcElement,tagname=tar.tagName.toLowerCase()||tar.nodeName.toLowerCase();var $tar=$(tar);if(tagname!=i_label)
return false;if($tar==_this._focusObject)
{return false;}
else
{_this._blur(_this._focusObject);_this._focus($tar);}
return false;});outer.mouseout(function()
{_this._blur(_this._focusObject);});outer.click(function(event)
{var e=event||window.event,tar=e.target||e.srcElement;tagname=tar.tagName.toLowerCase()||tar.nodeName.toLowerCase(),$tar=$(tar);if(tagname==t_label)
{_this.hideOuter();}
else if(tagname==i_label)
{_this.setInputData();}
return false;});this._mouseBind=true;};F.prototype.bindKey=function()
{if(this._keyBind)
{return;}
var _this=this,label=this.dom.inner.label
$(document).bind("keydown",function(event)
{var e=event||window.event,keycode=e.keyCode||e.charCode;if(keycode=="40")
{if(_this._focusObject==null||_this._focusObject.length==0)
{_this._focus(_this.getFirstObject());return;}
_this._blur(_this._focusObject);var nextObject=_this._focusObject.next();if(nextObject.length==0)
{_this._focus(_this.getFirstObject());}
_this._focus(nextObject);return;}
if(keycode=="38")
{if(_this._focusObject==null||_this._focusObject.length==0)
{_this._focusBatch(_this.getLastObject());return;}
_this._blur(_this._focusObject);var prevObject=_this._focusObject.prev(label);if(prevObject.length==0)
{_this._focus(_this.getLastObject());return;}
_this._focus(prevObject);return;}
if(keycode=="13")
{if(_this._focusObject==null||_this._focusObject.length==0)
{_this.hideOuter();return;}
_this.setInputData();return;}
if(keycode=="9")
{_this.hideOuter();}
return;});this._keyBind=true;};F.prototype.callBack=function()
{if(typeof this._callBack!="function")
return this;this._callBack.call(this);};g.EmailMatch.Init=F;}
return new g.EmailMatch.Init(inputObject);};})(this);function DisplayQQLayer(){$("#DisplayLayer").css("display","block");}
function UnDisplayQQLayer(){$("#DisplayLayer").css("display","none");}
function LoginDialog()
{var DefaultOption={ID:"win_login",Title:"您尚未登录",Content:"<div id=\"_log_win\"></div>",Bottom:"",Backover:true,Move:false,CloseIcon:"/letaozu/images/letaozuUI/close.gif",Css:{display:"none",border:"1px solid #96befb",position:"absolute","background-color":"#fff",width:"565px"},TitleCss:{"height":"30px","background-color":"#f0faff","border-bottom":"0px solid #f0f0f0"},ContentCss:{"padding":"10px 20px 0px 20px"},BottomCss:{"border-top":"0px","padding":" 0 20px 0 20px","height":"80px","text-indent":"0px","background-color":"#fff"}};DefaultOption.Bottom="<div style=\"height:80px\"></div>";this.dialog=new $ModelWindow(DefaultOption);this.isInit=false;this.AttachOption={relativeTop:-100,relativeLeft:0}
this.UserName="";}
LoginDialog.prototype.Show=function(userName)
{if(typeof userName!="undifined")
this.UserName=userName;this.dialog.Show("center",this.AttachOption);this.setLoginHTML();this.dialog.Frameover();}
LoginDialog.prototype.setRegHTML=function()
{var Content="  <div class=\"tab\">"+"     <span id=\"tab_login\" class=\"tab_item\">登录</span> <span id=\"tab_reg\"  class=\"tab_item select\" > 注册</span>"+"     <span id=\"tab_transfer\" style=\" float:right;\" ><a href=\"javascript:void(0)\" title=\"登录\">登录</a></span>"+"     <div class=\"clear\"></div>"+"     </div>"+"     <div  id=\"con_reg\" style=\"padding:20px 0px 0px 20px;\">"+"                <table  width=\"500px\">"+"                    <tbody>"+"                        <tr>"+"                            <td class=\"td_left\">帐号名：</td> <td><input  class=\"reg_input\" id=\"txtUserName\"/><span class=\"regInfo\">(请输入你的手机号或Email地址)</span></td>"+"                        </tr>"+"                        <tr>"+"                            <td class=\"td_left\">密&nbsp;&nbsp;码：</td> <td><input  class=\"reg_input\" type=\"password\" id=\"txtPwd\"/><span class=\"regInfo\">(密码 3-25位 区分大小写)</span></td>"+"                        </tr>"+"                        <tr>"+"                            <td class=\"td_left\">再次输入密码：</td> <td><input  class=\"reg_input\" type=\"password\" id=\"txtRePwd\"/><span class=\"regInfo\">(密码 3-25位 区分大小写)</span></td>"+"                        </tr>"+"                        </tr>"+"                        <tr >"+"                            <td   style=\" text-align:right\"> <input type=\"checkbox\" checked=\"checked\" id=\"protocol\"/></td><td>我已阅读并同意<a href=\"/letaozu//help/help.aspx?id=574\" target=\"_blank\">《乐淘服务协议》</a><br /></td>"+"                        </tr>"+"                        <tr >"+"                            <td  class=\"td_left\"> </td><td><input type=\"button\" class=\"btnblue\"  id=\"btn_reg_dialog\" value=\"注 册\"/></td>"+"                        </tr>"+"                    </tbody>"+"                </table>"+"      </div>";$("#_log_win").html(Content);var _this=this;$("#tab_login").click(function(){_this.setLoginHTML();});$("#tab_transfer a").click(function(){_this.setLoginHTML();});Letao.Register.CheckUserNameXHR(document.getElementById("txtUserName"),[6,32]);Letao.Register.CheckPassword(document.getElementById("txtPwd"),[3,25]);Letao.Register.CheckPasswordMatching(document.getElementById("txtRePwd"),document.getElementById("txtPwd"));$("#txtRePwd").keydown(function(event){if(event.keyCode==13){document.getElementById("btn_reg_dialog")["onclick"]();}});document.getElementById("btn_reg_dialog")["onclick"]=function(){if(!$("#protocol").attr("checked")){alert("请您接受《乐淘服务协议》后，完成注册");return false;}
EVENTGROUP.Add(document.getElementById("btn_reg_dialog")["onclick"]);document.getElementById("txtUserName")["$$check"]();document.getElementById("txtPwd")["$$check"]();document.getElementById("txtRePwd")["$$check"]();var ss=Letao.Register.GetSubmitStatus();if(!ss)return false;Letao.Register.UserRegister($("#txtUserName").val(),$("#txtPwd").val());}}
LoginDialog.prototype.setLoginHTML=function()
{var Content="  <div   id=\"$register_win\"  class=\"tab\">"+"     <span id=\"tab_login\" class=\"tab_item select\">登录</span> <span id=\"tab_reg\" class=\"tab_item\"> 注册</span>"+"     <span id=\"tab_transfer\" style=\" float:right;\" ><a href=\"javascript:void(0)\" title=\"新用户注册\">新用户注册</a></span>"+"     <div class=\"clear\"></div>"+"     </div>"+"     <div  id=\"con_login\" style=\"padding:20px 0px 0px 20px;\">"+"                <table  width=\"500px\">"+"                    <tbody>"+"                        <tr>"+"                            <td class=\"td_left\">帐号名：</td> <td><input  class=\"reg_input\" id=\"txtUserName\"/><span class=\"regInfo\">(请输入你的手机号或Email地址)</span></td>"+"                        </tr>"+"                        <tr>"+"                            <td class=\"td_left\">密&nbsp;&nbsp;码：</td> <td><input  class=\"reg_input\" type=\"password\" id=\"txtPwd\"/><span class=\"regInfo\">(密码 3-25位 区分大小写)</span></td>"+"                        </tr>"+"                        <tr >"+"                            <td></td><td><a style=\"margin-left: 10px; margin-right:10px;text-decoration: underline; color:#999999;\" href=\"/letaozu/login/FindPwd.aspx\" >找回密码</a> <input type=\"button\" class=\"btnblue\"  id=\"btn_login_dialog\" value=\"登录\"/></td>"+"                        </tr>"+"                    </tbody>"+"                </table>"+"            </div>";$("#_log_win").html(Content);var _this=this;$("#tab_reg").click(function(){_this.setRegHTML();});$("#txtUserName").val(this.UserName);$("#tab_transfer a").click(function(){_this.setRegHTML();});Letao.Login.CheckUserName(document.getElementById("txtUserName"),[6,32]);Letao.Login.CheckPassword(document.getElementById("txtPwd"),[3,25]);$("#txtPwd").keydown(function(event){if(event.keyCode==13){document.getElementById("btn_login_dialog")["onclick"]();}});document.getElementById("btn_login_dialog")["onclick"]=function(){EVENTGROUP.Add(document.getElementById("btn_login_dialog")["onclick"]);document.getElementById("txtUserName")["$$check"]();document.getElementById("txtPwd")["$$check"]();var ss=Letao.Login.GetSubmitStatus();if(!ss){return false;}
Letao.Login.UserLogin($("#txtUserName").val(),$("#txtPwd").val());}}
$(function(){if($("#btn_login").length>0)
{Letao.Login.CheckUserName(document.getElementById("txtUserName"),[6,32]);Letao.Login.CheckPassword(document.getElementById("txtPwd"),[3,25]);$("#txtPwd").keydown(function(event){if(event.keyCode==13){document.getElementById("btn_login")["onclick"]();}});document.getElementById("btn_login")["onclick"]=function(){EVENTGROUP.Add(document.getElementById("btn_login")["onclick"]);document.getElementById("txtUserName")["$$check"]();document.getElementById("txtPwd")["$$check"]();var ss=Letao.Login.GetSubmitStatus();if(!ss){return false;}
Letao.Login.UserLogin($("#txtUserName").val(),$("#txtPwd").val());}}
else if($("#btn_reg").length>0)
{Letao.Register.CheckUserNameXHR(document.getElementById("txtUserName"),[6,32]);Letao.Register.CheckPassword(document.getElementById("txtPwd"),[3,25]);Letao.Register.CheckPasswordMatching(document.getElementById("txtRePwd"),document.getElementById("txtPwd"));$("#txtRePwd").keydown(function(event){if(event.keyCode==13){document.getElementById("btn_reg")["onclick"]();}});document.getElementById("btn_reg")["onclick"]=function(){if(!$("#protocol").attr("checked")){alert("请您接受《乐淘服务协议》后，完成注册");return false;}
EVENTGROUP.Add(document.getElementById("btn_reg")["onclick"]);document.getElementById("txtUserName")["$$check"]();document.getElementById("txtPwd")["$$check"]();document.getElementById("txtRePwd")["$$check"]();var ss=Letao.Register.GetSubmitStatus();if(!ss){return false;}
Letao.Register.UserRegister($("#txtUserName").val(),$("#txtPwd").val());}}
var emailList=["163.com","qq.com","126.com","sina.com","gmail.com","yahoo.com.cn","yahoo.cn","sohu.com","yeah.net","139.com","189.cn","tom.com","21cn.com","hotmail.com"];EmailMatch($("#txtUserName")).setEmailList(emailList).run(function(){$("#txtPwd").focus();});})