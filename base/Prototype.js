var Prototype = new Function();

Prototype.prototype.clone = function() {
  function clone(obj) {
    if (obj === null || typeof (obj) !== 'object') {
      return obj;
    } else {
      // this one is a key: we create the same type of object
      var temp = new obj.constructor();

      for ( var key in obj) {
        // recursion
        temp[key] = clone(obj[key]);
      }

      return temp;
    }
  }

  return clone(this);
}