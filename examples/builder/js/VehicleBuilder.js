var VehicleBuilder = Builder.extend(function() {
  // interface: sign()
});

VehicleBuilder.prototype.build = function() {
  console.log('building vehicle');

  var vehicle = {};

  this.sign(vehicle);

  if (typeof this.addDoors != 'undefined') {
    vehicle.hasDoors = true;
    this.addDoors(vehicle);
  } else {
    vehicle.hasDoors = false;
  }
  
  if (typeof this.addWheels != 'undefined') {
    vehicle.hasWheels = true;
    this.addWheels(vehicle);
  } else {
    vehicle.hasWheels = false;
  }

  var v = vehicle;
  vehicle.getSignature = function() {
    return v.signature;
  }

  return vehicle;
};

var CarBuilder = VehicleBuilder.extend(function() {
  this._parent();

  var doorFactory = new VehiclePart(new CarDoor());
  var wheelFactory = new VehiclePart(new CarWheel());
  
  var signature = 'i am a car';
  this.sign = function(vehicle) {
    vehicle.signature = signature;
  }

  this.addDoors = function(vehicle) {
    console.log('adding doors to the car');
    var door1 = doorFactory.make();
    var door2 = doorFactory.make();
    vehicle.doors = [door1, door2];
  };

  this.addWheels = function(vehicle) {
    console.log('adding wheels to the car');
    vehicle.wheels = [wheelFactory.make(), wheelFactory.make(), wheelFactory.make(), wheelFactory.make()];
  }
});

var TruckBuilder = VehicleBuilder.extend(function() {
  this._parent();

  var doorFactory = new VehiclePart(new TruckDoor());
  var wheelFactory = new VehiclePart(new TruckWheel());

  this.sign = function(vehicle) {
    vehicle.signature = 'i am a truck';
  }

  this.addDoors = function(vehicle) {
    console.log('adding doors to the truck');
    var door1 = doorFactory.make();
    var door2 = doorFactory.make();
    vehicle.doors = [door1, door2];
  };

  this.addWheels = function(vehicle) {
    console.log('adding wheels to the truck');
    vehicle.wheels = [wheelFactory.make(), wheelFactory.make(), wheelFactory.make(), wheelFactory.make()];
  }
});

var BikeBuilder = VehicleBuilder.extend(function() {
  this._parent();

  var wheelFactory = new VehiclePart(new BikeWheel());

  this.sign = function(vehicle) {
    vehicle.signature = 'i am a bike';
  }

  this.addWheels = function(vehicle) {
    console.log('adding wheels to the bike');
    vehicle.wheels = [wheelFactory.make(), wheelFactory.make()];
  }
});
