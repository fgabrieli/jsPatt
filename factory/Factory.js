// Constants
jsPatt.FactoryErr = {
  PRODUCT_NOT_FOUND : 'Product was not found.',
}

// Factory "abstract" class
function Factory() {
  console.log('Factory constructor called.');
}

Factory.prototype.make = function() {
  // return new instance of proper product
  console.log('Factory.make() called.');
}