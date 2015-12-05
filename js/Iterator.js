/**
 * Example of the Iterator pattern using js.
 */

app.Iterator = {
  // object to iterate
  aggregate : {},
  
  get : function(aggregate) {
    this.aggregate = aggregate;
    return this;
  },
  
  next : function() {
  },
  
  prev : function() {
  },
  
  isDone : function() {
  }
}