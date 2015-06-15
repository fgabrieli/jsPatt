/**
 * Example using the Factory pattern
 */

// Factories

// Vehicle Factory
var VehicleConstructor = function() {
  console.log('VehicleFactory constructor called.');
};
var VehicleFactory = Factory.extend(VehicleConstructor);

VehicleFactory.prototype.make = function(type) {
  var err = jsPatt.FactoryErr;

  var vehicle = false;

  var carFactory = new CarFactory();
  var truckFactory = new TruckFactory();

  switch (type) {
  case 'Car':
    vehicle = carFactory.make();
    break;
  case 'Truck':
    vehicle = truckFactory.make();
    break;
  }

  if (vehicle == false) {
    throw err.PRODUCT_NOT_FOUND;
  } else {
    return vehicle;
  }
}


// Car Factory
var CarConstructor = function() {
  // Car factory constructor
};
var CarFactory = VehicleFactory.extend(CarConstructor);

CarFactory.prototype.make = function() {
  console.log('Making a car...');
  return new Car();
}


// Truck factory
var TruckFactory = VehicleFactory.extend();

TruckFactory.prototype.make = function() {
  console.log('Making a truck...');
  return new Truck();
}



