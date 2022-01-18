(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dompp"] = factory();
	else
		root["dompp"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/data-tree/index.js":
/*!*****************************************!*\
  !*** ./node_modules/data-tree/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Tree = __webpack_require__(/*! ./src/tree */ "./node_modules/data-tree/src/tree.js");
module.exports = dataTree = (function(){
  return {
    create: function(){
      return new Tree();
    }
  };
}());


/***/ }),

/***/ "./node_modules/data-tree/src/traverser.js":
/*!*************************************************!*\
  !*** ./node_modules/data-tree/src/traverser.js ***!
  \*************************************************/
/***/ ((module) => {


module.exports = (function(){

  // Flag bad practises
  'use strict';

  // ------------------------------------
  // Basic Setup
  // ------------------------------------

  /**
   * @class Traverser
   * @constructor
   * @classdesc Represents a traverser which searches/traverses the tree in BFS and DFS fashion.
   * @param tree - {@link Tree} that has to be traversed or search.
   */
  function Traverser(tree){

    if(!tree)
    throw new Error('Could not find a tree that is to be traversed');

    /**
     * Represents the {@link Tree} which has to be traversed.
     *
     * @property _tree
     * @type {object}
     * @default "null"
     */
    this._tree = tree;

  }

  // ------------------------------------
  // Methods
  // ------------------------------------

  /**
   * Searches a tree in DFS fashion. Requires a search criteria to be provided.
   *
   * @method searchDFS
   * @memberof Traverser
   * @instance
   * @param {function} criteria - MUST BE a callback function that specifies the search criteria.
   * Criteria callback here receives {@link TreeNode#_data} in parameter and MUST return boolean
   * indicating whether that data satisfies your criteria.
   * @return {object} - first {@link TreeNode} in tree that matches the given criteria.
   * @example
   * // Search DFS
   * var node = tree.traverser().searchDFS(function(data){
   *  return data.key === '#greenapple';
   * });
   */
  Traverser.prototype.searchDFS = function(criteria){

    // Hold the node when found
    var foundNode = null;

    // Find node recursively
    (function recur(node){
      if(node.matchCriteria(criteria)){
        foundNode = node;
        return foundNode;
      } else {
        node._childNodes.some(recur);
      }
    }(this._tree._rootNode));

    return foundNode;
  };

  /**
   * Searches a tree in BFS fashion. Requires a search criteria to be provided.
   *
   * @method searchBFS
   * @memberof Traverser
   * @instance
   * @param {function} criteria - MUST BE a callback function that specifies the search criteria.
   * Criteria callback here receives {@link TreeNode#_data} in parameter and MUST return boolean
   * indicating whether that data satisfies your criteria.
   * @return {object} - first {@link TreeNode} in tree that matches the given criteria.
   * @example
   * // Search BFS
   * var node = tree.traverser().searchBFS(function(data){
   *  return data.key === '#greenapple';
   * });
   */
  Traverser.prototype.searchBFS = function(criteria){

    // Hold the node when found
    var foundNode = null;

    // Find nodes recursively
    (function expand(queue){
      while(queue.length){
        var current = queue.splice(0, 1)[0];
        if(current.matchCriteria(criteria)){
          foundNode = current;
          return;
        }
        current._childNodes.forEach(function(_child){
          queue.push(_child);
        });
      }
    }([this._tree._rootNode]));


    return foundNode;

  };

  /**
   * Traverses an entire tree in DFS fashion.
   *
   * @method traverseDFS
   * @memberof Traverser
   * @instance
   * @param {function} callback - Gets triggered when @{link TreeNode} is explored. Explored node is passed as parameter to callback.
   * @example
   * // Traverse DFS
   * tree.traverser().traverseDFS(function(node){
   *  console.log(node.data);
   * });
   */
  Traverser.prototype.traverseDFS = function(callback){
    (function recur(node){
      callback(node);
      node._childNodes.forEach(recur);
    }(this._tree._rootNode));
  };

  /**
   * Traverses an entire tree in BFS fashion.
   *
   * @method traverseBFS
   * @memberof Traverser
   * @instance
   * @param {function} callback - Gets triggered when node is explored. Explored node is passed as parameter to callback.
   * @example
   * // Traverse BFS
   * tree.traverser().traverseBFS(function(node){
   *  console.log(node.data);
   * });
   */
  Traverser.prototype.traverseBFS = function(callback){
    (function expand(queue){
      while(queue.length){
        var current = queue.splice(0, 1)[0];
        callback(current);
        current._childNodes.forEach(function(_child){
          queue.push(_child);
        });
      }
    }([this._tree._rootNode]));
  };

  // ------------------------------------
  // Export
  // ------------------------------------

  return Traverser;

}());


/***/ }),

/***/ "./node_modules/data-tree/src/tree-node.js":
/*!*************************************************!*\
  !*** ./node_modules/data-tree/src/tree-node.js ***!
  \*************************************************/
/***/ ((module) => {


module.exports = (function(){

  // Flag bad practises
  'use strict';

  // ------------------------------------
  // Basic Setup
  // ------------------------------------

  /**
   * @class TreeNode
   * @classdesc Represents a node in the tree.
   * @constructor
   * @param {object} data - that is to be stored in a node
   */
  function TreeNode(data){

    /**
     * Represents the parent node
     *
     * @property _parentNode
     * @type {object}
     * @default "null"
     */
    this._parentNode = null;

    /**
     * Represents the child nodes
     *
     * @property _childNodes
     * @type {array}
     * @default "[]"
     */
    this._childNodes = [];

    /**
     * Represents the data node has
     *
     * @property _data
     * @type {object}
     * @default "null"
     */
    this._data = data;

    /**
     * Depth of the node represents level in hierarchy
     *
     * @property _depth
     * @type {number}
     * @default -1
     */
    this._depth = -1;

  }

  // ------------------------------------
  // Getters and Setters
  // ------------------------------------

  /**
   * Returns a parent node of current node
   *
   * @method parentNode
   * @memberof TreeNode
   * @instance
   * @return {TreeNode} - parent of current node
   */
  TreeNode.prototype.parentNode = function(){
    return this._parentNode;
  };

  /**
   * Returns an array of child nodes
   *
   * @method childNodes
   * @memberof TreeNode
   * @instance
   * @return {array} - array of child nodes
   */
  TreeNode.prototype.childNodes = function(){
    return this._childNodes;
  };

  /**
   * Sets or gets the data belonging to this node. Data is what user sets using `insert` and `insertTo` methods.
   *
   * @method data
   * @memberof TreeNode
   * @instance
   * @param {object | array | string | number | null} data - data which is to be stored
   * @return {object | array | string | number | null} - data belonging to this node
   */
  TreeNode.prototype.data = function(data){
    if(arguments.length > 0){
      this._data = data;
    } else {
      return this._data;
    }
  };

  /**
   * Depth of the node. Indicates the level at which node lies in a tree.
   *
   * @method depth
   * @memberof TreeNode
   * @instance
   * @return {number} - depth of node
   */
  TreeNode.prototype.depth = function(){
    return this._depth;
  };

  // ------------------------------------
  // Methods
  // ------------------------------------

  /**
   * Indicates whether this node matches the specified criteria. It triggers a callback criteria function that returns something.
   *
   * @method matchCriteria
   * @memberof TreeNode
   * @instance
   * @param {function} callback - Callback function that specifies some criteria. It receives {@link TreeNode#_data} in parameter and expects different values in different scenarios.
   * `matchCriteria` is used by following functions and expects:
   * 1. {@link Tree#searchBFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 2. {@link Tree#searchDFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 3. {@link Tree#export} - {object} in return indicating formatted data object.
   */
  TreeNode.prototype.matchCriteria = function(criteria){
    return criteria(this._data);
  };

  /**
   * get sibling nodes.
   *
   * @method siblings
   * @memberof TreeNode
   * @instance
   * @return {array} - array of instances of {@link TreeNode}
   */
  TreeNode.prototype.siblings = function(){
    var thiss = this;
    return !this._parentNode ? [] : this._parentNode._childNodes.filter(function(_child){
      return _child !== thiss;
    });
  };

  /**
   * Finds distance of node from root node
   *
   * @method distanceToRoot
   * @memberof TreeNode
   * @instance
   * @return {array} - array of instances of {@link TreeNode}
   */
  TreeNode.prototype.distanceToRoot = function(){

    // Initialize Distance and Node
    var distance = 0,
        node = this;

    // Loop Over Ancestors
    while(node.parentNode()){
      distance++;
      node = node.parentNode();
    }

    // Return
    return distance;

  };

  /**
   * Gets an array of all ancestor nodes including current node
   *
   * @method getAncestry
   * @memberof TreeNode
   * @instance
   * @return {Array} - array of ancestor nodes
   */
  TreeNode.prototype.getAncestry = function(){

    // Initialize empty array and node
    var ancestors = [this],
        node = this;

    // Loop over ancestors and add them in array
    while(node.parentNode()){
      ancestors.push(node.parentNode());
      node = node.parentNode();
    }

    // Return
    return ancestors;

  };

  /**
   * Exports the node data in format specified. It maintains herirachy by adding
   * additional "children" property to returned value of `criteria` callback.
   *
   * @method export
   * @memberof TreeNode
   * @instance
   * @param {TreeNode~criteria} criteria - Callback function that receives data in parameter
   * and MUST return a formatted data that has to be exported. A new property "children" is added to object returned
   * that maintains the heirarchy of nodes.
   * @return {object} - {@link TreeNode}.
   * @example
   *
   * var rootNode = tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * tree.insert({
   *   key: '#greenapple',
   *   value: { name: 'Green Apple', color: 'Green'}
   * });
   *
   * tree.insertToNode(rootNode,  {
   *  key: '#someanotherapple',
   *  value: { name: 'Some Apple', color: 'Some Color' }
   * });
   *
   * // Export the tree
   * var exported = rootNode.export(function(data){
   *  return { name: data.value.name };
   * });
   *
   * // Result in `exported`
   * {
   * "name": "Apple",
   * "children": [
   *   {
   *     "name": "Green Apple",
   *     "children": []
   *   },
   *   {
   *     "name": "Some Apple",
   *     "children": []
   *  }
   * ]
   *}
   *
   */
  TreeNode.prototype.export = function(criteria){

    // Check if criteria is specified
    if(!criteria || typeof criteria !== 'function')
      throw new Error('Export criteria not specified');

    // Export every node recursively
    var exportRecur = function(node){
      var exported = node.matchCriteria(criteria);
      if(!exported || typeof exported !== 'object'){
        throw new Error('Export criteria should always return an object and it cannot be null.');
      } else {
        exported.children = [];
        node._childNodes.forEach(function(_child){
          exported.children.push(exportRecur(_child));
        });

        return exported;
      }
    };

    return exportRecur(this);
  };

  // ------------------------------------
  // Export
  // ------------------------------------

  return TreeNode;

}());


/***/ }),

/***/ "./node_modules/data-tree/src/tree.js":
/*!********************************************!*\
  !*** ./node_modules/data-tree/src/tree.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TreeNode = __webpack_require__(/*! ./tree-node */ "./node_modules/data-tree/src/tree-node.js");
