// Vehicle abstract
var Vehicle = Prototype.extend(function() {
});

Vehicle.prototype.getSignature = function() {
  return this.signature;
}

// Car concrete
var CarConstructor = function() {
  this.signature = '[Car]';

  console.log('Car constructor called.');
};
var Car = Vehicle.extend(CarConstructor);

// Truck concrete
var TruckConstructor = function() {
  this.signature = '[Truck]';

  console.log('Truck constructor called.');
};
var Truck = Vehicle.extend(TruckConstructor);

// Bike concrete
var BikeConstructor = function() {
  this.signature = '[Bike]';

  console.log('Bike constructor called.');
};
var Bike = Vehicle.extend(BikeConstructor);
