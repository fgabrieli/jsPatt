/**
 * Example of Flyweight pattern.
 */

app.ShapePool = {
  shapes : {},

  create : function(type) {
    var hasType = (typeof this.shapes[type] != 'undefined');
    if (!hasType) {
      this.shapes[type] = app.Shape.create(type)
    } else {
//      console.log('returning existing flyweight');
    }

    return this.shapes[type];
  },

  remove : function(type) {
    delete this.shapes[type];
  },

  // we don't really need an iterator here but this is just for implementing the pattern
  createIterator : function() {
    return this.Iterator.get(this.shapes);
  }
}

app.ShapePool.Iterator = $.extend(true, {}, app.Iterator, {
  index : 0,
  
  // keys from shapes map
  keys : [],
  
  get : function() {
    app.Iterator.get.call(this, app.ShapePool.shapes);

    this.keys = Object.keys(this.aggregate);
    
    return this;
  },

  next : function() {
    return this.aggregate[this.keys[this.index++]];
  },
  
  prev : function() {
    return this.shapes[this.keys[--this.index]];
  },
  
  isDone : function() {
    return (this.index == this.keys.length);
  }
});