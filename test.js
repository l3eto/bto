Function.prototype.extends=function(ParentClass) {
    this.prototype = new ParentClass();
    this.prototype.constructor = this;
}

var AuditableEntity = function() {
  this.createdBy;
  this.modifiedBy;
  this.createdDate;
  this.modifiedDate;
}
