/**
 * Composite Pattern using Javascript.
 * 
 * Shape is an abstract class for creating and drawing shapes.
 * 
 * Shape.Triangle, Shape.Square, Shape.Rectangle and Shape.Circle are child classes that know how to draw themselves using a 3rd party
 * library called Two() - http://jonobr1.github.io/two.js/
 * 
 * Shape.Custom can aggregate shapes implementing composites.
 * 
 * Examples:
 * 
 * 1. Create a triangle:
 * 
 * var triangle = app.Shape.create('Triangle'); triangle.draw(10, 10, 50);
 * 
 * 
 * 2. Create a composite:
 * 
 * var House = app.Shape.create('Custom'); House.add([ { type : 'Triangle', params : [ 520, 530, 30 ] }, { type : 'Rectangle', params : [
 * 520, 569, 45, 45 ] } ]); House.setName('House'); House.becomeType(); // will add it to app.Shape so we can use it as a new type
 * 
 * var house = app.Shape.create('House'); house.draw();
 * 
 * Now we can even create new custom shapes that include houses.
 * 
 * @author Fernando Gabrieli
 */
app.Shape = {
  CONFIG : {
    // default config for shape implementation
    shapeImpl : {
      type : 'Two',
      config : {
        containerElId : 'shapes'
      }
    }
  },

  // shape signature, just a string that identifies the type of shape it is
  signature : '',
  
  // shape implementation instance (bridge pattern between app.Shape and app.ShapeImpl)
  shapeImpl : {},

  parent : {}, // parent class

  lib : {},

  $containerEl : {},

  // shape data object
  shape : {},

  // help reference id
  helpId : false,

  init : function(config) {
    if (typeof config != 'undefined') {
      $.extend(this.CONFIG, config);
    }

    this.shapeImpl = app.ShapeImpl.create(this.CONFIG.shapeImpl.type, this.CONFIG.shapeImpl.config);

    this.helpId = app.Help.register(false, {
      text : 'This is a shape.'
    });
  },

  create : function(type) {
    var newShape = $.extend(true, {}, this[type]);

    newShape.signature = type;
    
    newShape.shapeImpl = this.shapeImpl;

    newShape.registerHelp();

    return newShape;
  },

  render : function(params) {
    this.data = this.draw(params);
    
//    console.log('new shape instance data=', this.data);

    this.bindEvents(this.data.domEl);
  },

  registerHelp : function() {
    this.helpId = app.Help.register(app.Shape.helpId, {});
  },

  remove : function() {
    console.log('removing', this.signature);
    this.shapeImpl.remove(this);
  },

  bindEvents : function(domEl) {
    $(domEl).bind('click', {
      shape : this
    }, this.onClick);
  },

  onClick : function(e) {
    app.Help.handle(e.data.shape.helpId);
    
    var shape = e.data.shape;
    shape.shapeImpl.onClick(shape);
  }
}

app.Shape.Triangle = $.extend(true, {}, app.Shape, {
  draw : function(params) {
    return this.shapeImpl.makeTriangle(params);
  },

  registerHelp : function() {
    this.helpId = app.Help.register(app.Shape.helpId, {
      text : 'This is a Triangle.'
    });
  }
});

app.Shape.Square = $.extend(true, {}, app.Shape, {
  draw : function(params) {
    return this.shapeImpl.makeRectangle($.extend(params, {
      height : params.width // width = height for a square
    }));
  },

  registerHelp : function() {
    this.helpId = app.Help.register(app.Shape.helpId, {
      text : 'This is a Square.'
    });
  }
});

app.Shape.Rectangle = $.extend(true, {}, app.Shape, {
  draw : function(params) {
    return this.shapeImpl.makeRectangle(params);
  },

  registerHelp : function() {
    this.helpId = app.Help.register(app.Shape.helpId, {
      text : 'This is a Rectangle.'
    });
  },

  remove : function() {
    this.shapeImpl.remove(this.shape);
  }
});

app.Shape.Circle = $.extend(true, {}, app.Shape, {
  draw : function(params) {
    return this.shapeImpl.makeCircle(params);
  },

  remove : function() {
    this.shapeImpl.remove(this.shape);
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
    var newShape = app.Shape.create(type);

    this.shapes.push({
      instance : newShape,
      params : params
    });

    return this; // allows method chaining
  },

  render : function(lib) {
    for (var i = 0; i < this.shapes.length; i++) {
      var innerShape = this.shapes[i].instance;
      innerShape.render(this.shapes[i].params);
    }
  },

  remove : function() {
    for (var i = 0; i < this.shapes.length; i++) {
      var innerShape = this.shapes[i].instance;
      innerShape.remove(innerShape);
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

var house = {};
var triangle = {};
var rect1 = {};

{
  /**
   * App starts here, should be in app.js :)
   */
  
  $(document).ready(function() {
    app.Shape.init({
      shapeImpl : {
        type : 'App',
        config : {
          containerElId : 'shapes'
        }
      }
    });

    // shared flyweight
    triangle1 = app.Shape.create('Triangle');
    triangle1.render({
      x : 120,
      y : 400,
      radius : 30,
      fillColor : '#036'
    });

    // shared flyweight
    triangle2 = app.Shape.create('Triangle');
    triangle2.render({
      x : 120,
      y : 250,
      radius : 30,
      fillColor : '#036'
    });

    // shared flyweight
    triangle3 = app.Shape.create('Triangle');
    triangle3.render({
      x : 120,
      y : 520,
      radius : 30,
      fillColor : '#036'
    });

    rect = app.Shape.create('Rectangle');
    rect.render({
      x : 120,
      y : 40,
      width : 30,
      height : 30,
      fillColor : 'blue'
    });
    
    
    // testing iterator
    var iterator = app.ShapePool.Iterator.get();
    while (!iterator.isDone()) {
      console.log(iterator.next().signature);
    }
    
    
    // House is a composite of Triangle and Rectangle
//    house = app.Shape.create('Custom');
//
//    house.add('Triangle', {
//      x : 120,
//      y : 130,
//      radius : 30,
//      fillColor : 'red'
//    });
//
//    house.add('Rectangle', {
//      x : 120,
//      y : 169,
//      width : 45,
//      height : 45,
//      fillColor : '#036'
//    });
//
//    house.setName('House').becomeType();
//
//    app.Shape.create('House').render();
  });
}