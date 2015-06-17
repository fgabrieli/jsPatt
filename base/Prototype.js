var Prototype = new Function();

Prototype.prototype.clone = function() {
  function clone(obj) {
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

  return clone(this);
}