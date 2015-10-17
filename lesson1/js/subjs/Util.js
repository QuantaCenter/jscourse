var Util = {
	addEvent:function (el, type, fn, useCapture) { //useCapture为true时阻止事件冒泡
		if(el.addEventListener){	//DOM2.0
			el.addEventListener(type, fn, useCapture);
			return true;
		}else if(el.attachEvent){	//IE5+
			var r = el.attachEvent('on'+type, fn);
			return r;
		}else{
			el['on'+type] = fn;	//DOM 0
		}
	}
}
