// Vehicle
var Vehicle = new Function();
Vehicle.prototype.getSignature = function() {
  return this.signature;
}

// Car
var Car = Vehicle.extend(function() {
  this.signature = '[signature: this object is a car]';

  console.log('Car constructor called.');
});

// Truck
var Truck = Vehicle.extend(function() {
  this.signature = '[signature: this object is a truck]';

  console.log('Truck constructor called.');
});