var Traverser = __webpack_require__(/*! ./traverser */ "./node_modules/data-tree/src/traverser.js");
module.exports = (function(){

  // Flag bad practises
  'use strict';

  // ------------------------------------
  // Basic Setup
  // ------------------------------------

  /**
   * @class Tree
   * @classdesc Represents the tree in which data nodes can be inserted
   * @constructor
   */
   function Tree(){

    /**
     * Represents the root node of the tree.
     *
     * @member
     * @type {object}
     * @default "null"
     */
    this._rootNode = null;

    /**
     * Represents the current node in question. `_currentNode` points to most recent
     * node inserted or parent node of most recent node removed.
     *
     * @member
    * @memberof Tree.
     * @type {object}
     * @default "null"
     */
    this._currentNode = null;

    /**
     * Represents the traverser which search/traverse a tree in DFS and BFS fashion.
     *
     * @member
     * @memberof Tree
     * @type {object}
     * @instance
     * @default {@link Traverser}
     */
    this._traverser = new Traverser(this);

  }

  // ------------------------------------
  // Getters and Setters
  // ------------------------------------

  /**
   * Returns a root node of the tree.
   *
   * @method rootNode
   * @memberof Tree
   * @instance
   * @return {TreeNode} - root node of the tree.
   */
  Tree.prototype.rootNode = function(){
    return this._rootNode;
  };

  /**
   * Returns a current node in a tree
   *
   * @method currentNode
   * @memberof Tree
   * @instance
   * @return {TreeNode} - current node of the tree.
   */
  Tree.prototype.currentNode = function(){
    return this._currentNode;
  };

  /**
   * Getter function that returns {@link Traverser}.
   *
   * @method traverser
   * @memberof Tree
   * @instance
   * @return {@link Traverser} for the tree.
   */
  Tree.prototype.traverser = function(){
    return this._traverser;
  };

  // ------------------------------------
  // Methods
  // ------------------------------------

  /**
   * Checks whether tree is empty.
   *
   * @method isEmpty
   * @memberof Tree
   * @instance
   * @return {boolean} whether tree is empty.
   */
  Tree.prototype.isEmpty = function(){
    return this._rootNode === null && this._currentNode === null;
  };

  /**
   * Empties the tree. Removes all nodes from tree.
   *
   * @method pruneAllNodes
   * @memberof Tree
   * @instance
   * @return {@link Tree} empty tree.
   */
  Tree.prototype.pruneAllNodes = function(){
    if(this._rootNode && this._currentNode) this.trimBranchFrom(this._rootNode);
    return this;
  };

  /**
   * Creates a {@link TreeNode} that contains the data provided and insert it in a tree.
   * New node gets inserted to the `_currentNode` which updates itself upon every insertion and deletion.
   *
   * @method insert
   * @memberof Tree
   * @instance
   * @param {object} data - data that has to be stored in tree-node.
   * @return {object} - instance of {@link TreeNode} that represents node inserted.
   * @example
   *
   * // Insert single value
   * tree.insert(183);
   *
   * // Insert array of values
   * tree.insert([34, 565, 78]);
   *
  * // Insert complex data
   * tree.insert({
   *   key: '#berries',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   */
  Tree.prototype.insert = function(data){
    var node = new TreeNode(data);
    if(this._rootNode === null && this._currentNode === null){
      node._depth = 1;
      this._rootNode = this._currentNode = node;
    } else {
      node._parentNode = this._currentNode;
      this._currentNode._childNodes.push(node);
      this._currentNode = node;
      node.depth = node._parentNode._depth + 1;
    }
    return node;
  };

  /**
   * Removes a node from tree and updates `_currentNode` to parent node of node removed.
   *
   * @method remove
   * @memberof Tree
   * @instance
   * @param {object} node - {@link TreeNode} that has to be removed.
   * @param {boolean} trim - indicates whether to remove entire branch from the specified node.
   */
  Tree.prototype.remove = function(node, trim){
    if(trim || node === this._rootNode){

      // Trim Entire branch
      this.trimBranchFrom(node);

    } else {

      // Upate children's parent to grandparent
      node._childNodes.forEach(function(_child){
        _child._parentNode = node._parentNode;
        node._parentNode._childNodes.push(_child);
      });

      // Delete itslef from parent child array
      node._parentNode._childNodes.splice(node._parentNode._childNodes.indexOf(node), 1);

      // Update Current Node
      this._currentNode = node._parentNode;

      // Clear Child Array
      node._childNodes = [];
      node._parentNode = null;
      node._data = null;

    }
  };

  /**
   * Remove an entire branch starting with specified node.
   *
   * @method trimBranchFrom
   * @memberof Tree
   * @instance
   * @param {object} node - {@link TreeNode} from which entire branch has to be removed.
   */
  Tree.prototype.trimBranchFrom = function(node){

    // Hold `this`
    var thiss = this;

    // trim brach recursively
    (function recur(node){
      node._childNodes.forEach(recur);
      node._childNodes = [];
      node._data = null;
    }(node));

    // Update Current Node
    if(node._parentNode){
      node._parentNode._childNodes.splice(node._parentNode._childNodes.indexOf(node), 1);
      thiss._currentNode = node._parentNode;
    } else {
      thiss._rootNode = thiss._currentNode = null;
    }
  };

  /**
   * Inserts node to a particular node present in the tree. Particular node here is searched
   * in the tree based on the criteria provided.
   *
   * @method insertTo
   * @memberof Tree
   * @instance
   * @param {function} criteria - Callback function that specifies the search criteria
   * for node to which new node is to be inserted. Criteria callback here receives {@link TreeNode#_data}
   * in parameter and MUST return boolean indicating whether that data satisfies your criteria.
   * @param {object} data - that has to be stored in tree-node.
   * @return {object} - instance of {@link TreeNode} that represents node inserted.
   * @example
   *
   * // Insert data
   * tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * // New Data
   * var greenApple = {
   *  key: '#greenapple',
   *  value: { name: 'Green Apple', color: 'Green' }
   * };
   *
   * // Insert data to node which has `key` = #apple
   * tree.insertTo(function(data){
   *  return data.key === '#apple'
   * }, greenApple);
   */
  Tree.prototype.insertTo = function(criteria, data){
    var node = this.traverser().searchDFS(criteria);
    return this.insertToNode(node, data);
  };

  /**
   * Inserts node to a particular node present in the tree. Particular node here is an instance of {@link TreeNode}
   *
   * @method insertToNode
   * @memberof Tree
   * @instance
   * @param {function} node -  {@link TreeNode} to which data node is to be inserted.
   * @param {object} data - that has to be stored in tree-node.
   * @return {object} - instance of {@link TreeNode} that represents node inserted.
   * @example
   *
   * // Insert data
   * var node = tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * // New Data
   * var greenApple = {
   *  key: '#greenapple',
   *  value: { name: 'Green Apple', color: 'Green' }
   * };
   *
   * // Insert data to node
   * tree.insertToNode(node, greenApple);
   */
  Tree.prototype.insertToNode = function(node, data){
    var newNode = new TreeNode(data);
    newNode._parentNode = node;
    newNode._depth = newNode._parentNode._depth + 1;
    node._childNodes.push(newNode);
    this._currentNode = newNode;
    return newNode;
  };

  /**
   * Finds a distance between two nodes
   *
   * @method distanceBetween
   * @memberof Tree
   * @instance
   * @param {@link TreeNode} fromNode -  Node from which distance is to be calculated
   * @param {@link TreeNode} toNode - Node to which distance is to be calculated
   * @return {Number} - distance(number of hops) between two nodes.
   */
  Tree.prototype.distanceBetween = function(fromNode, toNode){
    return fromNode.distanceToRoot() + toNode.distanceToRoot() - 2 *  this.findCommonParent(fromNode, toNode).distanceToRoot();
  };

  /**
   * Finds a common parent between nodes
   *
   * @method findCommonParent
   * @memberof Tree
   * @instance
   * @param {@link TreeNode} fromNode
   * @param {@link TreeNode} toNode
   * @return {@link TreeNode} - common parent
   */
  Tree.prototype.findCommonParent = function(fromNode, toNode){

    // Get ancestory of both nodes
    var fromNodeAncestors = fromNode.getAncestry();
    var toNodeAncestors = toNode.getAncestry();

    // Find Commont
    var common = null;
    fromNodeAncestors.some(function(ancestor){
      if(toNodeAncestors.indexOf(ancestor) !== -1){
        common = ancestor;
        return true;
      }
    });

    // Return Common
    return common;

  };

  /**
   * Exports the tree data in format specified. It maintains herirachy by adding
   * additional "children" property to returned value of `criteria` callback.
   *
   * @method export
   * @memberof Tree
   * @instance
   * @param {Tree~criteria} criteria - Callback function that receives data in parameter
   * and MUST return a formatted data that has to be exported. A new property "children" is added to object returned
   * that maintains the heirarchy of nodes.
   * @return {object} - {@link TreeNode}.
   * @example
   *
   * var rootNode = tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * tree.insert({
   *   key: '#greenapple',
   *   value: { name: 'Green Apple', color: 'Green'}
   * });
   *
   * tree.insertToNode(rootNode,  {
   *  key: '#someanotherapple',
   *  value: { name: 'Some Apple', color: 'Some Color' }
   * });
   *
   * // Export the tree
   * var exported = tree.export(function(data){
   *  return { name: data.value.name };
   * });
   *
   * // Result in `exported`
   * {
   * "name": "Apple",
   * "children": [
   *   {
   *     "name": "Green Apple",
   *     "children": []
   *   },
   *   {
   *     "name": "Some Apple",
   *     "children": []
   *  }
   * ]
   *}
   *
   */
  Tree.prototype.export = function(criteria){

    // Check if rootNode is not null
    if(!this._rootNode){
      return null;
    }

    return this._rootNode.export(criteria);
  };

  /**
   * Returns a new compressed tree. While compressing it considers nodes that
   * satisfies given criteria and skips the rest of the nodes, making tree compressed.
   *
   * @method compress
   * @memberof Tree
   * @instance
   * @param {Tree~criteria} criteria - Callback function that checks whether node satifies certain criteria. MUST return boolean.
   * @return {@link Tree} - A new compressed tree.
   */
  Tree.prototype.compress = function(criteria){

    // Check if criteria is specified
    if(!criteria || typeof criteria !== 'function')
      throw new Error('Compress criteria not specified');

    // Check if tree is not empty
    if(this.isEmpty()){
      return null;
    }

    // Create New Tree
    var tree = new Tree();

    // Hold `this`
    var thiss = this;

    // Recur DFS
    (function recur(node, parent){

      // Check-in
      var checkIn = thiss.rootNode() === node || node.matchCriteria(criteria);

      // Check if checked-in
      if(checkIn){
        if(tree.isEmpty()){
          parent = tree.insert(node.data());
        } else {
          parent = tree.insertToNode(parent, node.data());
        }
      } else {
        parent._data.hasCompressedNodes = true;
      }

      // For all child nodes
      node.childNodes().forEach(function(_child){
        recur(_child, parent);
      });

    }(this.rootNode(), null));

    return tree;

  };

  /**
   * Imports the JSON data into a tree using the criteria provided.
   * A property indicating the nesting of object must be specified.
   *
   * @method import
   * @memberof Tree
   * @instance
   * @param {object} data - JSON data that has be imported
   * @param {string} childProperty - Name of the property that holds the nested data.
   * @param {Tree~criteria} criteria - Callback function that receives data in parameter
   * and MUST return a formatted data that has to be imported in a tree.
   * @return {object} - {@link Tree}.
   * @example
   *
   * var data = {
   *   "trailId": "h2e67d4ea-f85f40e2ae4a06f4777864de",
   *   "initiatedAt": 1448393492488,
   *   "snapshots": {
   *      "snapshotId": "b3d132131-213c20f156339ea7bdcb6273",
   *      "capturedAt": 1448393495353,
   *      "thumbnail": "data:img",
   *      "children": [
   *       {
   *        "snapshotId": "yeb7ab27c-b36ff1b04aefafa9661243de",
   *        "capturedAt": 1448393499685,
   *        "thumbnail": "data:image/",
   *        "children": [
   *          {
   *            "snapshotId": "a00c9828f-e2be0fc4732f56471e77947a",
   *            "capturedAt": 1448393503061,
   *            "thumbnail": "data:image/png;base64",
   *            "children": []
   *          }
   *        ]
   *      }
   *     ]
   *   }
   * };
   *
   *  // Import
   *  // This will result in a tree having nodes containing `id` and `thumbnail` as data
   *  tree.import(data, 'children', function(nodeData){
   *    return {
   *      id: nodeData.snapshotId,
   *      thumbnail: nodeData.thumbnail
   *     }
   *  });
   *
   */
  Tree.prototype.import = function(data, childProperty, criteria){

    // Empty all tree
    if(this._rootNode) this.trimBranchFrom(this._rootNode);

    // Set Current Node to root node as null
    this._currentNode = this._rootNode = null;

    // Hold `this`
    var thiss = this;

    // Import recursively
    (function importRecur(node, recurData){

      // Format data from given criteria
      var _data = criteria(recurData);

      // Create Root Node
      if(!node){
        node = thiss.insert(_data);
      } else {
        node = thiss.insertToNode(node, _data);
      }

      // For Every Child
      recurData[childProperty].forEach(function(_child){
        importRecur(node, _child);
      });

    }(this._rootNode, data));

    // Set Current Node to root node
    this._currentNode = this._rootNode;

    return this;

  };

  /**
   * Callback that receives a node data in parameter and expects user to return one of following:
   * 1. {@link Traverser#searchBFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 2. {@link Traverser#searchDFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 3. {@link Tree#export} - {object} in return indicating formatted data object.
   * @callback criteria
   * @param data {object} - data of particular {@link TreeNode}
   */

   // ------------------------------------
   // Export
   // ------------------------------------

  return Tree;

}());


/***/ }),

/***/ "./index.mjs":
/*!*******************!*\
  !*** ./index.mjs ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVerdict": () => (/* binding */ getVerdict),
