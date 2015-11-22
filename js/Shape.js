/**
 * Composite Pattern using Javascript.
 * 
 * Shape is an abstract class for creating and drawing shapes.
 * 
 * Shape.Triangle, Shape.Square, Shape.Rectangle and Shape.Circle are child classes that know how to draw themselves using a 3rd party library called Two() - http://jonobr1.github.io/two.js/
 * 
 * Shape.Custom can aggregate shapes implementing composites.
 *
 * Examples
 * ~~~~~~~~
 * 
 * 1. Create a triangle:
 * 
 * var triangle = app.Shape.create('Triangle');
 * triangle.draw(10, 10, 50);
 * 
 * 
 * 2. Create a composite:
 *
 * var House = app.Shape.create('Custom');
 * House.add([ {
 *   type : 'Triangle',
 *   params : [ 520, 530, 30 ]
 * }, {
 *   type : 'Rectangle',
 *   params : [ 520, 569, 45, 45 ]
 * } ]);
 * House.setName('House');
 * House.becomeType(); // will add it to app.Shape so we can use it as a new type
 *   
 * var house = app.Shape.create('House');
 * house.draw();
 * 
 * Now we can even create new custom shapes that include houses.
 * 
 * @author Fernando Gabrieli
 */
app.Shape = {
  lib : {},

  $containerEl : {},

  // library shape object
  shape : {},

  init : function() {
    // Initialization here
    this.$containerEl = $('#shapes');

    this.lib = new Two({
      width : screen.width,
      height : screen.height
    }).appendTo(this.$containerEl.get(0));
  },

  create : function(type) {
    var newShape = $.extend(true, {}, this[type]);

    newShape.lib = this.lib;

    return newShape;
  },

  clear : function() {
    this.shape.remove();

    app.Shape.lib.update();
  }
}

app.Shape.Triangle = $.extend(true, {}, app.Shape, {
  draw : function(x, y, radius) {
    var triangle = this.lib.makePolygon(x, y, radius, 3);
    triangle.fill = '#ccc';

    this.lib.update();

    this.shape = triangle;
  }
});

app.Shape.Square = $.extend(true, {}, app.Shape, {
  draw : function(x, y, width) {
    var height = width;
    app.Shape.Rectangle.draw(x, y, width, height);
  }
});

app.Shape.Rectangle = $.extend(true, {}, app.Shape, {
  draw : function(x, y, width, height) {
    var rectangle = this.lib.makeRectangle(x, y, width, height);
    rectangle.fill = '#ccc';

    this.lib.update();

    this.shape = rectangle;
  }
});

app.Shape.Circle = $.extend(true, {}, app.Shape, {
  draw : function(lib, x, y, radius) {
    var circle = lib.makeCircle(x, y, radius);
    circle.fill = '#ccc';

    lib.update();

    this.shape = circle;
  }
});

app.Shape.Custom = $.extend(true, {}, app.Shape, { // this is the Composite
  name : '', // custom shape name

  // shapes as {type, params]
  shapes : [],

  setName : function(name) {
    this.name = name;

    return this;
  },

  add : function(type, params) {
    if (typeof type.constructor != 'String') {
      var shapesConfig = type;
      for (var i = 0; i < shapesConfig.length; i++) {
        this.shapes.push(shapesConfig[i]);
      }
    } else {
      this.shapes.push({
        type : type,
        params : params
      });
    }

    return this;
  },

  draw : function(lib) {
    for (var i = 0; i < this.shapes.length; i++) {
      var innerShape = app.Shape.create(this.shapes[i].type);
      innerShape.draw.apply(innerShape, this.shapes[i].params);
    }
  },

  becomeType : function() {
    var hasName = (typeof this.name != 'undefined' && this.name.length > 0);
    if (!hasName) {
      console.error("I can't create a type without a name, call setName(shapeName) on the new shape type.");
    } else {
      app.Shape[this.name] = this;
    }
  }
});

{
  $(document).ready(function() {
    app.Shape.init();

    // House is a composite of Triangle and Rectangle
    var house = app.Shape.create('Custom');
    house.add([ {
      type : 'Triangle',
      params : [ 120, 130, 30 ]
    }, {
      type : 'Rectangle',
      params : [ 120, 169, 45, 45 ]
    } ]).setName('House').becomeType();

    app.Shape.create('House').draw();
  });
}