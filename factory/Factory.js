// Constants
jsPatt.FactoryErr = {
  PRODUCT_NOT_FOUND : 'Product was not found.',
}

// Factory "abstract" class
var Factory = new Function();

Factory.prototype.make = function() {
  // return new instance of proper product
}