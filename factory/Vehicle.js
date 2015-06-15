// Vehicle abstract class
var Vehicle = new Function();
Vehicle.prototype.getSignature = function() {
  return this.signature;
}

// Car
var CarConstructor = function() {
  this.signature = '[signature: this object is a car]';

  console.log('Car constructor called.');
};
var Car = Vehicle.extend(CarConstructor);

// Truck
var TruckConstructor = function() {
  this.signature = '[signature: this object is a truck]';

  console.log('Truck constructor called.');
};
var Truck = Vehicle.extend(TruckConstructor);