/* harmony export */   "evaluateDom": () => (/* binding */ evaluateDom),
/* harmony export */   "getTreeFromWitness": () => (/* binding */ getTreeFromWitness),
/* harmony export */   "serializeArray": () => (/* binding */ serializeArray),
/* harmony export */   "deserializeArray": () => (/* binding */ deserializeArray),
/* harmony export */   "AbstractFunction": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.AbstractFunction),
/* harmony export */   "Addition": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Addition),
/* harmony export */   "All": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.All),
/* harmony export */   "And": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.And),
/* harmony export */   "AndNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.AndNode),
/* harmony export */   "Argument": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.Argument),
/* harmony export */   "ArgumentValue": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.ArgumentValue),
/* harmony export */   "AtomicFunction": () => (/* reexport safe */ _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__.AtomicFunction),
/* harmony export */   "AtomicFunctionReturnValue": () => (/* reexport safe */ _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__.AtomicFunctionReturnValue),
/* harmony export */   "BackgroundColor": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BackgroundColor),
/* harmony export */   "BackgroundImage": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BackgroundImage),
/* harmony export */   "BooleanAnd": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.BooleanAnd),
/* harmony export */   "BooleanNot": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.BooleanNot),
/* harmony export */   "BooleanOr": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.BooleanOr),
/* harmony export */   "BorderColor": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderColor),
/* harmony export */   "BorderRadius": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderRadius),
/* harmony export */   "BorderStyle": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderStyle),
/* harmony export */   "BorderWidth": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderWidth),
/* harmony export */   "ClientOffsetTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ClientOffsetTop),
/* harmony export */   "ClientOffsetLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ClientOffsetLeft),
/* harmony export */   "CssPropertyFunction": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.CssPropertyFunction),
/* harmony export */   "CssRecursivePropertyFunction": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.CssRecursivePropertyFunction),
/* harmony export */   "Color": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Color),
/* harmony export */   "ComposedFunction": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.ComposedFunction),
/* harmony export */   "ComposedFunctionValue": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.ComposedFunctionValue),
/* harmony export */   "CompoundDesignator": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.CompoundDesignator),
/* harmony export */   "ConstantFunction": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.ConstantFunction),
/* harmony export */   "ConstantDesignator": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.ConstantDesignator),
/* harmony export */   "ConstantValue": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.ConstantValue),
/* harmony export */   "Current": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Current),
/* harmony export */   "CurrentNode": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.CurrentNode),
/* harmony export */   "Designator": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Designator),
/* harmony export */   "DesignatedObject": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.DesignatedObject),
/* harmony export */   "DimensionHeight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.DimensionHeight),
/* harmony export */   "DimensionWidth": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.DimensionWidth),
/* harmony export */   "Display": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Display),
/* harmony export */   "Division": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Division),
/* harmony export */   "ElementAttribute": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ElementAttribute),
/* harmony export */   "ElementAttributeValue": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ElementAttributeValue),
/* harmony export */   "Enumerate": () => (/* reexport safe */ _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__.Enumerate),
/* harmony export */   "EnumeratedValue": () => (/* reexport safe */ _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__.EnumeratedValue),
/* harmony export */   "Equals": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Equals),
/* harmony export */   "ExistentialQuantifier": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.ExistentialQuantifier),
/* harmony export */   "Exists": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Exists),
/* harmony export */   "Explainer": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.Explainer),
/* harmony export */   "Find": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Find),
/* harmony export */   "FindBySelector": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FindBySelector),
/* harmony export */   "Float": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Float),
/* harmony export */   "FontFamily": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FontFamily),
/* harmony export */   "FontSize": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FontSize),
/* harmony export */   "FontWeight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FontWeight),
/* harmony export */   "ForAll": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.ForAll),
/* harmony export */   "FunctionNamedArgument": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.FunctionNamedArgument),
/* harmony export */   "GreaterOrEqual": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.GreaterOrEqual),
/* harmony export */   "GreaterThan": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.GreaterThan),
/* harmony export */   "Height": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Height),
/* harmony export */   "Identity": () => (/* reexport safe */ _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__.Identity),
/* harmony export */   "Implies": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Implies),
/* harmony export */   "InputArgument": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.InputArgument),
/* harmony export */   "IsEqualTo": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.IsEqualTo),
/* harmony export */   "IsGreaterOrEqual": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsGreaterOrEqual),
/* harmony export */   "IsGreaterThan": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsGreaterThan),
/* harmony export */   "IsLessOrEqual": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsLessOrEqual),
/* harmony export */   "IsLessThan": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsLessThan),
/* harmony export */   "LesserThan": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.LesserThan),
/* harmony export */   "LesserOrEqual": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.LesserOrEqual),
/* harmony export */   "MarginTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginTop),
/* harmony export */   "MarginBottom": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginBottom),
/* harmony export */   "MarginLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginLeft),
/* harmony export */   "MarginRight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginRight),
/* harmony export */   "Minus": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Minus),
/* harmony export */   "Multiplication": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Multiplication),
/* harmony export */   "NamedArgument": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.NamedArgument),
/* harmony export */   "NamedArgumentValue": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.NamedArgumentValue),
/* harmony export */   "NaryConjunctiveVerdict": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.NaryConjunctiveVerdict),
/* harmony export */   "NaryDisjunctiveVerdict": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.NaryDisjunctiveVerdict),
/* harmony export */   "NaryValue": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.NaryValue),
/* harmony export */   "NthItem": () => (/* reexport safe */ _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__.NthItem),
/* harmony export */   "NodeWrapper": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.NodeWrapper),
/* harmony export */   "Not": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Not),
/* harmony export */   "Nothing": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Nothing),
/* harmony export */   "ObjectNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.ObjectNode),
/* harmony export */   "Opacity": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Opacity),
/* harmony export */   "Or": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Or),
/* harmony export */   "OrNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.OrNode),
/* harmony export */   "PageOffsetTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PageOffsetTop),
/* harmony export */   "PageOffsetLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PageOffsetLeft),
/* harmony export */   "Path": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Path),
/* harmony export */   "PathValue": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PathValue),
/* harmony export */   "PaddingTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingTop),
/* harmony export */   "PaddingBottom": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingBottom),
/* harmony export */   "PaddingRight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingRight),
/* harmony export */   "PaddingLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingLeft),
/* harmony export */   "Plus": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Plus),
/* harmony export */   "Position": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Position),
/* harmony export */   "Quantifier": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.Quantifier),
/* harmony export */   "QuantifierConjunctiveVerdict": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.QuantifierConjunctiveVerdict),
/* harmony export */   "QuantifierDisjunctiveVerdict": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.QuantifierDisjunctiveVerdict),
/* harmony export */   "QuantifierVerdict": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.QuantifierVerdict),
/* harmony export */   "Register": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Register),
/* harmony export */   "RegisterBySelector": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.RegisterBySelector),
/* harmony export */   "ReturnValue": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.ReturnValue),
/* harmony export */   "Serialization": () => (/* reexport safe */ _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization),
/* harmony export */   "Subtraction": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Subtraction),
/* harmony export */   "TestCondition": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.TestCondition),
/* harmony export */   "TestDriver": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.TestDriver),
/* harmony export */   "TestResult": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.TestResult),
/* harmony export */   "Tracer": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.Tracer),
/* harmony export */   "UniversalQuantifier": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.UniversalQuantifier),
/* harmony export */   "Unknown": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Unknown),
/* harmony export */   "UnknownNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.UnknownNode),
/* harmony export */   "Value": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.Value),
/* harmony export */   "Verdict": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.Verdict),
/* harmony export */   "Visibility": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Visibility),
/* harmony export */   "WebElementFunction": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.WebElementFunction),
/* harmony export */   "Width": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Width),
/* harmony export */   "Zindex": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Zindex)
/* harmony export */ });
/* harmony import */ var data_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-tree */ "./node_modules/data-tree/index.js");
/* harmony import */ var _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/function.mjs */ "./modules/function.mjs");
/* harmony import */ var _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/value.mjs */ "./modules/value.mjs");
/* harmony import */ var _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/booleans.mjs */ "./modules/booleans.mjs");
/* harmony import */ var _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tracer.mjs */ "./modules/tracer.mjs");
/* harmony import */ var _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/numbers.mjs */ "./modules/numbers.mjs");
/* harmony import */ var _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/enumerate.mjs */ "./modules/enumerate.mjs");
/* harmony import */ var _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/composed-function.mjs */ "./modules/composed-function.mjs");
/* harmony import */ var _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/quantifier.mjs */ "./modules/quantifier.mjs");
/* harmony import */ var _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/web-element.mjs */ "./modules/web-element.mjs");
/* harmony import */ var _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/verdict.mjs */ "./modules/verdict.mjs");
/* harmony import */ var _modules_util_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/util.mjs */ "./modules/util.mjs");
/* harmony import */ var _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/serialization.mjs */ "./modules/serialization.mjs");
/* harmony import */ var _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/syntax.mjs */ "./modules/syntax.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Imports
 */
// DataTree for tree management
 // Local imports
















/**
 * Evaluates a set of conditions on a DOM tree
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A list of {@link Function}, each corresponding to a
 * Boolean condition to evaluate on the page.
 * @return An array of data trees corresponding to the explanation for
 * each condition that evaluates to <tt>false</tt>.
 */

function evaluateDom(root, conditions = []) {
  var verdicts = [];

  for (var i = 0; i < conditions.length; i++) {
    var verdict = getVerdict(root, conditions[i]);

    if (verdict != null) {
      verdicts.push(verdict);
    }
  }

  return verdicts;
}
/**
 * Evaluates a single condition on a DOM tree. <strong>This is a stub for
 * testing purposes.</strong>
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A {@link Function} that corresponds to a
 * Boolean condition to evaluate on the page.
 * @return A data tree explaining the violation of the condition if it
 * evaluates to <tt>false</tt>, and <tt>null</tt> if the condition is fulfilled.
 */


function getVerdict(root, condition) {
  if (root === null) {
    return null;
  }

  const returnValue = condition.evaluate(root);

  if (returnValue.value === true) {
    return null;
  }

  const verdict = new _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.Verdict(returnValue, condition);
  const witness = verdict.getWitness();
  const trees = getTreeFromWitness(witness);
  return trees;
}

function getTreeFromWitness(witnesses = []) {
  const tree = data_tree__WEBPACK_IMPORTED_MODULE_0__.create();

  for (const designatedObject of witnesses) {
    const part = [];
    let subject = null;
    let elementAttribute = null;
    let lastPartType; // First form

    if ((0,_modules_util_mjs__WEBPACK_IMPORTED_MODULE_13__.isHtmlElement)(designatedObject.getObject())) {
      const elements = designatedObject.getDesignator().elements;
      subject = elements[elements.length - 2].toString() || null;
      elementAttribute = elements[elements.length - 3].toString() || null;
      lastPartType = "Path";
    } // Second form
    else {
        subject = designatedObject.getObject();
        lastPartType = "ConstantDesignator";
      } // Build the leaf's "part"


    for (const element of designatedObject.getDesignator().elements) {
      if (element.constructor.name === lastPartType) {
        break;
      }

      part.push(element.toString());
    }

    tree.insert({
      elementAttribute,
      part,
      subject
    });
  }

  return tree;
}

function serializeArray(array) {
  var res = [];
  var s = new _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization();

  for (let i = 0; i < array.length; i++) {
    res.push(s.serialize(array[i]));
  }

  return res;
}

function deserializeArray(array) {
  var res = [];
  var s = new _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization();

  for (let i = 0; i < array.length; i++) {
    res.push(s.deserialize(array[i]));
  }

  return res;
}
/**
 * Export public API
 */


 // :wrap=soft:tabSize=2:

/***/ }),

/***/ "./modules/atomic-function.mjs":
/*!*************************************!*\
  !*** ./modules/atomic-function.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtomicFunction": () => (/* binding */ AtomicFunction),
/* harmony export */   "AtomicFunctionReturnValue": () => (/* binding */ AtomicFunctionReturnValue),
/* harmony export */   "Identity": () => (/* binding */ Identity)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports


 //import { NaryConjunctiveVerdict, NaryDisjunctiveVerdict } from "./booleans.mjs"

/**
 * Function that performs a direct computation on its input arguments. This is
 * opposed to a {@link ComposedFunction} that calls other functions to produce
 * its return value.
 * @param arity The input arity of the function
 * @extends AbstractFunction
 */

class AtomicFunction extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  constructor(arity) {
    super();
    /**
     * The input arity of the function
     */

    this.arity = arity;
  }

  evaluate() {
    var values = [];

    for (var i = 0; i < arguments.length; i++) {
      values[i] = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[i]);
    }

    return this.compute(...values);
  }
  /**
   * Computes the return value of the function from its input arguments.
   * @param arguments A variable number of {@link Values}, whose number
   * must match the input arity of the function.
   * @return The resulting {@link Value}
   */


  compute() {
    if (arguments.length !== this.arity) {
      throw "Invalid number of arguments";
    }

    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i].getValue());
    }

    var o = this.getValue(...args);

    if (o instanceof _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value) {
      return o;
    }

    return new AtomicFunctionReturnValue(this, o, ...arguments);
  }

  getValue() {
    // To be overridden by descendants
    return null;
  }

  set() {
    return this;
  }

}
/**
 * Value obtained as the output produced by an atomic function call(this).
 * @extends Value
 */


class AtomicFunctionReturnValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  /**
   * Creates a new value
   * @param arguments An output value followed by the function's input arguments
   */
  constructor() {
    super();
    /**
     * The function instance this value comes from
     */

    this.referenceFunction = arguments[0];
    /**
     * The output value produced by the function
     */

    this.outputValue = arguments[1];
    /**
     * The function's input arguments
     */

    this.inputValues = [];

    for (var i = 2; i < arguments.length; i++) {
      this.inputValues.push(arguments[i]);
    }
  }

  getValue() {
    return this.outputValue;
  }

  toString() {
    return this.outputValue.toString();
  }
  /* @Override */


  query(type, d, root, factory) {
    var leaves = [];
    var n = factory.getAndNode();

    for (var i = 0; i < this.inputValues.length; i++) {
      if (this.inputValues[i] === null) {
        continue;
      }

      var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_1__.InputArgument(i));
      var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
      var sub_leaves = [];
      sub_leaves = this.inputValues[i].query(type, _function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue.instance, sub_root, factory);
      leaves.push(...sub_leaves);
      n.addChild(sub_root);
    }

    var f_root = factory.getObjectNode(d, this.referenceFunction);

    if (n.getChildren().length === 1) {
      f_root.addChild(n.getChildren()[0]);
    } else {
      f_root.addChild(n);
    }

    root.addChild(f_root);
    return leaves;
  }

}
/**
 * Function that returns its single input argument as is.
 * @extends AtomicFunction
 */


class Identity extends AtomicFunction {
  constructor() {
    super(1);
  }

  getValue() {
    return arguments[0];
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/booleans.mjs":
/*!******************************!*\
  !*** ./modules/booleans.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanAnd": () => (/* binding */ BooleanAnd),
/* harmony export */   "BooleanNot": () => (/* binding */ BooleanNot),
/* harmony export */   "BooleanOr": () => (/* binding */ BooleanOr),
/* harmony export */   "NaryConjunctiveVerdict": () => (/* binding */ NaryConjunctiveVerdict),
/* harmony export */   "NaryDisjunctiveVerdict": () => (/* binding */ NaryDisjunctiveVerdict)
/* harmony export */ });
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports




/**
 * Abstract class representing the binary Boolean connectives "and" and "or".
 * @extends AtomicFunction
 */

class BooleanConnective extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  constructor() {
    super("arity");
  }

  compute() {
    var false_values = [];
    var false_positions = [];
    var true_values = [];
    var true_positions = [];

    for (var i = 0; i < arguments.length; i++) {
      var o = arguments[i].getValue();

      if (typeof o !== "boolean") {
        throw "BooleanConnective: Invalid argument type";
      }

      if (o === true) {
        true_values.push(arguments[i]);
        true_positions.push(i);
      } else {
        false_values.push(arguments[i]);
        false_positions.push(i);
      }
    }

    return this.getBooleanValue(false_values, true_values, false_positions, true_positions);
  }

}
/**
 * An {@link NaryValue} that is linked to its input values through an "or"
 * node.
 * @extends NaryValue
 */


class NaryDisjunctiveVerdict extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.NaryValue {
  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getOrNode();

    for (var i = 0; i < this.values.length; i++) {
      var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_3__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.InputArgument(this.positions[i]));
      var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
      var sub_leaves = [];
      sub_leaves = this.values[i].query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, sub_root, factory);
      leaves.push(...sub_leaves);
      n.addChild(sub_root);
    }

    if (n.getChildren().length === 1) {
      root.addChild(n.getChildren()[0]);
    } else {
      root.addChild(n);
    }

    return leaves;
  }

}
/**
 * An {@link NaryValue} that is linked to its input values through an "and"
 * node.
 * @extends NaryValue
 */


class NaryConjunctiveVerdict extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.NaryValue {
  constructor(value, values = [], positions = []) {
    super(value, values, positions);
  }

  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getAndNode();

    for (var i = 0; i < this.values.length; i++) {
      var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_3__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.InputArgument(this.positions[i]));
      var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
      var sub_leaves = [];
      sub_leaves = this.values[i].query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, sub_root, factory);
      leaves.push(...sub_leaves);
      n.addChild(sub_root);
    }

    if (n.getChildren().length === 1) {
      root.addChild(n.getChildren()[0]);
    } else {
      root.addChild(n);
    }

    return leaves;
  }

}
/**
 * The Boolean "and" function.
 * @extends BooleanConnective
 */


class BooleanAnd extends BooleanConnective {
  constructor(arity = 2) {
    super(arity);
  }
  /**
   * Gets the Boolean value.
   * @param false_values
   * @param true_values
   * @param false_positions
   * @param true_positions
   */


