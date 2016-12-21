/*
 * @Author:Alberto Acuña (Beto)
 * utils v1
 * created: 19/12/16
 */


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
 * Lock or unlock input
 */
Element.prototype.lockInput= function( defaultValue ) {
    if(this.tagName=='INPUT'){
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
    if(this.tagName=='INPUT'){
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
    if(this.tagName=='BUTTON'){
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
    if(this.tagName=='BUTTON'){
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
