/*
 * @Author:Alberto Acuña (Beto)
 * utils v1
 * created: 19/12/16
 */

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

Element.prototype.removeAfter = function(seconds) {
	var that = this;
	setTimeout(function(){ that.parentElement.removeChild(that); }, seconds*1000);
}
NodeList.prototype.removeAfter = HTMLCollection.prototype.removeAfter = function(seconds) {
	var that = this;
	setTimeout(function(){
	    for(var i = that.length - 1; i >= 0; i--) {
	        if(that[i] && that[i].parentElement) {
	            that[i].parentElement.removeChild(that[i]);
	        }
	    }
	}, seconds*1000);
}

Element.prototype.getDisplay = function(){
  return this.style.display;
}
NodeList.prototype.getDisplay = HTMLCollection.prototype.getDisplay = function() {
  return this.style.display;
}

Element.prototype.setDisplay = function(display){
  this.style.display = display;
}
NodeList.prototype.setDisplay = HTMLCollection.prototype.setDisplay = function(display) {
  this.style.display = display;
}

Element.prototype.lockInput= function() {
	this.save = this.value;
	this.value = null;
    this.disabled='disabled';
}
NodeList.prototype.lockInput = HTMLCollection.prototype.lockInput = function() {
	this.save = this.value;
	this.value = null;
	this.disabled='disabled';
}

Element.prototype.unlockInput= function() {
	if(this.save){this.value=this.save;};
	this.removeAttribute('disabled');
}
NodeList.prototype.unlockInput = HTMLCollection.prototype.unlockInput = function() {
	if(this.save){this.value=this.save;};
    this.removeAttribute('disabled');
}

Element.prototype.lockButton= function() {
    //this.saveClass=this.className;
    this.disabled='disabled';
    this.className='disabled button';
}
NodeList.prototype.lockButton = HTMLCollection.prototype.lockButton = function() {
	//this.saveClass=this.className;
    this.disabled='disabled';
    this.className='disabled button';
}
Element.prototype.unlockButton= function() {
	//if(this.saveClass){this.className=this.saveClass;};
	this.removeAttribute('disabled');
	this.className='blue_bold';
}
NodeList.prototype.unlockButton = HTMLCollection.prototype.unlockButton = function() {
	//if(this.saveClass){this.className=this.saveClass;};
	this.removeAttribute('disabled');
	this.className='blue_bold';
}

Element.prototype.setTitle= function(title) {
	this.title=title;
}
NodeList.prototype.setTitle = HTMLCollection.prototype.setTitle = function(title) {
	this.title=title;
}