  getBooleanValue(false_values = [], true_values = [], false_positions = [], true_positions = []) {
    if (false_values.length === 0) {
      return new NaryConjunctiveVerdict(true, true_values, true_positions);
    }

    return new NaryDisjunctiveVerdict(false, false_values, false_positions);
  }

  toString() {
    return "And";
  }

}
/**
 * The Boolean "or" function.
 * @extends BooleanConnective
 */


class BooleanOr extends BooleanConnective {
  constructor(arity = 2) {
    super(arity);
  }

  getBooleanValue(false_values = [], true_values = [], false_positions = [], true_positions = []) {
    if (true_values.length === 0) {
      return new NaryConjunctiveVerdict(false, false_values, false_positions);
    }

    return new NaryDisjunctiveVerdict(true, true_values, true_positions);
  }

  toString() {
    return "Or";
  }

}
/**
 * The Boolean "not" function.
 * @extends AtomicFunction
 */


class BooleanNot extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  constructor() {
    super(1);
  }

  getValue() {
    if (typeof arguments[0] !== "boolean") {
      throw "BooleanNot: Invalid argument type";
    }

    return !arguments[0];
  }

  toString() {
    return "Not";
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/composed-function.mjs":
/*!***************************************!*\
  !*** ./modules/composed-function.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Argument": () => (/* binding */ Argument),
/* harmony export */   "ArgumentValue": () => (/* binding */ ArgumentValue),
/* harmony export */   "ComposedFunction": () => (/* binding */ ComposedFunction),
/* harmony export */   "ComposedFunctionValue": () => (/* binding */ ComposedFunctionValue),
/* harmony export */   "FunctionNamedArgument": () => (/* binding */ FunctionNamedArgument),
/* harmony export */   "NamedArgument": () => (/* binding */ NamedArgument),
/* harmony export */   "NamedArgumentValue": () => (/* binding */ NamedArgumentValue)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _tracer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tracer.mjs */ "./modules/tracer.mjs");
/*
  A lineage library for DOM nodes
  MIT License

  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Imports
 */




/**
 * A function that is defined as the composition of other functions.
 * @extends AtomicFunction
 */

class ComposedFunction extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  /**
     * Creates a new instance of the function.
     * @param operator The top-level operator this function composes
     * @param operands The operands of this function. These operands
     * can themselves be other functions.
     */
  constructor(operator, ...operands) {
    super();
    this.members = [operator, ...operands];
    this.operator = operator;
    this.operands = [];

    for (var i = 0; i < operands.length; i++) {
      if (typeof operands[i] === "string") {
        var op = operands[i];

        if (op.startsWith("@")) {
          var index = op.substring(1).trim();
          this.operands.push(new Argument(index));
          continue;
        }

        if (op.startsWith("$")) {
          this.operands.push(new NamedArgument(this, op.substring(1).trim()));
          continue;
        }
      } else {
        this.operands.push(_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction.lift(operands[i]));
      }
    }
  }

  setName(name) {
    this.name = name;
    return this;
  }

  set(variable, value) {
    var cf = new ComposedFunction(this.operator);
    var operands = [];

    for (var i = 0; i < this.operands.length; i++) {
      operands.push(this.operands[i].set(variable, value));
    }

    cf.operands = operands;
    return cf;
  }

  getArity() {
    var args = [];
    this.getArguments(args);
    return args.length;
  }

  getArguments(args) {
    for (var i = 0; i < this.operands.length; i++) {
      var f = this.operands[i];

      if (f instanceof ComposedFunction) {
        f.getArguments(args);
      }

      if (f instanceof Argument) {
        args.push(f.index);
      }

      if (f instanceof NamedArgument) {
        args.push(i);
      }
    }
  }

  evaluate() {
    var values = [];

    for (var i = 0; i < this.operands.length; i++) {
      values.push(this.operands[i].evaluate(...arguments));
    }

    var v = this.operator.evaluate(...values);
    return new ComposedFunctionValue(this, v, ...values);
  }

  toString() {
    if (this.name != null) {
      return this.name;
    }

    return "F(" + this.operator.toString() + ")";
  }

}
/**
 * Value returned by a composed function.
 * @extends Value
 */


class ComposedFunctionValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(f, return_value, ...values) {
    super();
    this.referenceFunction = f;
    this.inputValues = values;
    this.returnValue = return_value;
  }

  query(q, d, root, factory) {
    var leaves = [];

    if (!(d.head() instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue)) {
      return leaves;
    }

    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue.instance, d.tail());
    var sub_root = factory.getObjectNode(new_d, this.referenceFunction.operator);
    var sub_leaves = this.returnValue.query(q, d, sub_root, factory);
    var new_sub_leaves = [];

    for (var i = 0; i < sub_leaves.length; i++) {
      var sub_leaf = sub_leaves[i];

      if (sub_leaf instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_3__.ObjectNode) {
        var o_sl = sub_leaf;
        var des = o_sl.getDesignatedObject().getDesignator();

        if (des.head() instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_1__.InputArgument) {
          var fia = des.head();
          var index = fia.getIndex();
          new_sub_leaves.push(...this.inputValues[index].query(q, new_d, sub_leaf, factory));
          continue;
        }
      }

      new_sub_leaves.push(sub_leaf);
    }

    leaves.push(...new_sub_leaves);
    root.addChild(sub_root);
    return leaves;
  }

  getValue() {
    return this.returnValue.getValue();
  }

  toString() {
    return this.returnValue.toString();
  }

}
/**
 * A named argument.
 * @extends AbstractFunction
 */


class NamedArgument extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  constructor(f, name) {
    super();
    this.name = name;
    this.value = null;
    this.referenceFunction = f;
    this.isSet = false;
  }
  /* @Override */


  set(name, value) {
    if (this.name === name || "$" + this.name === name) {
      this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(value);
    }

    this.isSet = true;
    return this;
  }

  evaluate() {
    if (this.isSet) {
      return new NamedArgumentValue(this.name, this.value);
    }

    for (var i = 0; i < this.referenceFunction.operands.length; i++) {
      if (this.referenceFunction.operands[i] instanceof NamedArgument) {
        if (this.name === this.referenceFunction.operands[i].getName()) {
          return new NamedArgumentValue(this.name, _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[i]));
        }
      }
    }

    return new NamedArgumentValue(this.name, this.value);
  }

  toString() {
    return "$" + this.name;
  }

  getArity() {
    return 0;
  }

  getName() {
    return this.name;
  }

}
/**
 * A named argument value.
 * @extends Value
 */


class NamedArgumentValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(name, v) {
    super();
    this.value = v;
    this.name = name;
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), new FunctionNamedArgument(this.name, this.value));
    var n = factory.getObjectNode(new_d, this.value);
    var sub_leaves = this.value.query(q, d, n, factory);
    leaves.push(...sub_leaves);
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.getValue().toString();
  }

}
/**
 * Designates the argument passed to a function by referring to it
 * by its name.
 * @extends Designator
 */


class FunctionNamedArgument extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /**
     * Creates a new named argument.
     * @param name The name of the argument
     * @param v The value of the argument
     */
  constructor(name, v) {
    super();
    this.name = name;
    this.value = v;
  }

  appliesTo(o) {
    return o instanceof Function;
  }

  head() {
    return this;
  }

  tail() {
    return null;
  }

  toString() {
    return "$" + this.name + "/" + this.value;
  }

}
/**
 * A function that acts as an argument to a composed function.
 * @extends AbstractFunction
 */


class Argument extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  /**
     * Creates a new instance of the function.
     * @param index The position of the argument in the composed
     * function
     */
  constructor(index) {
    super();
    this.index = index;
  }
  /* @Override */


  set(name, value) {
    return this;
  }

  evaluate() {
    var v = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[this.index]);
    return new ArgumentValue(this, v, this.index);
  }

  toString() {
    return "@" + this.index;
  }

}
/**
 * A value that corresponds to an argument passed to a composed function.
 * @extends Value
 */


class ArgumentValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  /**
     * Creates a new argument value.
     * @param f The function to which this value is an argument
     * @param v The value
     * @param index The position of the value in the arguments of the
     * function
     */
  constructor(f, v, index) {
    super();
    this.value = v;
    this.index = index;
    this.referenceFunction = f;
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_1__.InputArgument(this.index, this.value));
    var n = factory.getObjectNode(new_d, this.value);
    var sub_leaves = this.value.query(q, d, n, factory);
    leaves.push(...sub_leaves);
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/designator.mjs":
/*!********************************!*\
  !*** ./modules/designator.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "All": () => (/* binding */ All),
/* harmony export */   "CompoundDesignator": () => (/* binding */ CompoundDesignator),
/* harmony export */   "Designator": () => (/* binding */ Designator),
/* harmony export */   "Nothing": () => (/* binding */ Nothing),
/* harmony export */   "Unknown": () => (/* binding */ Unknown)
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.mjs */ "./modules/util.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
   A lineage library for DOM nodes
  MIT License

  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Imports
 */
// Local imports

/**
 * Abstract class representing all functions that extract parts of an
 * object.
 */

class Designator {
  /**
   * Creates a new instance of designator.
   */
  constructor() {// Nothing to do
  }
  /**
   * Extracts the designator at the head of a composition. For designators that
   * are atomic, returns the designator itself.
   */


  head() {
    return this;
  }
  /**
   * Extracts the designator made of the tail of a composition. For designators
   * that are atomic, returns null.
   */


  tail() {
    return null;
  }

  equals(o) {
    if (o == null || !(o instanceof Designator)) {
      return false;
    }

    return o == this;
  }

}
/**
 * A special designator that designates "nothing".
 * @extends Designator
 */


class Nothing extends Designator {
  constructor() {
    super();
  }

  toString() {
    return "Nothing";
  }

  equals(o) {
    if (o == null || !(o instanceof Nothing)) {
      return false;
    }

    return true;
  }

}
/**
 * A special designator that designates "unknown".
 * @extends Designator
 */


_defineProperty(Nothing, "instance", new Nothing());

class Unknown extends Designator {
  constructor() {
    super();
  }

  toString() {
    return "Unknown";
  }

  equals(o) {
    if (o == null || !(o instanceof Unknown)) {
      return false;
    }

    return true;
  }

}
/**
 * A special designator that designates all of an object.
 * @extends Designator
 */


_defineProperty(Unknown, "instance", new Unknown());

class All extends Designator {
  constructor() {
    super();
  }

  toString() {
    return "All";
  }

  equals(o) {
    if (o == null || !(o instanceof All)) {
      return false;
    }

    return true;
  }

}
/**
 * Designator expressed as the composition of atomic designators.
 * @param Any number of designators
 * @extends Designator
 */


_defineProperty(All, "instance", new All());

class CompoundDesignator extends Designator {
  /**
   * Creates a flat compound designator from a list of other designators.
   */
  static create() {
    if (arguments.length == 0) {
      return Nothing.instance;
    }

    var designators = [];

    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] == null) {
        continue;
      }

      if (arguments[i] instanceof CompoundDesignator) {
        designators.push(...arguments[i].elements);
      } else {
        designators.push(arguments[i]);
      }
    }

    if (designators.length == 0) {
      return Nothing.instance;
    }

    if (designators.length == 1) {
      return designators[0];
    }

    return new CompoundDesignator(...designators);
  }

  constructor() {
    super();
    this.elements = [];

    for (var i = 0; i < arguments.length; i++) {
      this.add(arguments[i]);
    }
  }
  /**
   * Adds a designator to the composition.
   * @param d The designator to add. If it is compound, each of its elements are
   * added individually. This helps keeping the compound designators "flat".
   * If d is null, the input is simply ignored and nothing happens.
   */


  add(d) {
    if (d == null) {
      return;
    }

    if (d instanceof CompoundDesignator) {
      for (var j = 0; j < d.elements.length; j++) {
        this.add(d.elements[j]);
      }
    } else {
      this.elements.push(d);
    }
  }
  /**
   * Gets the size (number of atomic designators) contained in this composite
   * designator.
   * @return The number of atomic designators
   */


  size() {
    return this.elements.length;
  }

  head() {
    if (this.elements.length == 0) {
      return new Nothing();
    }

    return this.elements[this.elements.length - 1];
  }

  tail() {
    if (this.elements.length <= 1) {
      return null;
    }

    if (this.elements.length == 2) {
      return this.elements[0];
    }

    var new_d = new CompoundDesignator();

    for (var i = 0; i < this.elements.length - 1; i++) {
      new_d.add(this.elements[i]);
    }

    return new_d;
  }

  toString() {
    var s = "";

    for (var i = 0; i < this.elements.length; i++) {
      if (i > 0) {
        s += " of ";
      }

      s += this.elements[i].toString();
    }

    return s;
  }

  equals(o) {
    if (o == null || !(o instanceof CompoundDesignator)) {
      return false;
    }

    if (o.size() != this.size()) {
      return false;
    }

    for (var i = 0; i < this.elements.length; i++) {
      if (!(0,_util_mjs__WEBPACK_IMPORTED_MODULE_0__.same_object)(this.elements[i], o.elements[i])) {
        return false;
      }
    }

    return true;
  }

}
/**
 * Module exports
 */




/***/ }),

/***/ "./modules/enumerate.mjs":
/*!*******************************!*\
  !*** ./modules/enumerate.mjs ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Enumerate": () => (/* binding */ Enumerate),
/* harmony export */   "EnumeratedValue": () => (/* binding */ EnumeratedValue),
/* harmony export */   "NthItem": () => (/* binding */ NthItem)
/* harmony export */ });
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/*
  A lineage library for DOM nodes
  MIT License

  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/



/**
 *
 * @extends AtomicFunction
 */

class Enumerate extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor() {
    super(1);
  }

  compute() {
    var list = arguments[0].getValue();

    if (!Array.isArray(list)) {
      throw "Enumerate: Invalid argument type";
    }

    var val_list = [];
    var out_list = [];

    for (var i = 0; i < list.length; i++) {
      val_list.push(_value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(list[i]));
    }

    for (let i = 0; i < list.length; i++) {
      out_list.push(new EnumeratedValue(i, val_list));
    }

    return new _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunctionReturnValue(this, out_list, ...arguments);
  }

  getValue() {
    return null;
  }

}
/**
 *
 * @extends Value
 */


class EnumeratedValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(index, input_list) {
    super();
    this.index = index;
    this.inputList = input_list;
    this.members = [index, input_list];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_1__.CompoundDesignator.create(d.tail(), new NthItem(this.index));
    var n_it = factory.getObjectNode(new_d, this.inputList);
    root.addChild(n_it);
    var v = this.inputList[this.index];
    var sub_leaves = v.query(q, new_d, n_it, factory);
    leaves.push(...sub_leaves);
    return leaves;
  }

  getValue() {
    return this.inputList[this.index].getValue();
  }

  toString() {
    return this.inputList[this.index].getValue().toString();
  }

  equals(o) {
    if (o == null || !(o instanceof EnumeratedValue)) {
      return false;
    }

    return this.index === o.index && this.inputList === o.inputList;
  }

}
/**
 *
 * @extends Designator
 */


class NthItem extends _designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Designator {
  constructor(index) {
    super();
    this.index = index;
  }

  appliesTo(o) {
    return Array.isArray(o);
  }

  getIndex() {
    return this.index;
  }

  toString() {
    return "Element #" + (this.index + 1);
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/function.mjs":
/*!******************************!*\
  !*** ./modules/function.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractFunction": () => (/* binding */ AbstractFunction),
/* harmony export */   "ConstantFunction": () => (/* binding */ ConstantFunction),
/* harmony export */   "InputArgument": () => (/* binding */ InputArgument),
/* harmony export */   "ReturnValue": () => (/* binding */ ReturnValue)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports


/**
 * Abstract class representing a function.
 */

class AbstractFunction {
  constructor() {
    this.members = [];
  }
  /**
   * Converts an arbitrary object into a {@link Function}.
   * @param o The object to convert. If o is a function, it is returned as is.
   * Otherwise, o is converted into a {@link ConstantFunction} that returns
   * the {@link Value} lifted from o.
   * @return The converted function
   */


  static lift(o) {
    if (o instanceof AbstractFunction) {
      return o;
    }

    return new ConstantFunction(_value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value.lift(o));
  }
  /**
   * Computes the return value of the function from its provided input
   * arguments.
   * @param arguments A variable number of input arguments
   * @return The return value of the function
   */


  evaluate() {
    // To be overridden by descendants
    return null;
  }
  /**
   * Binds a variable name to a specific value.
   * @param variable The name of the variable
   * @param value The value to bind this variable to
   */


  setTo(variable, value) {// To be overridden by descendants
  }
  /**
   * Gets the arity of the function.
   * @return The arity
   */


  getArity() {
    return 0;
  }

  equals(o) {
    if (o == null || !(o instanceof AbstractFunction)) {
      return false;
    }

    return o == this;
  } // d is a deserializer and j is a JSON structure


  static deserialize(d, j) {
    const params = [];

    for (const serializedParam of j.contents) {
      if (typeof serializedParam == "object" && Object.keys(serializedParam).length == 2 && typeof serializedParam.name != "undefined" && typeof serializedParam.contents != "undefined") {
        params.push(d.deserialize(serializedParam));
      } else {
        params.push(serializedParam);
      }
    }

    return new this(...params);
  }

  toJson() {
    const serializedMembers = [];

    for (const member of this.members) {
      if (typeof member == "object" && AbstractFunction.isPrototypeOf(member.constructor)) {
        serializedMembers.push(member.toJson());
      } else {
        serializedMembers.push(member);
      }
    }

    return {
      "name": this.constructor.name,
      "contents": serializedMembers
    };
  }

}
/**
 * Atomic designator representing the return value of a function.
 * @extends Designator
 */


class ReturnValue extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  constructor() {
    super();
  }

  toString() {
    return "!";
  }

  equals(o) {
    if (o == null || !(o instanceof ReturnValue)) {
      return false;
    }

    return true;
  }

}
/**
 * Atomic designator representing one of the input arguments of a function.
 * @param index The index of the input argument
 * @extends Designator
 */


_defineProperty(ReturnValue, "instance", new ReturnValue());

class InputArgument extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  constructor(index) {
    super();
    /**
     * The index of the input argument
     */

    this.index = index;
  }
  /**
   * Gets the index of this argument.
   */


  getIndex() {
    return this.index;
  }

  toString() {
    return "@" + this.index;
  }

  equals(o) {
    if (o == null || !(o instanceof InputArgument)) {
      return false;
    }

    return o.getIndex() == this.index;
  }

}
/**
 * Function or arity 0 that always returns the same object.
 * @extends AbstractFunction
 */


class ConstantFunction extends AbstractFunction {
  /**
   * Creates a new instance of constant function.
   * @param o The object to return
   */
  constructor(o) {
    super();
    this.members = [o];
    this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value.lift(o);
  }

  evaluate() {
    return this.value;
  }

  getArity() {
    return 0;
  }

  set(variable, value) {
    return this;
  }

}
/**
 * Module exports
 */




/***/ }),

/***/ "./modules/numbers.mjs":
/*!*****************************!*\
  !*** ./modules/numbers.mjs ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Addition": () => (/* binding */ Addition),
/* harmony export */   "Subtraction": () => (/* binding */ Subtraction),
/* harmony export */   "Division": () => (/* binding */ Division),
/* harmony export */   "GreaterOrEqual": () => (/* binding */ GreaterOrEqual),
/* harmony export */   "LesserOrEqual": () => (/* binding */ LesserOrEqual),
/* harmony export */   "GreaterThan": () => (/* binding */ GreaterThan),
/* harmony export */   "LesserThan": () => (/* binding */ LesserThan),
/* harmony export */   "Multiplication": () => (/* binding */ Multiplication),
/* harmony export */   "IsEqualTo": () => (/* binding */ IsEqualTo)
/* harmony export */ });
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports
 //import { Value } from "./value.mjs";

/**
 * Function that checks the equality between two objects. Two objects o1 and o2
 * are equal if one of these conditions hold:
 * <ul>
 * <li>they are both null</li>
 * <li>they are both non-null and:
 * <ol>
 *   <li>they represent the same numeric value, or</li>
 *   <li>they are the same string</li>
 * </ol></li>
 * </ul>
 * @extends AtomicFunction
 */

class IsEqualTo extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (o1 == null && o2 == null) {
      return true;
    }

    if (o1 == null && o2 != null || o1 != null && o2 == null) {
      return false;
    }

    if (typeof o1 === "number" && typeof o2 === "number") {
      return o1 === o2;
    }

    if (typeof o1 === "string" && typeof o2 === "string") {
      return o1 === o2;
    }

    return false;
  }

}
/**
 * Function that adds numbers.
 * @extends AtomicFunction
 */


class Addition extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 2) {
    super(arity);
  }

  getValue() {
    var sum = 0;

    for (var i = 0; i < this.arity; i++) {
      var o = arguments[i];

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      sum += o;
    }

    return sum;
  }

  toString() {
    return "Addition";
  }

}
/**
 * Function that subtracts numbers.
 * @extends AtomicFunction
 */


class Subtraction extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 3) {
    super(arity);
  }

  getValue() {
    var sub = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      sub -= o;
    }

    return sub;
  }

  toString() {
    return "Subtraction";
  }

}
/**
 * Function that multiplies numbers.
 * @extends AtomicFunction
 */


class Multiplication extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 2) {
    super(arity);
  }

  compute() {
    if (arguments.length !== this.arity) {
      throw "Invalid number of arguments";
    }

    var zero_values = [];
    var zero_positions = [];
    var result = 1;

    for (var i = 0; i < this.arity; i++) {
      var o = arguments[i].getValue();

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      if (o === 0) {
        zero_values.push(arguments[i]);
        zero_positions.push(i);
      } else {
        result *= o;
      }
    }

    return this.getZeroValue(zero_values, zero_positions, result);
  }

  getZeroValue(zero_values = [], zero_positions = [], result = null) {
    if (zero_values.length === 0) {
      return result;
    } else {
      return parseFloat(zero_values);
    }
  }

  toString() {
    return "Multiplication";
  }

}
/**
 * Function that divides numbers.
 * @extends AtomicFunction
 */


class Division extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 2) {
    super(arity);
  }

  getValue() {
    var div = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      div /= o;
    }

    return div;
  }

  toString() {
    return "Division";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is greater than the second.
 * @extends AtomicFunction
 */


class GreaterThan extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. GreaterThan expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 > o2;
  }

  toString() {
    return "&gt;";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is Lesser than the second.
 * @extends AtomicFunction
 */


class LesserThan extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. LesserThan expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 < o2;
  }

  toString() {
    return "&lt;";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is greater than or equal to the second.
 * @extends AtomicFunction
 */


class GreaterOrEqual extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. GreaterOrEqual expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 >= o2;
  }

  toString() {
    return "&ge;";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is Lesser than or equal to the second.
 * @extends AtomicFunction
 */


class LesserOrEqual extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. LesserOrEqual expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 <= o2;
  }

  toString() {
    return "&le;";
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/quantifier.mjs":
/*!********************************!*\
  !*** ./modules/quantifier.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExistentialQuantifier": () => (/* binding */ ExistentialQuantifier),
/* harmony export */   "Quantifier": () => (/* binding */ Quantifier),
/* harmony export */   "QuantifierConjunctiveVerdict": () => (/* binding */ QuantifierConjunctiveVerdict),
/* harmony export */   "QuantifierDisjunctiveVerdict": () => (/* binding */ QuantifierDisjunctiveVerdict),
/* harmony export */   "QuantifierVerdict": () => (/* binding */ QuantifierVerdict),
/* harmony export */   "UniversalQuantifier": () => (/* binding */ UniversalQuantifier)
/* harmony export */ });
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _verdict_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verdict.mjs */ "./modules/verdict.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Imports
 */



/**
 * Base class for the implementation of the universal and existential
 * quantifiers.
 * @extends AbstractFunction
 */

class Quantifier extends _function_mjs__WEBPACK_IMPORTED_MODULE_0__.AbstractFunction {
  /**
   * Creates a new instance of quantifier.
   * @param index {integer|string}
   * @param domain {AbstractFunction}
   * @param phi {AbstractFunction}
   */
  constructor(index, domain, phi) {
    super();

    if (typeof index === "number") {
      this.index = index;
    } else {
      this.variable = index;
    }

    this.domain = domain;
    this.phi = phi;
    this.members = [index, domain, phi];
  }

  getArity() {
    return 1;
  }

  evaluate() {
    if (arguments.length !== 1) {
      throw "Invalid number of arguments";
    }

    var true_verdicts = [];
    var false_verdicts = [];
    var v_dom = this.domain.evaluate(...arguments);
    var o_dom = v_dom.getValue();

    if (!Array.isArray(o_dom)) {
      throw "Domain expression does not return a list";
    }

    var domain = o_dom;

    for (var i = 0; i < domain.length; i++) {
      var x = _value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value.lift(domain[i]);
      var cf = this.phi.set(this.variable, x);
      var ret_val = cf.evaluate(...arguments);
      var o_b = ret_val.getValue();

      if (typeof o_b !== "boolean") {
        throw "Invalid argument type";
      }

      var b = o_b;

      if (b) {
        true_verdicts.push({
          value: x,
          verdict: ret_val
        });
      } else {
        false_verdicts.push({
          value: x,
          verdict: ret_val
        });
      }
    }

    return this.getQuantifierValue(false_verdicts, true_verdicts);
  }

  getQuantifierValue(false_verdicts, true_verdicts) {
    return null; // To be overridden by descendants
  }

}
/**
 * Common class to {@link QuantifierDisjunctiveVerdict} and
 * {@link QuantifierConjunctiveVerdict}.
 * @extends Value
 */


class QuantifierVerdict extends _value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value {
  constructor(f, value, verdicts) {
    super();
    this.value = value;
    this.verdicts = verdicts;
    this.referenceFunction = f;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

}
/**
 * Verdict returned by a quantifier and which depends on either of the input
 * values provided. This verdict is returned for a universal quantifier that
 * evaluates to false, and for an existential quantifier that evaluates to
 * true.
 * @extends QuantifierVerdict
 */


class QuantifierDisjunctiveVerdict extends QuantifierVerdict {
  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getOrNode();

    for (var i = 0; i < this.verdicts.length; i++) {
      var vv = this.verdicts[i];
      var v = vv.verdict;
      var sub_factory = factory.getSubTracer(this.referenceFunction);
      var sub_leaves = v.query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, n, sub_factory);
      leaves.push(...sub_leaves);
    }

    var tn = factory.getObjectNode(_function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, this.referenceFunction);

    if (this.verdicts.length === 1) {
      tn.addChild(n.getChildren()[0]);
    } else {
      tn.addChild(n);
    }

    root.addChild(tn);
    return leaves;
  }

}
/**
 * Verdict returned by a quantifier and which depends on all the input values
 * provided. This verdict is returned for a universal quantifier that evaluates
 * to true, and for an existential quantifier that evaluates to false.
 * @extends QuantifierVerdict
 */


class QuantifierConjunctiveVerdict extends QuantifierVerdict {
  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getAndNode();

    for (var i = 0; i < this.verdicts.length; i++) {
      var vv = this.verdicts[i];
      var v = vv.verdict;
      var sub_factory = factory.getSubTracer(v);
      var sub_leaves = v.query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, n, sub_factory);
      leaves.push(...sub_leaves);
    }

    var tn = factory.getObjectNode(_function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, this.referenceFunction);

    if (this.verdicts.length === 1) {
      tn.addChild(n.getChildren()[0]);
    } else {
      tn.addChild(n);
    }

    root.addChild(tn);
    return leaves;
  }

}
/**
 * Universal quantifier.
 * @extends Quantifier
 */


class UniversalQuantifier extends Quantifier {
  getQuantifierValue(false_verdicts = [], true_verdicts = []) {
    if (false_verdicts.length === 0) {
      return new QuantifierConjunctiveVerdict(this, true, true_verdicts);
    }

    return new QuantifierDisjunctiveVerdict(this, false, false_verdicts);
  }

  toString() {
    return "ForAll";
  }

  set(variable, value) {
    return new UniversalQuantifier(this.variable, this.domain.set(variable, value), this.phi.set(variable, value));
  }

}
/**
 * Existential quantifier.
 * @extends Quantifier
 */


class ExistentialQuantifier extends Quantifier {
  getQuantifierValue(false_verdicts = [], true_verdicts = []) {
    if (true_verdicts.length > 0) {
      return new QuantifierDisjunctiveVerdict(this, true, true_verdicts);
    }

    return new QuantifierConjunctiveVerdict(this, false, false_verdicts);
  }

