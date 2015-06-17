var Prototype = new Function();

Prototype.prototype._clone = function() {
  function clone(obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

    var temp = new obj.constructor(); // changed

    for ( var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = clone(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

  var obj = this;
  return clone(obj);
}