// Namespace
var jsPatt = {};

// Extend the Function object

jsPatt.FunctionErr = {}

Function.prototype.extend = function(constructorFn) {
  var constructor = (typeof constructorFn == 'function' ? constructorFn : new Function());

  constructor.prototype = Object.create(this.prototype);

  constructor.prototype._parent = this;

  return constructor;
}