  toString() {
    return "Exists";
  }

  set(variable, value) {
    return new ExistentialQuantifier(this.variable, this.domain.set(variable, value), this.phi.set(variable, value));
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/serialization.mjs":
/*!***********************************!*\
  !*** ./modules/serialization.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Serialization": () => (/* binding */ Serialization)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.mjs */ "./index.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/


class Serialization {
  constructor() {}
  /**
   * Build method deserialize(j), j is a JSON structure,
   * this method will produce a Function object
   */


  deserialize(j) {
    const functionClass = _index_mjs__WEBPACK_IMPORTED_MODULE_0__[j.name];
    return functionClass.deserialize(this, j);
  }

  serialize(s) {
    return s.toJson();
  }

}



/***/ }),

/***/ "./modules/syntax.mjs":
/*!****************************!*\
  !*** ./modules/syntax.mjs ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "And": () => (/* binding */ And),
/* harmony export */   "Current": () => (/* binding */ Current),
/* harmony export */   "Equals": () => (/* binding */ Equals),
/* harmony export */   "Exists": () => (/* binding */ Exists),
/* harmony export */   "Find": () => (/* binding */ Find),
/* harmony export */   "ForAll": () => (/* binding */ ForAll),
/* harmony export */   "Height": () => (/* binding */ Height),
/* harmony export */   "Implies": () => (/* binding */ Implies),
/* harmony export */   "IsGreaterOrEqual": () => (/* binding */ IsGreaterOrEqual),
/* harmony export */   "IsGreaterThan": () => (/* binding */ IsGreaterThan),
/* harmony export */   "IsLessOrEqual": () => (/* binding */ IsLessOrEqual),
/* harmony export */   "IsLessThan": () => (/* binding */ IsLessThan),
/* harmony export */   "Minus": () => (/* binding */ Minus),
/* harmony export */   "Not": () => (/* binding */ Not),
/* harmony export */   "Or": () => (/* binding */ Or),
/* harmony export */   "Plus": () => (/* binding */ Plus),
/* harmony export */   "Register": () => (/* binding */ Register),
/* harmony export */   "Width": () => (/* binding */ Width)
/* harmony export */ });
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./composed-function.mjs */ "./modules/composed-function.mjs");
/* harmony import */ var _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./booleans.mjs */ "./modules/booleans.mjs");
/* harmony import */ var _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quantifier.mjs */ "./modules/quantifier.mjs");
/* harmony import */ var _enumerate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enumerate.mjs */ "./modules/enumerate.mjs");
/* harmony import */ var _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./numbers.mjs */ "./modules/numbers.mjs");
/* harmony import */ var _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web-element.mjs */ "./modules/web-element.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports







/**
 * A module defining function methods that simplify the instantiation of common
 * functions. These methods make constructors and the recurrent use of
 * {@link ComposedFunction}s implicit, thereby shortening the expression of
 * asssertions. Ultimately, the library should only expose the functions defined
 * in this module to the end user.
 */
//class Syntax {

function And() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanAnd(arguments.length), ...arguments);
}

function Or() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanOr(arguments.length), ...arguments);
}

function Implies(op1, op2) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanOr(), new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanNot(), op1), op2);
}

function Not() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanNot(), arguments[0]);
}

function ForAll() {
  if (arguments.length == 2) {
    return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.UniversalQuantifier(arguments[0], new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_4__.Enumerate(), arguments[1]);
  }

  var domain = arguments[1];

  if (!(domain instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_0__.AbstractFunction)) {
    domain = new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ConstantFunction(domain);
  }

  return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.UniversalQuantifier(arguments[0], domain, arguments[2]);
}

function Exists() {
  if (arguments.length == 2) {
    return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.ExistentialQuantifier(arguments[0], new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_4__.Enumerate(), arguments[1]);
  }

  var domain = arguments[1];

  if (!(domain instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_0__.AbstractFunction)) {
    domain = new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ConstantFunction(domain);
  }

  return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.ExistentialQuantifier(arguments[0], domain, arguments[2]);
}

function IsGreaterThan() {
  if (arguments.length == 0) {
    return new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterThan();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterThan(), arguments[0], arguments[1]);
  }
}

function IsGreaterOrEqual() {
  if (arguments.length == 0) {
    return new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterOrEqual();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterOrEqual(), arguments[0], arguments[1]);
  }
}

function IsLessThan() {
  if (arguments.length == 0) {
    return new LessThan();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.LesserThan(), arguments[0], arguments[1]);
  }
}

function IsLessOrEqual() {
  if (arguments.length == 0) {
    return new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.LesserOrEqual();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.LesserOrEqual(), arguments[0], arguments[1]);
  }
}

function Find(x) {
  return new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.FindBySelector(x);
}

function Register(x, ...p) {
  return new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.RegisterBySelector(x, ...p);
}

function Width(o) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.DimensionWidth(), o);
}

function Height(o) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.DimensionHeight(), o);
}

function Equals(op1, op2) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.IsEqualTo(), op1, op2);
}

function Plus() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.Addition(arguments.length), ...arguments);
}

function Minus() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.Subtraction(arguments.length), ...arguments);
}

function Current(w) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.CurrentNode(), w);
} //}




/***/ }),

/***/ "./modules/tracer.mjs":
/*!****************************!*\
  !*** ./modules/tracer.mjs ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tracer": () => (/* binding */ Tracer),
/* harmony export */   "AndNode": () => (/* binding */ AndNode),
/* harmony export */   "DesignatedObject": () => (/* binding */ DesignatedObject),
/* harmony export */   "Explainer": () => (/* binding */ Explainer),
/* harmony export */   "ObjectNode": () => (/* binding */ ObjectNode),
/* harmony export */   "OrNode": () => (/* binding */ OrNode),
/* harmony export */   "UnknownNode": () => (/* binding */ UnknownNode)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.mjs */ "./modules/util.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports



/**
 * Manages the nodes of a designation and-or graph.
 * @param arguments An optional stack corresponding to the tracer's context.
 */

class Tracer {
  constructor() {
    /**
     * A map keeping trace of which designated objects already have nodes.
     */
    this.nodes = new Map();
    /**
     * The context in which the tracer operates (a stack).
     */

    this.tracerContext = [];

    if (arguments.length > 0) {
      this.tracerContext = arguments;
    }
    /**
     * Whether to simplify the trees
     */


    this.simplify = true;
  }
  /**
   * Sets whether the trees produced by the tracer should be simplified.
   * @param b {boolean} Set to true to simplify trees, false otherwise
   */


  setSimplify(b) {
    this.simplify = b;
  }
  /**
   * Gets a new instance of an object node.
   * @param dob The designated object that will be contained inside the node
   * @return The object node. If an object node already exists for this
   * designated object, it is reused. Otherwise, a new object node is created.
   */


  getObjectNode(d, o) {
    if (d instanceof DesignatedObject) {
      var dob = d;
    } else {
      var dob = new DesignatedObject(d, o);
    }

    if ((0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.map_contains)(this.nodes, dob)) {
      return (0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.map_get)(this.nodes, dob);
    }

    var on = new ObjectNode(dob);
    (0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.map_put)(this.nodes, dob, on);
    return on;
  }
  /**
   * Gets a new instance of an "and" node.
   * @return A new "and" node
   */


  getAndNode() {
    return new AndNode();
  }
  /**
   * Gets a new instance of an "or" node.
   * @return A new "or" node
   */


  getOrNode() {
    return new OrNode();
  }
  /**
   * Gets a new instance of an "unknown" node.
   * @return A new "unknown" node
   */


  getUnknownNode() {
    return new UnknownNode();
  }
  /**
   * Gets an instance of a sub-tracer from this tracer.
   * @param {Object} o An object to append at the end of the current
   * tracer's context
   */


  getSubTracer(o) {
    var con = [];
    con.push(...this.tracerContext);
    con.push(o);
    return new Tracer(...con);
  }

  getTree(q, d, o) {
    var visited = [];
    var tn = this.getObjectNode(d, o);
    this.getChildren(q, tn, visited);
    return tn;
  }

  getChildren(q, root, visited) {
    if ((0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.set_contains)(visited, root)) {
      // This node has already been expanded
      return;
    }

    visited.push(root);

    if (!(root instanceof ObjectNode)) {
      // Nothing to expand
      return;
    }

    var dob = root.getDesignatedObject();
    var o = dob.getObject();
    var d = dob.getDesignator();

    if (d instanceof _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.All || d instanceof _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Nothing || d instanceof _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Unknown) {
      // Trivial designator: nothing to expand
      return;
    }

    if (typeof o.query == "function") // Object is queryable
      {
        // Send the query and create nodes from its result
        var leaves = o.query(q, d, root, this);

        for (var i = 0; i < leaves.length; i++) {
          this.getChildren(q, leaves[i], visited);
        }
      } else {// Query is non-trivial, and object is not trackable: nothing to do
      //var n = this.getObjectNode(Unknown.instance, o);
      //root.addChild(n);
    }
  }

}
/**
 * Abstract object representing a generic node in an and-or lineage graph.
 */


class TraceabilityNode {
  /**
   * A counter for traceability node IDs.
   */
  constructor() {
    /**
     * The node's unique ID
     */
    this.id = TraceabilityNode.TN_ID_COUNTER++;
    /**
     * The node's children
     */

    this.children = [];
  }
  /**
   * Gets the node'is unique ID.
   * @return The node's ID
   */


  getId() {
    return this.id;
  }
  /**
   * Adds a child to the node.
   * @return The node to add
   */


  addChild(n) {
    if (n == this) {
      return;
    }

    this.children.push(n);
  }
  /**
   * Gets the children of this node.
   * @return The list of children
   */


  getChildren() {
    return this.children;
  }

}
/**
 * An "and" node.
 * @extends TraceabilityNode
 */


_defineProperty(TraceabilityNode, "TN_ID_COUNTER", 0);

class AndNode extends TraceabilityNode {
  constructor() {
    super();
  }

  toString() {
    var indent = "";

    if (arguments.length == 1) {
      indent = arguments[0];
    }

    var s = "";
    s += indent + "^" + "\n";

    for (var i = 0; i < this.children.length; i++) {
      s += indent + this.children[i].toString(indent + " ");
    }

    return s;
  }

  addChild(n) {
    if (n instanceof AndNode) {
      for (var i = 0; i < n.children.length; i++) {
        this.children.push(n.children[i]);
      }
    } else {
      this.children.push(n);
    }
  }

}
/**
 * An "or" node.
 * @extends TraceabilityNode
 */


class OrNode extends TraceabilityNode {
  constructor() {
    super();
  }

  toString() {
    var indent = "";

    if (arguments.length == 1) {
      indent = arguments[0];
    }

    var s = "";
    s += indent + "v" + "\n";

    for (var i = 0; i < this.children.length; i++) {
      s += indent + this.children[i].toString(indent + " ");
    }

    return s;
  }

  addChild(n) {
    if (n instanceof OrNode) {
      for (var i = 0; i < n.children.length; i++) {
        this.children.push(n.children[i]);
      }
    } else {
      this.children.push(n);
    }
  }

}
/**
 * An "unknown" node.
 * @extends TraceabilityNode
 */


class UnknownNode extends TraceabilityNode {
  constructor() {
    super();
  }

  toString() {
    return "?";
  }

}
/**
 * An "object" node.
 * @extends TraceabilityNode
 */


class ObjectNode extends TraceabilityNode {
  /**
   * Creates a new object node.
   * @param {Designator|DesignatedObject} d The designator
   * @param {Object} o The object that is designated
   */
  constructor(d, o) {
    super();

    if (d instanceof DesignatedObject) {
      this.designatedObject = d;
    } else {
      this.designatedObject = new DesignatedObject(d, o);
    }
  }
  /**
   * Gets the designated object contained inside this node.
   */


  getDesignatedObject() {
    return this.designatedObject;
  }

  toString() {
    return this.designatedObject.toString();
  }

}
/**
 * Association between a designator, and object and an optional context.
 */


class DesignatedObject {
  /**
   * Creates a new designated object
   * @param designator The part of the object that is designated
   * @param object The object that is designated
   * @param context The object's context
   */
  constructor(designator, object, context) {
    /**
     * The part of the object that is designated.
     */
    this.designator = designator;
    /**
     * The object that is designated.
     */

    this.object = object;
    /**
     * The object's context.
     */

    if (arguments.length >= 3) {
      this.context = context;
    } else {
      this.context = [];
    }
  }
  /**
   * Retrieves the designator associated to an object.
   * @return The designator
   */


  getDesignator() {
    return this.designator;
  }
  /**
   * Retrieves the object that is being designated.
   * @return The object
   */


  getObject() {
    return this.object;
  }
  /**
   * Retrieves the object's context.
   * @return The context
   */


  getContext() {
    return this.context;
  }

  equals(cdo) {
    if (cdo == null || !(cdo instanceof DesignatedObject)) {
      return false;
    }

    return (this.object == null && cdo.object == null || this.object != null && (0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.same_object)(this.object, cdo.object)) && this.designator.equals(cdo.designator) && this.sameContext(cdo);
  }
  /**
   * Checks if two designated objects have the same context.
   * @param cdo The other designated object
   * @return <tt>true</tt> if the two objects have the same context,
   * <tt>false</tt> otherwise
   */


  sameContext(cdo) {
    if (this.context.length != cdo.context.length) {
      return false;
    }

    for (var i = 0; i < this.context.length; i++) {
      if (this.context[i] != cdo.context[i]) {
        return false;
      }
    }

    return true;
  }

  toString() {
    return this.designator.toString() + " of " + this.object.toString();
  }

}
/**
 * Front-end to explain the result of a calculation. This class provides a
 * static method called <tt>explain</tt> that can be used to produce a
 * lineage DAG from a {@link Value} returned by a function.
 */


class Explainer {
  constructor() {// Nothing to do
  }
  /**
   * Explains the result of a calculation produced by an
   * {@link AbstractFunction}.
   * @param v {Value} The value to explain
   * @param simplify Set to <tt>true</tt> to produce a simplified DAG
   * (default), <tt>false</tt> to get a full DAG
   */


