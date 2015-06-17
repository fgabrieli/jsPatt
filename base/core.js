// Namespace

var jsPatt = {};

// Extend the Function object

Function.prototype.extend = function(constructorFn) {
  var newClass = (typeof constructorFn == 'function' ? constructorFn : new Function());

  newClass.prototype = Object.create(this.prototype);

  newClass.prototype._parent = this;

  return newClass;
}

// Extend the Object object

Object.prototype.clone = function(obj) {
  if (obj === null || typeof (obj) !== 'object') {
    return obj;
  } else {
    var temp = new obj.constructor();

    for ( var key in obj) {
      temp[key] = clone(obj[key]);
    }

    return temp;
  }
}