/**
 * Implementation of a Tree using Javascript.
 * 
 * @author Fernando Gabrieli
 */

nc.util.TreeNode = {
  parent : null,

  children : [],

  data : {},
  
  create : function(data) {
    var newNode = $.extend(true, {}, this);
    newNode.data = data;

    return newNode;
  },

  hasParent : function() {
    return (this.parent != null);
  },
  
  addChild : function(node) {
    node.parent = this;

    this.children.push(node);

    return node;
  },
  
  remove : function(node) {
    var pos = this.getPos(node);
    
    this.children.splice(pos, 1);
  },
  
  getPos : function(node) {
    for (var i = 0; i < this.children.length; i++) {
      if (node == this.children[i]) {
        break;
      }
    }
    
    return i;
  },
  
  getNodeByData : function(root, data) {
    var foundNode = false;
    this.traverse(root, function(node) {
      if (node.data == data) {
        foundNode = node;
        return false;
      }
    });
    
    return foundNode;
  },
  
  traverse : function(node, callback) {
    if (typeof node == 'undefined') {
      console.error('You must provide a root node to start traversal.');
    }
    
    // Recursive function to do the traverse
    function trav(node) {
      callback(node);

      for (var i = 0; i < node.children.length; i++) {
        trav(node.children[i]);
      }
      
      // If it doesn't have childs then it will go out
    }

    // Execute inner function to traverse the tree from root node
    trav(node);
  },
  
  print : function() {
    var i = 0;
    this.traverse(this, function(node) {
      if (node.hasParent()) {
        console.log(i++, 'parent=', node.parent.data, 'child=', node.data);
      } else {
        console.log(i++, 'root node=', node.data);
      }
    });
  }
}

nc.util.Tree = nc.util.TreeNode; // for semantic purposes
