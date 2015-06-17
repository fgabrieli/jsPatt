/**
 * Prototype pattern
*/

var VehiclePrototypeFactory = Factory.extend(function(objPrototype) {
  if (typeof objPrototype != 'undefined') {
    this.objPrototype = new objPrototype();
  }
});

VehiclePrototypeFactory.prototype.make = function() {
  // clone prototype
  return this.objPrototype.clone();
}