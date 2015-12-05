/**
 * Example of a bridge pattern.
 * 
 * Shape implementation is now decoupled from Shape. So it can be implemented different ways: with a propietary lib, a 3rd party lib, etc.
 */

/**
 * Shape implementation abstract class.
 */
app.ShapeImpl = {
  create : function(type, config) {
    var newImpl = $.extend(true, {}, app.ShapeImpl[type]);
    newImpl.init(config);

    return newImpl;
  },

  init : function(config) {
    // perform any initialization here
  },

  makeTriangle : function(params) {
  },

  makeRectangle : function(params) {
  },

  remove : function(shape) {
  },
  
  onClick : function(shape) {
    var cmd = app.ShapeCommand.create(this.id, 'hide', shape);
    cmd.execute();
  }
}

app.ShapeImpl.App = $.extend(true, {}, app.ShapeImpl, {
  id : 'App',
  
  init : function(config) {
    var containerSel = (typeof config.containerElId != 'undefined' ? '#' + config.containerElId : 'body');
    this.$containerEl = $(containerSel);
  },

  /**
   * @param x
   * @param y
   */
  makeTriangle : function(params) {
    var $triangleEl = $('<div>');
    $triangleEl.addClass('shape');
    $triangleEl.addClass('triangle');
    $triangleEl.css('position', 'absolute');
    $triangleEl.css('top', params.y);
    $triangleEl.css('left', params.x);

    this.$containerEl.append($triangleEl);

    return {
      domEl : $triangleEl
    }
  },

  /**
   * @param x
   * @param y
   */
  makeRectangle : function(params) {
    var $rectEl = $('<div>');
    $rectEl.addClass('shape');
    $rectEl.addClass('rectangle');
    $rectEl.css('position', 'absolute');
    $rectEl.css('top', params.y);
    $rectEl.css('left', params.x);

    this.$containerEl.append($rectEl);

    return {
      domEl : $rectEl
    }
  },

  remove : function(shape) {
    shape.data.domEl.remove();
  }

});

app.ShapeImpl.Two = $.extend(true, {}, app.ShapeImpl, {
  id : 'Two',
  
  // Two lib instance
  lib : {},

  // dom container element for Two lib shapes
  $containerEl : {},

  /**
   * @param config
   *         Object
   * @property mandatory containerEl: container element to draw shapes with the library
   */
  init : function(config) {
    this.$containerEl = $('#' + config.containerElId);

    this.lib = new Two({
      type : Two.Types.svg,
      width : screen.width,
      height : screen.height
    }).appendTo(this.$containerEl.get(0));
  },

  /**
   * @param x
   * @param y
   * @param radius
   * @param optional
   *         fillColor: hex color to fill with, white default
   * @return Object with shape instance and dom element for it
   */
  makeTriangle : function(params) {
    var fillColor = (typeof params.fillColor != 'undefined' ? params.fillColor : '#fff'); // white is default

    // params = (x, y, radius, 3);
    var triangle = this.lib.makePolygon(params.x, params.y, params.radius);

    triangle.fill = (typeof fillColor != 'undefined' ? fillColor : DEFAULT_FILL_COLOR);

    this.lib.update();

    return {
      implInstance : triangle,
      domEl : $('#' + triangle.id)
    }
  },

  makeRectangle : function(params) {
    var fillColor = (typeof params.fillColor != 'undefined' ? params.fillColor : '#fff'); // white is default

    // params = (x, y, radius, 3);
    var height = params.width;
    var rect = this.lib.makeRectangle(params.x, params.y, params.width, params.height);

    rect.fill = (typeof fillColor != 'undefined' ? fillColor : DEFAULT_FILL_COLOR);

    this.lib.update();

    return {
      implInstance : rect,
      domEl : $('#' + rect.id)
    }
  },

  remove : function(shape) {
    var twoInstance = shape.data.implInstance;
    twoInstance.remove();

    var lib = shape.shapeImpl.lib;
    lib.update();
  }
});