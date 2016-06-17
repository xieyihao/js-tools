/**
 * author：xieyiHao
 * time:2015-11-19
 * introduction：收集实用的脚本
 * version：1.0
 */

/**
 * [addLoadEvent description]
 * @param {[type]} func [description]
 */
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'funcion'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		};
	}
}

/**
 * [insertAfter description]
 * @param  {[type]} newElement    [description]
 * @param  {[type]} targetElement [description]
 * @return {[type]}               [description]
 */
function insertAfter(newElement,targetElement){
	//javascript有提供inserBefore的方法，但是没有提供insertAfter的方法，自己实现。
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

/**
 * [getNextElement description]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
function getNextElement(node){
	//将
	if(node.nodeType == 1){
		return node;
	}
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	return null;
}

/**
 * [getHTTPObject description]
 * @return {[type]} [description]
 */
function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined"){
		XMLHttpRequest = function(){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){

			}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){

			}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){

			}
			return false;
		};
	}//if
	return new XMLHttpRequest();
}

/**
 * [addClass description]
 * @param {[type]} element [description]
 * @param {[type]} value   [classname]
 */
function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

/**
 * [styleElementSiblings 给某类元素添加类]
 * @param  {[type]} tag      [description]
 * @param  {[type]} theClass [description]
 * @return {[type]}          [description]
 */
function styleElementSiblings(tag,theClass){
	if(!document.getElementsByTagName){return false;}
	var elems = document.getElementsByTagName(tag),
	 elem;
	 for (var i = 0; i < elems.length; i++) {
	 	elem = getNextElement(elems[i].nextSibling);
	 	addClass(elem,theClass);
	 }
}

/*----------------------------扩充函数模块------------------------------*/
var Hao;
//将对象数组转换成uri的参数 name=value&name2=value2
Hao.func = {}; //功能函数命名空间

Hao.func.arrayTOUri = function(array){
    if(array.length < 1) return "";

    var item,
        result = '';
    for (item in array){
        result += item + "=" + array[item] + '&';
    }
    return result.substring(0,result.length-1)
};

Hao.func.getQueryStringArgs = function () {
    var searchString = location.search;
    var qs = (searchString.length > 0 ? searchString.substring(1) : ""),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,

    //for 循环中使用
        i,
        len = items.length;

    for(i=0 ; i<len ; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if( name.length ){
            args[name] = value;
        }
    }

    return args;
};

Hao.func.isArray = function(obj){
    return Object.prototype.toString.call(obj)  === "[object Array]";
};

//[TODO] 验证数字类型 2016-6-17 15:45:27
Hao.func.isNumber = function(obj){

};
//[TODO] 验证对象类型 2016-6-17 15:45:27
Hao.func.isObject = function(obj){

};
/*-----正则验证-----*/
Hao.regex = {}; //功能函数命名空间
//验证名字
Hao.regex.checkName = function (name){
    var myreg = /^([\u4e00-\u9fa5]+){2,15}|([a-zA-Z]+)$/;
    var flag = !!myreg.test(name);
    if(flag == false){
        return false;
    }
    return true;
};
//验证年龄
Hao.regex.checkAge = function  (age) {
    var myreg = /120|((1[0-1]|\d)?\d)/;
    var flag = !!myreg.test(age);
    if(flag == false){
        return false;
    }
    return true;
};
    //验证身份证
Hao.regex.isIdentity = function (personID){
    var myreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    var flag = !!myreg.test(personID) ;
    if(flag == false){
        return false;
    }
    return true;
};
//验证手机号
Hao.regex.isPhoneNumber = function (phone) {
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))\d{8})$/;
    //var myreg = /^(?:13d|15d|18d)d{8}$/;
    if (myreg.test(phone)){
        return true;
    }
    return false;
};
