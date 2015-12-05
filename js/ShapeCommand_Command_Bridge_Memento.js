/**
 * Example of Command pattern and Bridge pattern combined.
 */

app.ShapeCommand = {
  receiver : {},

  create : function(impl, type, receiver) {
    var newCommand = $.extend(true, {}, app.ShapeCommandImpl[impl][type]);
    newCommand.receiver = receiver;

    return newCommand;
  },

  /**
   * @param command
   *         specific params, depend on the implementation of child classes.
   * @param boolean
   *         true if the command has to be added to the command history to allow undo/redo.
   */
  execute : function(params, save) {
    var doSave = (typeof save == 'undefined' ? true : save);
    if (doSave) {
      // Memento pattern, save internal state so we can undo the command later.
      app.ShapeCommandHistory.add(this, params);
    }
  },

  unexecute : function(params) {
  }
}

/**
 * Shape command implementation (Bridge pattern between ShapeCommand and ShapeCommandImpl.
 */
app.ShapeCommandImpl = {};

app.ShapeCommandImpl.Two = {};

app.ShapeCommandImpl.Two.hide = $.extend(true, {}, app.ShapeCommand, {
  restore : {
    stroke : '',
    fill : ''
  },

  execute : function() {
  },

  unexecute : function() {
  }
});

app.ShapeCommandImpl.App = {};

app.ShapeCommandImpl.App.hide = $.extend(true, {}, app.ShapeCommand, {
  execute : function(params, save) {
    app.ShapeCommand.execute.call(this, params, save);

    var shape = this.receiver;
    var $domEl = shape.data.domEl;
    $domEl.hide();
  },

  unexecute : function() {
    var shape = this.receiver;
    var $domEl = shape.data.domEl;
    $domEl.show();
  }
});

