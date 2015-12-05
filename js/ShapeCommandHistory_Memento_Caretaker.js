/**
 * Example of the Memento pattern.
 * 
 * This class is the Caretaker that implements the undo/redo for shape commands.
 */
app.ShapeCommandHistory = {
  history : [],
  
  index : -1,

  add : function(command, params) {
    this.insert({
      command : command,
      params : params
    });
  },
  
  insert : function(cmdData) {
    this.history[++this.index] = cmdData;
    
    this.history = this.history.slice(0, this.index + 1);
  },

  redo : function() {
    if (typeof this.history[this.index + 1] != 'undefined') {
     this.index++;

     var cmdData = this.history[this.index];
     var save = false;
     cmdData.command.execute(cmdData.params, save);
    }
  },

  undo : function() {
    if (this.index != -1) {
      this.history[this.index--].command.unexecute();
    }
  }
}
