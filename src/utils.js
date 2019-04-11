/*
 * @Author:Alberto Acuña (Beto)
 * utils v1
 * created: 19/12/16
 */



/*
 * Set foreach function to elements list
 */
NodeList.prototype.each = Array.prototype.forEach;



/*
 * Extends Class using Function
 */
Function.prototype.extends=function(ParentClass) {
    this.prototype = new ParentClass();
    this.prototype.constructor = this;
}



/*
 * Extends Class using Objects
 */
Object.prototype.extend = function(obj) {
   for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
         this[i] = obj[i];
      }
   }
};




/*
 * Array suffle as return
 */
Array.prototype.suffle = function(){
  var a = this;
  var c = a.length, t, r;
  while (0 !== c) {
    r = Math.floor(Math.random()*c);
    c -= 1;
    t = a[c];
    a[c] = a[r];
    a[r] = t;
  }
  return a;
}

/*
 * Methods for date format necesaries
 */

Date.prototype.getMonthName = function(){
    return this.toLocaleString().replace(/[^a-z]/gi,'');
}

Date.prototype.getDayName = function(){
    switch(this.getDay()){
    	case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}

String.prototype.padLeft = function(value, size) {
    var x = this;
    while (x.length < size) {x = value + x;}
    return x;
}

/*
 *
 */
String.prototype.getWidth = function (fontSize) {
    var el;
    var f = fontSize || 12;
    f += 'px arial';
    el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.float = "left";
    el.style.whiteSpace = 'nowrap';
    el.style.visibility = 'hidden';
    el.style.font = f;
    el.innerHTML = this;
    el = document.body.appendChild(el);
    w = el.offsetWidth;
    el.parentNode.removeChild(el);
    return w;
}

/*
 * Add and Remove ClassName
 */
Date.prototype.toFormattedString = function(f) {
    var nm = this.getMonthName();
    var nd = this.getDayName();
    f = f.replace(/yyyy/g, this.getFullYear());
    f = f.replace(/yy/g, String(this.getFullYear()).substr(2,2));
    f = f.replace(/MMM/g, nm.substr(0,3).toUpperCase());
    f = f.replace(/Mmm/g, nm.substr(0,3));
    f = f.replace(/MM\*/g, nm.toUpperCase());
    f = f.replace(/Mm\*/g, nm);
    f = f.replace(/mm/g, String(this.getMonth()+1).padLeft('0',2));
    f = f.replace(/DDD/g, nd.substr(0,3).toUpperCase());
    f = f.replace(/Ddd/g, nd.substr(0,3));
    f = f.replace(/DD\*/g, nd.toUpperCase());
    f = f.replace(/Dd\*/g, nd);
    f = f.replace(/dd/g, String(this.getDate()).padLeft('0',2));
    f = f.replace(/d\*/g, this.getDate());
    return f;
};

/*
 * Check if an object is empty
 */
Object.prototype.isEmpty = function() {
    for(var key in this) {if(this.hasOwnProperty(key)){return false;}}
    return true;
}

/*
 * Add ClassName
 */
Element.prototype.addClassName = function(addClasses) {
    if(this.className.length==0){this.className=addClasses;}
    else if(addClasses.length>0){
        var oldClasses = this.className.split(" ");
        var newClasses = addClasses.split(" ");
        for (var i = 0; i < newClasses.length; i++) {
            var addClass = true;
            var newClass = newClasses[i];
            for (var j = 0; j < oldClasses.length; j++) {if(newClass==oldClasses[j]){addClass=false;}}
            if(addClass){this.className+=" "+newClass;}
    	}
    }
}
NodeList.prototype.addClassName = HTMLCollection.prototype.addClassName = function(addClasses) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
	var el = li[i];
	if(el) {el.addClassName(addClasses);}
    }
}

/*
 * Remove ClassName
 */
Element.prototype.removeClassName = function(removeClasses){
    if(this.className.length>0){
        var oldClasses = this.className.split(" ");
	var delClasses = removeClasses.split(" ");
	this.className="";
	for (var i = 0; i < oldClasses.length; i++) {
            var removeClass = false;
            var oldClass = oldClasses[i];
            for (var j = 0; j < delClasses.length; j++) {if(oldClass==delClasses[j]){removeClass=true;}}
            if(!removeClass){this.addClassName(oldClass);}
        }
    }
}
NodeList.prototype.removeClassName = HTMLCollection.prototype.removeClassName = function(removeClasses) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
	var el = li[i];
	if(el) {el.removeClassName(removeClasses);}
    }
}

/*
 * Remove element or list elements
 */