  static explain(v, simplify = true) {
    var tracer = new Tracer();
    tracer.setSimplify(simplify);
    return tracer.getTree(null, _function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue.instance, v);
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/util.mjs":
/*!**************************!*\
  !*** ./modules/util.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map_contains": () => (/* binding */ map_contains),
/* harmony export */   "map_get": () => (/* binding */ map_get),
/* harmony export */   "map_put": () => (/* binding */ map_put),
/* harmony export */   "same_object": () => (/* binding */ same_object),
/* harmony export */   "set_contains": () => (/* binding */ set_contains),
/* harmony export */   "isHtmlElement": () => (/* binding */ isHtmlElement)
/* harmony export */ });
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Checks if two objects are equal. This is a surrogate to simulate the
 * behavior of Object.equals in Java. If the first object has an equals()
 * method, it is called; otherwise, standard equality between JavaScript
 * objects is used.
 * @param o1 The first object
 * @param o2 The second object
 * @return true if the two objects are equal, false otherwise
 */
function same_object(o1, o2) {
  if (o1 == null && o2 == null) {
    return true;
  }

  if (o1 == null && o2 != null || o1 != null && o2 == null) {
    return false;
  } // assert: o1 != null && o2 != null


  if (typeof o1.equals === "function") {
    // Two objects that implement equals
    return o1.equals(o2);
  }

  return o1 === o2;
}

function map_get(m, k) {
  for (const [key, value] of m) {
    if (key.equals(k)) {
      return value;
    }
  }

  return null;
}

function map_contains(m, k) {
  for (const [key] of m) {
    if (same_object(key, k)) {
      return true;
    }
  }

  return false;
}

function map_put(m, k, v) {
  for (const [key] of m) {
    if (same_object(key, k)) {
      m.set(key, v);
      return;
    }
  }

  m.set(k, v);
}

function set_contains(s, x) {
  for (var i = 0; i < s.length; i++) {
    if (same_object(s[i], x)) {
      return true;
    }
  }

  return false;
}

function isHtmlElement(obj) {
  if (typeof obj != 'object') {
    return false;
  }

  while (obj.constructor.name !== "" && obj.constructor.name !== "Object") {
    if ((obj.name || obj.constructor.name) === "HTMLElement") {
      return true;
    }

    obj = Object.getPrototypeOf(obj.constructor);
  }

  return false;
}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/value.mjs":
/*!***************************!*\
  !*** ./modules/value.mjs ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstantDesignator": () => (/* binding */ ConstantDesignator),
/* harmony export */   "ConstantValue": () => (/* binding */ ConstantValue),
/* harmony export */   "NaryValue": () => (/* binding */ NaryValue),
/* harmony export */   "Value": () => (/* binding */ Value)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports

/**
 * Object produced by the call(this) to a function, and whose lineage
 * can be computed.
 */

class Value {
  /*
  constructor() {
  	// Nothing to do
  }
  */

  /**
   * Gets the concrete value carried by this Value object.
   * @return The value
   */
  getValue() {
    // To be overridden by descendants
    return null;
  }
  /**
   * Queries the provenance of a value.
   * @param type The type of lineage relationship
   * @param d A designator representing the part of the object that is the
   * subject of the query
   * @param root The node to which the rsults of the query should be appended
   * as children
   * @param A factory to produce traceability nodes
   * @return The list of terminal traceability nodes produced by this query
   */


  query(type, d, root, factory) {// To be overridden by descendants
  } // d is a deserializer and j is a JSON structure


  static deserialize(d, j) {
    const params = [];

    for (const serializedParam of j.contents) {
      if (typeof serializedParam == "object" && Object.keys(serializedParam).length == 2 && typeof serializedParam.name != "undefined" && typeof serializedParam.contents != "undefined") {
        params.push(d.deserialize(serializedParam));
      } else if (Array.isArray(serializedParam)) {
        for (var i = 0; i < serializedParam.length; i++) {
          if (typeof serializedParam[i] == "object" && Object.keys(serializedParam[i]).length == 2 && typeof serializedParam[i].name != "undefined" && typeof serializedParam[i].contents != "undefined") serializedParam[i] = d.deserialize(serializedParam[i]);
        }

        params.push(serializedParam);
      } else {
        params.push(serializedParam);
      }
    }

    return new this(...params);
  }

  toJson() {
    const serializedMembers = [];

    for (var member of this.members) {
      if (typeof member == "object" && Value.isPrototypeOf(member.constructor)) {
        serializedMembers.push(member.toJson());
      } else if (Array.isArray(member)) {
        for (var i = 0; i < member.length; i++) {
          if (typeof member[i] == "object" && Value.isPrototypeOf(member[i].constructor)) member[i] = member[i].toJson();
        }

        serializedMembers.push(member);
      } else {
        serializedMembers.push(member);
      }
    }

    return {
      "name": this.constructor.name,
      "contents": serializedMembers
    };
  }
  /**
   * Converts an arbitrary object into a {@link Value}.
   * @param o The object to convert. If o is a {@link Value}, it is returned as
   * is. Otherwise, o is converted into a {@link ConstantValue} that returns o.
   * @return The converted value
   */


  static lift(o) {
    if (o instanceof Value) {
      return o;
    }

    return new ConstantValue(o);
  }

}
/**
 * Value that is linked to a list of other values. This class is the
 * ancestor used for values produced by most n-ary atomic functions.
 * @extends Value
 */


class NaryValue extends Value {
  /**
   * Creates a new instance of this value.
   * @param {Object} value The value to produce
   * @param {Array} values An array of {@link Value}s that are linked to
   * this value
   * @param {Array} positions An array of integers with the position of
   * each input value in the function's arguments
   */
  constructor(value, values = [], positions = []) {
    super();
    this.value = value;
    this.values = values;
    this.positions = positions;
  }

  getValue() {
    return this.value;
  }

}
/**
 * Special type of value that always returns the same constant.
 * @param o The constant to return
 * @extends Value
 */


class ConstantValue extends Value {
  constructor(o) {
    super();
    /**
     * The value represented by this constant
     */

    this.value = o;
    this.members = [o];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d, new ConstantDesignator());
    var n = factory.getObjectNode(new_d, this.value);
    root.addChild(n);
    leaves.push(n);
    return leaves;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  equals(o) {
    if (o == null || !(o instanceof Value)) {
      return false;
    }

    return o.getValue() === this.value;
  }

}
/**
 * Atomic designator that points to the value of a constant.
 * @extends Designator
 */


class ConstantDesignator extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /*
  constructor() {
  	super();
  }
  */
  toString() {
    return "Value";
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/verdict.mjs":
/*!*****************************!*\
  !*** ./modules/verdict.mjs ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestCondition": () => (/* binding */ TestCondition),
/* harmony export */   "TestDriver": () => (/* binding */ TestDriver),
/* harmony export */   "TestResult": () => (/* binding */ TestResult),
/* harmony export */   "Verdict": () => (/* binding */ Verdict)
/* harmony export */ });
/* harmony import */ var _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tracer.mjs */ "./modules/tracer.mjs");
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.mjs */ "./modules/util.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports



class TestDriver {
  constructor() {
    this.conditions = [];

    if (arguments.length > 0) {
      this.conditions = arguments;
    }

    this.returnedValues = [];
  }
  /**
   * Adds a condition to evaluate
   */


  add() {
    this.conditions.push(...arguments);
  }

  evaluateAll(o) {
    this.returnedValues = [];

    for (var i = 0; i < this.conditions.length; i++) {
      var v = this.conditions[i].evaluate(o);
      this.returnedValues.push(v);
    }
  }

  getResult() {
    var verdicts = [];

    for (var i = 0; i < this.conditions.length; i++) {
      verdicts.push(new Verdict(this.returnedValues[i], this.conditions[i]));
    }

    return new TestResult(...verdicts);
  }

}

class TestCondition {
  constructor(name, f) {
    this.name = name;
    this.function = f;
  }

  getName() {
    return this.name;
  }
  /**
   * Evaluates a test condition on a web element.
   * @param e The web element on which to evaluate the test condition
   * @return {Verdict} The result of the evaluation of the condition
   */


  evaluate(e) {
    return this.function.evaluate(e);
  }

}

class Verdict {
  /**
   * Creates a new verdict.
   * @param v {Value} The return value of the test condition
   * @param c {TestCondition} The test condition that was evaluated
   */
  constructor(v, c) {
    this.value = v;
    this.condition = c;
  }

  getCondition() {
    return this.condition;
  }

  getValue() {
    return this.value;
  }

  getResult() {
    var o = this.value.getValue();

    if (!o) {
      return false;
    }

    return true;
  }

  getWitness() {
    var list = [];
    var root = _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.Explainer.explain(this.value);
    Verdict.pick(root, list);
    return list;
  }
  /**
   * Non-deterministically picks a set of objects that explain the verdict.
   * The method is recursive and works as follows:
   * <ul>
   * <li>If the current node is an And node, call pick on all its
   * children</li>
   * <li>If the current node is an Or node, call pick on one of its
   * children</li>
   * <li>If the current node is a leaf ObjectNode, add it to the list</li>
   * <li>Otherwise, call pick on all children of the node</li>
   * </ul>
   * Non-determinism occurs because of the handling of the Or node. By
   * construction, any set of elements produced by the method is one of the
   * clauses of the tree when put in disjunctive normal form.
   * @param n The current node
   * @param list A list to which nodes are added
   */


  static pick(n, list, visited = []) {
    if ((0,_util_mjs__WEBPACK_IMPORTED_MODULE_1__.set_contains)(visited, n)) {
      return;
    }

    visited.push(n);

    if (n instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.AndNode) {
      for (var i = 0; i < n.getChildren().length; i++) {
        Verdict.pick(n.getChildren()[i], list, visited);
      }
    } else if (n instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.OrNode) {
      var test = true;

      while (test) {
        Verdict.pick(n.getChildren()[i], list, visited);
        test = false;
      }
      /*
      for (let i = 0; i < n.getChildren().length; i++) {
      	Verdict.pick(n.getChildren()[i], list, visited);
      	break;
      }
      */

    } else if (n instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectNode) {
      if (n.getChildren().length === 0) {
        list.push(n.getDesignatedObject());
      } else {
        for (let i = 0; i < n.getChildren().length; i++) {
          Verdict.pick(n.getChildren()[i], list, visited);
        }
      }
    }
  }

}

class TestResult {
  constructor() {
    this.verdicts = arguments;
  }

  getVerdicts() {
    return this.verdicts;
  }

  getResult() {
    for (var i = 0; i < this.verdicts.length; i++) {
      if (!this.verdicts[i].getResult()) {
        return false;
      }
    }

    return true;
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/web-element.mjs":
/*!*********************************!*\
  !*** ./modules/web-element.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundColor": () => (/* binding */ BackgroundColor),
/* harmony export */   "BackgroundImage": () => (/* binding */ BackgroundImage),
/* harmony export */   "BorderColor": () => (/* binding */ BorderColor),
/* harmony export */   "BorderRadius": () => (/* binding */ BorderRadius),
/* harmony export */   "BorderStyle": () => (/* binding */ BorderStyle),
/* harmony export */   "BorderWidth": () => (/* binding */ BorderWidth),
/* harmony export */   "ClientOffsetTop": () => (/* binding */ ClientOffsetTop),
/* harmony export */   "ClientOffsetLeft": () => (/* binding */ ClientOffsetLeft),
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "CssPropertyFunction": () => (/* binding */ CssPropertyFunction),
/* harmony export */   "CssRecursivePropertyFunction": () => (/* binding */ CssRecursivePropertyFunction),
/* harmony export */   "CurrentNode": () => (/* binding */ CurrentNode),
/* harmony export */   "DimensionHeight": () => (/* binding */ DimensionHeight),
/* harmony export */   "DimensionWidth": () => (/* binding */ DimensionWidth),
/* harmony export */   "Display": () => (/* binding */ Display),
/* harmony export */   "ElementAttribute": () => (/* binding */ ElementAttribute),
/* harmony export */   "ElementAttributeValue": () => (/* binding */ ElementAttributeValue),
/* harmony export */   "FindBySelector": () => (/* binding */ FindBySelector),
/* harmony export */   "Float": () => (/* binding */ Float),
/* harmony export */   "FontFamily": () => (/* binding */ FontFamily),
/* harmony export */   "FontSize": () => (/* binding */ FontSize),
/* harmony export */   "FontWeight": () => (/* binding */ FontWeight),
/* harmony export */   "MarginTop": () => (/* binding */ MarginTop),
/* harmony export */   "MarginBottom": () => (/* binding */ MarginBottom),
/* harmony export */   "MarginRight": () => (/* binding */ MarginRight),
/* harmony export */   "MarginLeft": () => (/* binding */ MarginLeft),
/* harmony export */   "NodeWrapper": () => (/* binding */ NodeWrapper),
/* harmony export */   "Opacity": () => (/* binding */ Opacity),
/* harmony export */   "PageOffsetTop": () => (/* binding */ PageOffsetTop),
/* harmony export */   "PageOffsetLeft": () => (/* binding */ PageOffsetLeft),
/* harmony export */   "Path": () => (/* binding */ Path),
/* harmony export */   "PathValue": () => (/* binding */ PathValue),
/* harmony export */   "PaddingTop": () => (/* binding */ PaddingTop),
/* harmony export */   "PaddingBottom": () => (/* binding */ PaddingBottom),
/* harmony export */   "PaddingRight": () => (/* binding */ PaddingRight),
/* harmony export */   "PaddingLeft": () => (/* binding */ PaddingLeft),
/* harmony export */   "Position": () => (/* binding */ Position),
/* harmony export */   "RegisterBySelector": () => (/* binding */ RegisterBySelector),
/* harmony export */   "Visibility": () => (/* binding */ Visibility),
/* harmony export */   "WebElementFunction": () => (/* binding */ WebElementFunction),
/* harmony export */   "Zindex": () => (/* binding */ Zindex)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enumerate.mjs */ "./modules/enumerate.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Imports
 */




/**
 *
 * @extends AtomicFunction
 */

class WebElementFunction extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  constructor(name) {
    super(1);
    this.name = name;
  }

  compute() {
    var element = arguments[0].getValue();
    var val;

    if (element.isWrapper) {
      val = this.getWrapperValue(element);
    } else {
      val = this.get(element);
    }

    return new ElementAttributeValue(this.name, arguments[0], val);
  }

  get(e) {
    return null; // To be overridden by descendants
  } //this method help to get window object


