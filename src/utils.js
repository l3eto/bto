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
 * Add and Remove ClassName
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
 * Lock or unlock checkbox
 */
Element.prototype.lockCheckBox= function( defaultValue ) {
    if(this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='CHECKBOX'){
    	this.save = this.checked;
    	this.checked = (defaultValue!=null ? defaultValue : null);
    	this.disabled='disabled';
    }
}
NodeList.prototype.lockCheckBox = HTMLCollection.prototype.lockCheckBox = function( defaultValue ) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.lockCheckBox( defaultValue );}
    }
}
Element.prototype.unlockCheckBox= function() {
    if(this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='CHECKBOX'){
    	if(this.save){this.checked=this.save;};
    	this.removeAttribute('disabled');
    }
}
NodeList.prototype.unlockCheckBox = HTMLCollection.prototype.unlockCheckBox = function() {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.unlockInput();}
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
 * Lock or unlock input
 */
Element.prototype.lockInput= function( defaultValue ) {
    if(this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='TEXT'){
        this.save = this.value;
        this.value = (defaultValue ? defaultValue : null);
        this.disabled='disabled';
    }
}
NodeList.prototype.lockInput = HTMLCollection.prototype.lockInput = function( defaultValue ) {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.lockInput( defaultValue );}
    }
}
Element.prototype.unlockInput= function() {
    if(this.tagName.toUpperCase()=='INPUT' && this.type.toUpperCase()=='TEXT'){
        if(this.save){this.value=this.save;};
        this.removeAttribute('disabled');
    }
}
NodeList.prototype.unlockInput = HTMLCollection.prototype.unlockInput = function() {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.unlockInput();}
    }
}

/*
 * Lock or unlock button
 */
Element.prototype.lockButton= function() {
    if(this.tagName=='BUTTON' || (this.tagName.toUpperCase()=='INPUT' && (this.type.toUpperCase()=='BUTTON' ||(this.type.toUpperCase()=='SUBMIT' ))){
        this.classSave=this.className;
        this.disabled='disabled';
        this.addClassName('disabled');
    }
}
NodeList.prototype.lockButton = HTMLCollection.prototype.lockButton = function() {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.lockButton();}
    }
}
Element.prototype.unlockButton= function() {
    if(this.tagName=='BUTTON' || (this.tagName.toUpperCase()=='INPUT' && (this.type.toUpperCase()=='BUTTON' ||(this.type.toUpperCase()=='SUBMIT' ))){
	this.removeAttribute('disabled');
	this.removeClassName('disabled');
	if(this.classSave){this.className=this.classSave;};
    }
}
NodeList.prototype.unlockButton = HTMLCollection.prototype.unlockButton = function() {
    var li = this;
    for(var i = li.length - 1; i >= 0; i--) {
        var el = li[i];
	if(el) {el.unlockButton();}
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







