// Namespace

var jsPatt = {};

// Extend the Function object

Function.prototype.extend = function(constructorFn) {
  var newClass = (typeof constructorFn == 'function' ? constructorFn : new Function());

  newClass.prototype = Object.create(this.prototype);

  newClass.prototype._parent = this;

  return newClass;
}
