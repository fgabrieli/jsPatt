/**
 * Example using the Factory pattern
 */

// Factories
// Vehicle Factory
var VehicleFactoryConstructor = function() {
  console.log('VehicleFactory constructor called.');
  
  this.carFactory = new CarFactory();
  this.truckFactory = new TruckFactory();

};
var VehicleFactory = Factory.extend(VehicleFactoryConstructor);

VehicleFactory.prototype.make = function(type) {
  var err = jsPatt.FactoryErr;

  var vehicle = false;

  switch (type) {
  case 'Car':
    vehicle = this.carFactory.make();
    break;
  case 'Truck':
    vehicle = this.truckFactory.make();
    break;
  }

  if (vehicle == false) {
    throw err.PRODUCT_NOT_FOUND;
  } else {
    return vehicle;
  }
}

// Car Factory
var CarFactoryConstructor = function() {
  console.log('CarFactory constructor called.');
};
var CarFactory = VehicleFactory.extend(CarFactoryConstructor);

CarFactory.prototype.make = function() {
  console.log('Making a car...');
  return new Car();
}

// Truck factory
var TruckFactory = VehicleFactory.extend(function() {
  console.log('TruckFactory constructor called.');
});

TruckFactory.prototype.make = function() {
  console.log('Making a truck...');
  return new Truck();
}