Element.prototype.remove = function(seconds) {
    var el = this;
    setTimeout(function(){el.parentElement.removeChild(el);}, (seconds ? seconds : 0)*1000);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function(seconds) {
    var li = this;
    setTimeout(function(){for(var i = li.length - 1; i >= 0; i--) {
	var el = li[i];
	if(el && el.parentElement) {el.remove();}
    }}, (seconds ? seconds : 0)*1000);
}

/*
 * Clear all elements inside a element
 */
Element.prototype.removeChilds = function(seconds){
    var el = this;
    setTimeout(function(){while (el.firstChild) {el.removeChild(el.firstChild);};}, (seconds ? seconds : 0)*1000);
}
NodeList.prototype.removeChilds = HTMLCollection.prototype.removeChilds = function(seconds) {
    var li = this;
    setTimeout(function(){for(var i = li.length - 1; i >= 0; i--) {
	var el = li[i];
	if(el && el.parentElement) {el.removeChilds();}
    }}, (seconds ? seconds : 0)*1000);
}

/*
 * Modify display getter and setter
 */
Element.prototype.getDisplay = function(){
    return this.style.display;
}
NodeList.prototype.getDisplay = HTMLCollection.prototype.getDisplay = function() {
    var ret = [];
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {ret.push(el.getDisplay());}
    }
    return ret;
}
Element.prototype.setDisplay = function(display){
    this.style.display = display;
}
NodeList.prototype.setDisplay = HTMLCollection.prototype.setDisplay = function(display) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.setDisplay(display);}
    }
}


/*
 * Set value of checkbox
 */
Element.prototype.check= function( value ) {
    if(this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='CHECKBOX'){
    	this.checked = (value!=null ? value : true);
    }
}
NodeList.prototype.check = HTMLCollection.prototype.check = function( defaultValue ) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.check( defaultValue );}
    }
}


/*
 * Lock or disbale Element
 */
Element.prototype.lock= function( defaultValue ) {
    this.lock = true;
    //INPUTS TEXT
    if (this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='TEXT') {
	if (defaultValue) {
	    this.save = this.value;
            this.value = defaultValue;
	} 
        this.disabled='disabled';
    //INPUT BUTTONS OR SUBMITS
    } else if (this.tagName.toUpperCase()=='BUTTON' || 
	       this.tagName.toUpperCase()=='INPUT' && (this.type.toUpperCase()=='BUTTON' || this.type.toUpperCase()=='SUBMIT')) {
        this.disabled='disabled';
        this.addClassName('disabled');
    //INPUT CHECKBOX
    } else if (this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='CHECKBOX') {
	if (defaultValue) {
	    this.save = this.checked;
    	    this.checked = defaultValue;
	}
    	this.disabled='disabled';
    //SELECT
    } else if (this.tagName.toUpperCase()=='SELECT') {
	if (defaultValue) {
	    this.save = this.value;
	    this.value = defaultValue;
	}
        this.disabled='disabled';
    //IMAGE CLICK
    } else if (this.tagName.toUpperCase()=='IMG') {
	this.save = this.onclick;
	this.onclick = null;
    //FORM
    } else if (this.tagName.toUpeerCase()=='FORM') {
	this.find('input,select,button,img').lock();
    }
}
NodeList.prototype.lock = HTMLCollection.prototype.lock = function( defaultValue ) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.lock( defaultValue );}
    }
}
Element.prototype.unlock= function() {
    this.lock = false;
    //INPUTS TEXT
    if (this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='TEXT') {
        if (this.save) {this.value=this.save;};
        this.removeAttribute('disabled');
    //INPUT BUTTONS OR SUBMITS    
    } else if (this.tagName.toUpperCase()=='BUTTON' || 
	       this.tagName.toUpperCase()=='INPUT' && (this.type.toUpperCase()=='BUTTON' || this.type.toUpperCase()=='SUBMIT')) {
	this.removeAttribute('disabled');
	this.removeClassName('disabled');
    //INPUT CHECKBOX
    } else if (this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='CHECKBOX') {
    	if (this.save) {this.checked=this.save;};
    	this.removeAttribute('disabled');
    //SELECT
    } else if(this.tagName.toUpperCase()=='SELECT'){
	if (this.save) {this.value=this.save;};
	this.removeAttribute('disabled');
     //IMAGE CLICK
    } else if (this.tagName.toUpperCase()=='IMG') {
	if (this.save) {this.onclick=this.save;};
    //FORM
    } else if (this.tagName.toUpeerCase()=='FORM') {
	this.find('input,select,button,img').unlock();
    }
}
NodeList.prototype.unlock = HTMLCollection.prototype.unlock = function() {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.unlock();}
    }
}

/*
 * set title element or list
 */
Element.prototype.setTitle= function(title) {
    this.title=title;
}
NodeList.prototype.setTitle = HTMLCollection.prototype.setTitle = function(title) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.setTitle(title);}
    }
}

/*
 * find elements inside other one
 */
Element.prototype.find = function(queryStr){
  var selector = document.querySelectorAll(queryStr);
  return (selector.length>0 ? (selector.length>1 ? selector : selector[0] ) : null );
}

/*
 * compare two strings, case insenstive as second parameter
 */
String.prototype.equals = function(string,insensitive){
  if(insensitive){return (this.toString().toUpperCase().trim()==string.toString().toUpperCase().trim() ? true : false);}
  else{return (this.toString().trim()==string.toString().trim() ? true : false);}
}



/*
 * set automcomplete
 */
Element.prototype.setAutocomplete = function(complete){
    this.autocomplete = (complete ? "on" : "off");
}
NodeList.prototype.setAutocomplete = HTMLCollection.prototype.setAutocomplete = function(complete) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.autocomplete(complete);}
    }
}






function md5(d){return rstr2hex(binl2rstr(binl_md5(rstr2binl(d),8*d.length)))}function rstr2hex(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function rstr2binl(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function binl2rstr(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function binl_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
