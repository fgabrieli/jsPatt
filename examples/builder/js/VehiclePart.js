// Factory pattern + Prototype pattern

var VehiclePart = Factory.extend(function(part) {
  this.part = part;
});

VehiclePart.prototype.make = function() {
  return this.part.clone();
}


// Vehicle parts

var CarDoor = Prototype.extend(function() {
  this.name = 'part: Car door';
});

var CarWheel = Prototype.extend(function() {
  this.name = 'part: Car wheel';
});

var TruckDoor = Prototype.extend(function() {
  this.name = 'part: Truck door';
});

var TruckWheel = Prototype.extend(function() {
  this.name = 'part: Truck wheel';
});

var BikeWheel = Prototype.extend(function() {
  this.name = 'part: Bike wheel';
});