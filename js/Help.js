/**
 * Chain of responsibility implementation with Javascript.
 */

app.Help = {
  lastId: 0,
    
  treeRoot : {}, // tree root node

  init : function() {
    this.ncTree = nc.util.Tree;

    this.treeRoot = this.ncTree.create({}); // Root node
  },

  getNewId: function() {
    return ++this.lastId;
  },
  
  getNodeById: function(id) {
    var t = app.Help;
    
    var resultNode = false;
    this.ncTree.traverse(t.treeRoot, function(node) {
      if (typeof node.data.id != 'undefined' && node.data.id == id) {
        resultNode = node;
        return false;
      }
    });
    
    return resultNode;
  },
  
  register : function(parentId, helpData) {
    helpData.id = this.getNewId();

    var newNode = this.ncTree.create(helpData);

    if (parentId) {
      var parentNode = this.getNodeById(parentId);
      parentNode.addChild(newNode);
    } else {
      this.treeRoot.addChild(newNode);
    }
    
    return helpData.id;
  },

  handle : function(id) {
    var node = this.getNodeById(id);

    var helpData = node.data;
    var hasHelp = (typeof helpData.text != 'undefined');
    if (hasHelp) {
      this.showHelp(helpData);
    } else {
      var hasParent = (typeof node.parent.data != 'undefined');
      if (hasParent) {
        this.handle(node.parent.data.id);
      } else {
        // go out
      }
    }
  },

  showHelp : function(helpData) {
    console.log('showing help', helpData);
    
    $('#help').text(helpData.text);
  }
}

{
  $(document).ready(function() {
    app.Help.init();

    var h = app.Help;

    appId = h.register(false, {
      text: 'Global help'
    });

    h.handle(appId);
    
    buttonId = h.register(appId, {
      text: 'button help'
    });

    h.handle(buttonId);
  });
}