  getOwnerWindow(element) {
    return element.ownerDocument.defaultView || element.ownerDocument.parentWindow;
  }

  getElementComputedStyle(element) {
    const window = this.getOwnerWindow(element);
    return window.getComputedStyle(element);
  }

  getWrapperValue(wrapper) {
    for (let i = 0; i < wrapper.propertyNames.length; i++) {
      if (wrapper.propertyNames[i] == this.name) {
        return wrapper.propertyValues[i];
      }
    }

    var node = document.evaluate(wrapper.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return this.get(node);
  }

}
/**
 * Designator that points to the value of an attribute for some DOM node.
 * @extends Designator
 */


class ElementAttribute extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /**
   * Creates a ne instance of the designator.
   * @param name {String} The name of the attribute
   */
  constructor(name) {
    super();
    this.name = name;
  }

  toString() {
    return this.name;
  }

}
/**
 * The value of an attribute for some DOM node.
 * @extends Value
 */


class ElementAttributeValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  /**
   * Creates a new instance of the value.
   * @param name {String} The name of the attribute in the DOM node
   * @param input {Object|Value} The DOM node, or a value containing the
   * DOM node
   * @param v {Object|Value} The value of the attribute in the DOM node
   */
  constructor(name, input, v) {
    super();
    this.name = name;
    this.input = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(input);
    this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(v);
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.getValue().toString();
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(new ElementAttribute(this.name), d);
    var n = factory.getObjectNode(new_d, this.input);
    leaves.push(...this.input.query(q, new_d, n, factory));
    root.addChild(n);
    return leaves;
  }

}
/**
 * value of css attribute
 * @extends WebElementFunction
 */


class CssPropertyFunction extends WebElementFunction {
  constructor(name, returnType = null) {
    if (["float", "int", "string", null].indexOf(returnType) == -1) {
      throw new Error(`CssPropertyFunction returnType expects one of the following values: "float", "int", "string", null. Received ${returnType} instead.`);
    }

    super(name);
    this.returnType = returnType;
  }

  get(element) {
    const style = this.getElementComputedStyle(element);
    const value = style.getPropertyValue(this.name);

    switch (this.returnType) {
      case "float":
        return parseFloat(value);

      case "int":
        return parseInt(value);

      case "string":
        return typeof value == "string" ? value : value.toString();
    }

    return value;
  }

}
/**
 * value of a css attribute, but in case the value is undefined or does not meet certain criteria, retrieve the value of the parent element
 * @extends WebElementFunction
 */


class CssRecursivePropertyFunction extends WebElementFunction {
  constructor(name, returnType = null, defaultValue = null) {
    if (["float", "int", "string", null].indexOf(returnType) == -1) {
      throw new Error(`CssPropertyFunction returnType expects one of the following values: "float", "int", "string", null. Received ${returnType} instead.`);
    }

    super(name);
    this.returnType = returnType;
    this.defaultValue = defaultValue;
  }

  get(element) {
    const value = this.getRecursive(element);

    switch (this.returnType) {
      case "float":
        return parseFloat(value);

      case "int":
        return parseInt(value);

      case "string":
        return typeof value == "string" ? value : value.toString();
    }

    return value;
  }

  getRecursive(element) {
    if (!element) return this.defaultValue;
    const style = this.getElementComputedStyle(element);
    const value = style.getPropertyValue(this.name);
    if (this.filter(value)) return this.getRecursive(element.parentElement);else return value;
  } //to be overridden by descendants to add additionnal filters depending on property


  filter(value) {
    return value == "";
  }

}
/**
 * Function that extracts the width of a DOM node.
 * @extends WebElementFunction
 */


class DimensionWidth extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("width");
  }

  get(element) {
    return element.offsetWidth;
  }

}
/**
 * Function that extracts the height of a DOM node.
 * @extends WebElementFunction
 */


class DimensionHeight extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("height");
  }

  get(element) {
    return element.offsetHeight;
  }

}
/** 
 * Function that extracts the offset from the top of the page of a DOM node.
 * @extends WebElementFunction
 */


class PageOffsetTop extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("pageOffsetTop");
  }

  get(element) {
    return this.getOffsetTop(element);
  }

  getOffsetTop(element) {
    if (!element) return 0;
    return this.getOffsetTop(element.offsetParent) + element.offsetTop;
  }

}
/**
 * Function that extracts the offset from the left of the page of a DOM node.
 * @extends WebElementFunction
 */


class PageOffsetLeft extends WebElementFunction {
  /**
  * Creates a new instance of the function.
  */
  constructor() {
    super("pageOffsetLeft");
  }

  get(element) {
    return this.getOffsetLeft(element);
  }

  getOffsetLeft(element) {
    if (!element) return 0;
    return this.getOffsetLeft(element.offsetParent) + element.offsetLeft;
  }

}
/** 
 * Function that extracts the offset from the top of the viewport of a DOM node.
 * @extends WebElementFunction
 */


class ClientOffsetTop extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("clientOffsetTop");
  }

  get(element) {
    return element.getBoundingClientRect().top;
  }

}
/** 
 * Function that extracts the offset from the left of the viewport of a DOM node.
 * @extends WebElementFunction
 */


class ClientOffsetLeft extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("clientOffsetLeft");
  }

  get(element) {
    return element.getBoundingClientRect().left;
  }

}
/**
 * Function that extracts the font size.
 * @extends CssPropertyFunction
 */


class FontSize extends CssPropertyFunction {
  constructor() {
    super("font-size");
  }

}
/**
 * Function that extracts the font size.
 * @extends CssPropertyFunction
 */


class FontWeight extends CssPropertyFunction {
  constructor() {
    super("font-weight");
  }

}
/**
 * Function that extracts the font family
 * @extends CssPropertyFunction
 */


class FontFamily extends CssPropertyFunction {
  constructor() {
    super("font-family");
  }

}
/**
 * Function that extract the color of DOM element
 * @extends CssPropertyFunction
 */


class Color extends CssPropertyFunction {
  constructor() {
    super("color");
  }

}
/**
 * Function that extract the opacity
 * @extends CssPropertyFunction
 */


class Opacity extends CssPropertyFunction {
  constructor() {
    super("opacity", "float");
  }

}
/**
 * Function that extracts the background-color of a DOM.
 * @extends CssPropertyFunction
 */


class BackgroundColor extends CssRecursivePropertyFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("background-color", null, "rgba(0, 0, 0, 0)");
  }

  filter(value) {
    return value == "" || value == "transparent" || value == "rgba(0, 0, 0, 0)";
  }

}
/**
 * Function that extract margin-top of a DOM
 * @extends CssPropertyFunction
 */


class MarginTop extends CssPropertyFunction {
  constructor() {
    super("margin-top", "float");
  }

}
/**
 * Function that extract margin-bottom of a DOM
 * @extends CssPropertyFunction
 */


class MarginBottom extends CssPropertyFunction {
  constructor() {
    super("margin-bottom");
  }

}
/**
 * Function that extract margin-left of a DOM
 * @extends CssPropertyFunction
 */


class MarginLeft extends CssPropertyFunction {
  constructor() {
    super("margin-left");
  }

}
/**
 * Function that extract margin-right of a DOM
 * @extends CssPropertyFunction
 */


class MarginRight extends CssPropertyFunction {
  constructor() {
    super("margin-right");
  }

}
/**
 * Function that extract paddig-top of a DOM
 * @extends CssPropertyFunction
 */


class PaddingTop extends CssPropertyFunction {
  constructor() {
    super("padding-top");
  }

}
/**
 * Function that extract paddig-bottom of a DOM
 * @extends CssPropertyFunction
 */


class PaddingBottom extends CssPropertyFunction {
  constructor() {
    super("padding-bottom");
  }

}
/**
 * Function that extract paddig-left of a DOM
 * @extends CssPropertyFunction
 */


class PaddingLeft extends CssPropertyFunction {
  constructor() {
    super("padding-left");
  }

}
/**
 * Function that extract paddig-right of a DOM
 * @extends CssPropertyFunction
 */


class PaddingRight extends CssPropertyFunction {
  constructor() {
    super("padding-right");
  }

}
/**
 * Function that extract border-width
 * @extends CssPropertyFunction
 */


class BorderWidth extends CssPropertyFunction {
  constructor() {
    super("border-width");
  }

}
/**
 * Function extract border-style of DOM element
 * @extends CssPropertyFunction
 */


class BorderStyle extends CssPropertyFunction {
  constructor() {
    super("border-style");
  }

}
/**
 * Function extrach border-color for DOM element
 * @extends CssPropertyFunction
 */


class BorderColor extends CssPropertyFunction {
  constructor() {
    super("border-color");
  }

}
/**
 * Function that extract border-radius
 * @extends CssPropertyFunction
 */


class BorderRadius extends CssPropertyFunction {
  constructor() {
    super("border-radius");
  }

}
/**
 * Function that extract display property of DOM element
 * @extends CssPropertyFunction
 */


class Display extends CssPropertyFunction {
  constructor() {
    super("display");
  }

}
/**
 * Function that extract visibility of DOM element
 * @extends CssPropertyFunction
 */


class Visibility extends CssPropertyFunction {
  constructor() {
    super("visibility");
  }

}
/**
 * Function that extract position of DOM element
 * @extends CssPropertyFunction
 */


class Position extends CssPropertyFunction {
  constructor() {
    super("position");
  }

}
/**
 * Function that extract flottant elemnt of DOM
 * @extends CssPropertyFunction
 */


class Float extends CssPropertyFunction {
  constructor() {
    super("float");
  }

}
/**
 * Function that extract flottant elemnt of DOM
 * @extends CssPropertyFunction
 */


class BackgroundImage extends CssPropertyFunction {
  constructor() {
    super("background-image");
  }

}
/**
 * Function that extract Z-index
 * @extends CssRecursivePropertyFunction
 */


class Zindex extends CssRecursivePropertyFunction {
  constructor() {
    super("z-index", "float", 0);
  }

  filter(value) {
    return value == "" || value == "auto";
  }

}
/**
 * Designator that points to an element in a DOM tree based on
 * an XPath expression.
 * @extends Designator
 */


class Path extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /**
   * Creates a new instance of the designator.
   * @param path {String} A string containing an XPath expression
   */
  constructor(path) {
    super();
    this.path = path;
  }

  toString() {
    return this.path;
  }

}
/**
 * The value of the path
 * @extends Value
 */


class PathValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(p, root, value) {
    super();
    this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(value);
    this.root = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(root);
    this.path = p;
    this.members = [p, root, value];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), this.path);
    var n = factory.getObjectNode(new_d, this.root);
    leaves.push(...this.root.query(q, new_d, n, factory));
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.toString();
  }

}
/**
 * Function that produces a list of elements that match a given CSS selector.
 * @extends Enumerate
 */


class FindBySelector extends _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.Enumerate {
  /**
   * Creates a new instance of the function.
   * @param selector The CSS selector used to fetch elements
   */
  constructor(selector) {
    super();
    this.selector = selector;
    this.members = [selector];
  }

  evaluate() {
    if (arguments.length !== 1) {
      throw "Invalid number of arguments";
    }

    var v = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[0]);
    var root = v.getValue();
    var elm_list = root.querySelectorAll(this.selector);
    var val_list = [];
    var out_list = [];

    for (let i = 0; i < elm_list.length; i++) {
      var path = FindBySelector.getPathTo(elm_list[i]);
      var pv = new PathValue(new Path(path), root, elm_list[i]);
      val_list.push(pv);
    }

    for (let i = 0; i < val_list.length; i++) {
      out_list.push(new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.EnumeratedValue(i, val_list));
    }

    return new _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunctionReturnValue(this, out_list, v);
  }

  static getPathTo(element) {
    if (element.id !== "") {
      return "id(\"" + element.id + "\")";
    }

    if (element.tagName === "BODY") {
      return "html/body";
    }

    var ix = 0;
    var siblings = element.parentNode.childNodes;

    for (let i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];

      if (sibling === element) {
        return this.getPathTo(element.parentNode) + "/" + element.tagName.toLowerCase() + "[" + (ix + 1) + "]";
      }

      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
  }

}
/**
 * Wrapper that enclose the path to a DOM Node and register a number of CSS property values determined by the user.
 */


class NodeWrapper {
  /**
   * Creates a new instance of the wrapper.
   * @param element Reference to the DOM Node used to fetch values
   * @param path Xpath corresponding to element
   * @param properties The list of CSS properties to be registered
   */
  constructor(element, path, ...properties) {
    this.isWrapper = true;
    this.path = path;
    this.propertyNames = [];
    this.propertyValues = [];

    for (let i = 0; i < properties.length; i++) {
      this.propertyNames[i] = properties[i].name;
      this.propertyValues[i] = properties[i].get(element);
    }
  }

}
/**
 * Function that finds a DOM Node from the Xpath stored in a NodeWrapper
 * @extends AtomicFunction
 */


class CurrentNode extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(1);
  }

  getValue() {
    var wrapper = arguments[0]; //wrapper = wrapper.inputList[wrapper.index].value.value;

    if (!wrapper.isWrapper) throw "CurrentNode : Invalid argument type";
    var node = document.evaluate(wrapper.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return node;
  }

}
/**
 * Function that produces a list of NodeWrapper from nodes that match a given CSS selector.
 * @extends Enumerate
 */


class RegisterBySelector extends _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.Enumerate {
  /**
   * Creates a new instance of the function.
   * @param selector The CSS selector used to fetch elements
   * @param properties The list of CSS attributes to be registered in the wrappers
   */
  constructor(selector, ...properties) {
    super();
    this.selector = selector;
    this.properties = properties;
    this.members = [selector, properties];
  }

  evaluate() {
    if (arguments.length !== 1) {
      throw "Invalid number of arguments";
    }

    var v = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[0]);
    var root = v.getValue();
    var elm_list = root.querySelectorAll(this.selector);
    var val_list = [];
    var out_list = [];

    for (let i = 0; i < elm_list.length; i++) {
      var path = FindBySelector.getPathTo(elm_list[i]);
      var wrapper = new NodeWrapper(elm_list[i], path, ...this.properties);
      var pv = new PathValue(new Path(path), root, wrapper);
      val_list.push(pv);
    }

    for (let i = 0; i < val_list.length; i++) {
      out_list.push(new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.EnumeratedValue(i, val_list));
    }

    return new _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunctionReturnValue(this, out_list, v);
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map