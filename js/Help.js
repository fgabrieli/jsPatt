/**
 * Chain of responsibility implementation with Javascript.
 */

app.Help = {
  targets : {}, // Tree data structure

  treeRoot : {}, // tree root node

  // map with target object -> tree node object
  targetToNode : {

  },

  init : function() {
    this.tree = nc.util.Tree;

    this.treeRoot = this.tree.create({}); // Root node
  },

  addById : function(id, treeNode) {
    this.targetToNode[id] = treeNode;
  },

  getById : function(id) {
    return app.Help.targetToNode[id];
  },

  /**
   * Register a new object that has a help text.
   * 
   * All properties are mandatory
   * 
   * @property id to identify this instance
   * @property instance object (this is not a tree node)
   * @property help text
   * @property dom element
   * @property parentInstance object (this is not a tree node)
   */
  register : function(props) {
    var node = this.tree.create(props);

    var hasParent = (typeof props.parentInstance != 'undefined');
    if (hasParent) {
      var parentNode = this.getById(props.id);
      parentNode.addChild(node);
    } else {
      this.treeRoot.addChild(node);
    }

    this.addById(props.id, node);
  },

  handle : function(target) {
    var treeNode = this.getById(target);
    var data = treeNode.data;
    if (typeof data.text != 'undefined' && data.text.constructor == String && data.text.length > 0) {
      this.showHelp(data.text);
    } else {
      var isRootNode = (typeof data.instance == 'undefined');
      if (!isRootNode) {
        this.handle(data.parentInstance);
      } else {
        // go out
      }
    }
  },

  showHelp : function(text) {
    console.log('Showing help: ', text);
  }
}

{
  app.Help.init();

  var target1 = {
    id : 'target1',
    instance : {
      t : 1
    },
    text : 'help for target 1',
    domEl : $('body').get(0)
  };

  app.Help.register(target1);


  var target2 = {
    id : 'target2',
    instance : {
      t : 1
    },
    text : 'help for target 2',
    domEl : $('body').get(0)
  };

  app.Help.register(target2);

  
  app.Help.treeRoot.print();

  app.Help.handle(target1);

}