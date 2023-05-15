// Copyright (c) 2016-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var invariant = require('invariant');

/**
 * Create a new {@link QueryWrapper}
 *
 * @function createQueryWrapper
 * @param {object} ast
 * @param {QueryWrapperOptions} options
 * @returns {function}
 */
module.exports = function (ast, options) {
  invariant(_.isPlainObject(ast), '"ast" must be a plain object');

  /**
   * @namespace QueryWrapperOptions
   */
  options = _.defaults({}, options, {
    /**
     * Return true if the node has children
     *
     * @memberof QueryWrapperOptions
     * @instance
     * @param {object} node
     * @returns {boolean}
     */
    hasChildren: function hasChildren(node) {
      return Array.isArray(node.value);
    },
    /**
     * Return an array of children for a node
     *
     * @memberof QueryWrapperOptions
     * @instance
     * @param {object} node
     * @returns {object[]}
     */
    getChildren: function getChildren(node) {
      return node.value;
    },
    /**
     * Return a string representation of the node's type
     *
     * @memberof QueryWrapperOptions
     * @instance
     * @param {object} node
     * @returns {string}
     */
    getType: function getType(node) {
      return node.type;
    },
    /**
     * Convert the node back to JSON. This usually just means merging the
     * children back into the node
     *
     * @memberof QueryWrapperOptions
     * @instance
     * @param {object} node
     * @param {object[]} [children]
     * @returns {string}
     */
    toJSON: function toJSON(node, children) {
      return Object.assign({}, node, {
        value: children || node.value
      });
    },
    /**
     * Convert the node to a string
     *
     * @memberof QueryWrapperOptions
     * @instance
     * @param {object} node
     * @returns {string}
     */
    toString: function toString(node) {
      return _.isString(node.value) ? node.value : '';
    }
  });

  var _arr = ['hasChildren', 'getChildren', 'getType', 'toJSON', 'toString'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    invariant(_.isFunction(options[key]), 'options.' + key + ' must be a function');
  }

  // Commonly used options
  var _options = options,
      hasChildren = _options.hasChildren,
      getChildren = _options.getChildren,
      getType = _options.getType,
      _toJSON = _options.toJSON,
      toString = _options.toString;

  /**
   * Wrap an AST node to get some basic helpers / parent reference
   */

  var NodeWrapper = function () {
    /**
     * Create a new NodeWrapper
     *
     * @param {object} node
     * @param {NodeWrapper} [parent]
     */
    function NodeWrapper(node, parent) {
      var _this = this;

      _classCallCheck(this, NodeWrapper);

      /**
       * @member {object}
       */
      this.node = node;
      /**
       * @member {NodeWrapper}
       */
      this.parent = parent;
      /**
       * @member {NodeWrapper[]}
       */
      this.children = this.hasChildren ? getChildren(node).map(function (n) {
        return new NodeWrapper(n, _this);
      }) : null;
      Object.freeze(this);
    }

    _createClass(NodeWrapper, [{
      key: 'toJSON',


      /**
       * Return the JSON representation
       *
       * @returns {object}
       */
      value: function toJSON() {
        return _toJSON(this.node, this.hasChildren ? this.children.map(function (n) {
          return n.toJSON();
        }) : null);
      }

      /**
       * Recursivley reduce the node and it's children
       *
       * @param {function} fn
       * @param {any} acc
       * @returns {object}
       */

    }, {
      key: 'reduce',
      value: function reduce(fn, acc) {
        return this.hasChildren ? fn(this.children.reduce(function (a, n) {
          return n.reduce(fn, a);
        }, acc), this) : fn(acc, this);
      }

      /**
       * Create a new NodeWrapper or return the argument if it's already a NodeWrapper
       *
       * @param {object|NodeWrapper} node
       * @param {NodeWrapper} [parent]
       * @returns {NodeWrapper}
       */

    }, {
      key: 'hasChildren',
      get: function get() {
        return hasChildren(this.node);
      }
    }], [{
      key: 'create',
      value: function create(node, parent) {
        if (node instanceof NodeWrapper) return node;
        return new NodeWrapper(node, parent);
      }

      /**
       * Return true if the provided argument is a NodeWrapper
       *
       * @param {any} node
       * @returns {NodeWrapper}
       */

    }, {
      key: 'isNodeWrapper',
      value: function isNodeWrapper(node) {
        return node instanceof NodeWrapper;
      }
    }]);

    return NodeWrapper;
  }();

  /**
   * The root node that will be used if no argument is provided to $()
   */


  var ROOT = NodeWrapper.create(ast);

  /*
   * @typedef {string|regexp|function} Wrapper~Selector
   */

  /**
   * Return a function that will be used to filter an array of QueryWrappers
   *
   * @private
   * @param {string|function} selector
   * @param {boolean} required
   * @returns {function}
   */
  var getSelector = function getSelector(selector, defaultValue) {
    defaultValue = !_.isUndefined(defaultValue) ? defaultValue : function (n) {
      return true;
    };
    var isString = _.isString(selector);
    var isRegExp = _.isRegExp(selector);
    var isFunction = _.isFunction(selector);
    if (!(isString || isRegExp || isFunction)) return defaultValue;
    if (isString) return function (n) {
      return getType(n.node) === selector;
    };
    if (isRegExp) return function (n) {
      return selector.test(getType(n.node));
    };
    if (isFunction) return selector;
  };

  /**
   * Convenience function to return a new Wrapper
   *
   * @private
   * @param {function|string|NodeWrapper|NodeWrapper[]} [selector]
   * @param {NodeWrapper|NodeWrapper[]} [context]
   * @returns {QueryWrapper}
   */
  var $ = function $(selector, context) {
    var maybeSelector = getSelector(selector, false);
    var nodes = _.flatten([(maybeSelector ? context : selector) || ROOT]);
    invariant(_.every(nodes, NodeWrapper.isNodeWrapper), 'context must be a NodeWrapper or array of NodeWrappers');
    return maybeSelector ? new QueryWrapper(nodes).find(maybeSelector) : new QueryWrapper(nodes);
  };

  /**
   * Wrap a {@link NodeWrapper} with chainable traversal/modification functions
   */

  var QueryWrapper = function () {
    /**
     * Create a new QueryWrapper
     *
     * @private
     * @param {NodeWrapper[]} nodes
     */
    function QueryWrapper(nodes) {
      _classCallCheck(this, QueryWrapper);

      this.nodes = nodes;
    }

    /**
     * Return a new wrapper filtered by a selector
     *
     * @private
     * @param {NodeWrapper[]} nodes
     * @param {function} selector
     * @returns {QueryWrapper}
     */


    _createClass(QueryWrapper, [{
      key: '$filter',
      value: function $filter(nodes, selector) {
        nodes = nodes.filter(selector);
        return $(nodes);
      }

      /**
       * Return the wrapper as a JSON node or array of JSON nodes
       *
       * @param {number} [index]
       * @returns {object|object[]}
       */

    }, {
      key: 'get',
      value: function get(index) {
        return _.isInteger(index) ? this.nodes[index].toJSON() : this.nodes.map(function (n) {
          return n.toJSON();
        });
      }

      /**
       * Return the number of nodes in the wrapper
       *
       * @returns {number}
       */

    }, {
      key: 'length',
      value: function length() {
        return this.nodes.length;
      }

      /**
       * Search for a given node in the set of matched nodes.
       *
       * If no argument is passed, the return value is an integer indicating
       * the position of the first node within the Wrapper relative
       * to its sibling nodes.
       *
       * If called on a collection of nodes and a NodeWrapper is passed in, the return value
       * is an integer indicating the position of the passed NodeWrapper relative
       * to the original collection.
       *
       * If a selector is passed as an argument, the return value is an integer
       * indicating the position of the first node within the Wrapper relative
       * to the nodes matched by the selector.
       *
       * If the selctor doesn't match any nodes, it will return -1.
       *
       * @param {NodeWrapper|Wrapper~Selector} [node]
       * @returns {number}
       */

    }, {
      key: 'index',
      value: function index(node) {
        if (!node) {
          var _n = this.nodes[0];
          if (_n) {
            var _p = _n.parent;
            if (_p && _p.hasChildren) return _p.children.indexOf(_n);
          }
          return -1;
        }
        if (NodeWrapper.isNodeWrapper(node)) {
          return this.nodes.indexOf(node);
        }
        var n = this.nodes[0];
        var p = n.parent;
        if (!p.hasChildren) return -1;
        var selector = getSelector(node);
        return this.$filter(p.children, selector).index(this.nodes[0]);
      }

      /**
       * Insert a node after each node in the set of matched nodes
       *
       * @param {object} node
       * @returns {QueryWrapper}
       */

    }, {
      key: 'after',
      value: function after(node) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var n = _step.value;

            var p = n.parent;
            if (!p.hasChildren) continue;
            var i = $(n).index();
            if (i >= 0) p.children.splice(i + 1, 0, NodeWrapper.create(node, p));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this;
      }

      /**
       * Insert a node before each node in the set of matched nodes
       *
       * @param {object} node
       * @returns {QueryWrapper}
       */

    }, {
      key: 'before',
      value: function before(node) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var n = _step2.value;

            var p = n.parent;
            if (!p.hasChildren) continue;
            var i = p.children.indexOf(n);
            if (i >= 0) p.children.splice(i, 0, NodeWrapper.create(node, p));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return this;
      }

      /**
       * Remove the set of matched nodes
       *
       * @returns {QueryWrapper}
       */

    }, {
      key: 'remove',
      value: function remove() {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var n = _step3.value;

            var p = n.parent;
            if (!p.hasChildren) continue;
            var i = p.children.indexOf(n);
            if (i >= 0) p.children.splice(i, 1);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return this;
      }

      /**
       * Replace each node in the set of matched nodes by returning a new node
       * for each node that will be replaced
       *
       * @param {function} fn
       * @returns {QueryWrapper}
       */

    }, {
      key: 'replace',
      value: function replace(fn) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var n = _step4.value;

            var p = n.parent;
            if (!p.hasChildren) continue;
            var i = p.children.indexOf(n);
            if (i >= 0) p.children.splice(i, 1, NodeWrapper.create(fn(n), p));
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return this;
      }

      /**
       * Map the set of matched nodes
       *
       * @param {function} fn
       * @returns {array}
       */

    }, {
      key: 'map',
      value: function map(fn) {
        return this.nodes.map(fn);
      }

      /**
       * Reduce the set of matched nodes
       *
       * @param {function} fn
       * @param {any} acc
       * @returns {any}
       */

    }, {
      key: 'reduce',
      value: function reduce(fn, acc) {
        return this.nodes.reduce(fn, acc);
      }

      /**
       * Combine the nodes of two QueryWrappers
       *
       * @param {QueryWrapper} wrapper
       * @returns {any}
       */

    }, {
      key: 'concat',
      value: function concat(wrapper) {
        invariant(wrapper instanceof QueryWrapper, 'concat requires a QueryWrapper');
        return $(this.nodes.concat(wrapper.nodes));
      }

      /**
       * Get the children of each node in the set of matched nodes,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'children',
      value: function children(selector) {
        selector = getSelector(selector);
        var nodes = _.flatMap(this.nodes, function (n) {
          return n.hasChildren ? n.children : [];
        });
        return this.$filter(nodes, selector);
      }

      /**
       * For each node in the set of matched nodes, get the first node that matches
       * the selector by testing the node itself and traversing up through its ancestors
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'closest',
      value: function closest(selector) {
        selector = getSelector(selector);
        var nodes = _.uniq(_.flatMap(this.nodes, function (n) {
          var parent = n;
          while (parent) {
            if (selector(parent)) break;
            parent = parent.parent;
          }
          return parent || [];
        }));
        return $(nodes);
      }

      /**
       * Reduce the set of matched nodes to the one at the specified index
       *
       * @param {number} index
       * @returns {QueryWrapper}
       */

    }, {
      key: 'eq',
      value: function eq(index) {
        invariant(_.isInteger(index), 'eq() requires an index');
        return $(this.nodes[index] || []);
      }

      /**
       * Get the descendants of each node in the set of matched nodes,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'find',
      value: function find(selector) {
        selector = getSelector(selector);
        var nodes = _.uniq(_.flatMap(this.nodes, function (n) {
          return n.reduce(function (a, n) {
            return selector(n) ? a.concat(n) : a;
          }, []);
        }));
        return $(nodes);
      }

      /**
       * Reduce the set of matched nodes to those that match the selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'filter',
      value: function filter(selector) {
        selector = getSelector(selector);
        return this.$filter(this.nodes, selector);
      }

      /**
       * Reduce the set of matched nodes to the first in the set.
       *
       * @returns {QueryWrapper}
       */

    }, {
      key: 'first',
      value: function first() {
        return this.eq(0);
      }

      /**
       * Reduce the set of matched nodes to those that have a descendant
       * that matches the selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'has',
      value: function has(selector) {
        var filter = function filter(n) {
          return $(n).find(selector).length() > 0;
        };
        return this.$filter(this.nodes, filter);
      }

      /**
       * Reduce the set of matched nodes to those that have a parent
       * that matches the selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'hasParent',
      value: function hasParent(selector) {
        var filter = function filter(n) {
          return $(n).parent(selector).length() > 0;
        };
        return this.$filter(this.nodes, filter);
      }

      /**
       * Reduce the set of matched nodes to those that have an ancestor
       * that matches the selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'hasParents',
      value: function hasParents(selector) {
        var filter = function filter(n) {
          return $(n).parents(selector).length() > 0;
        };
        return this.$filter(this.nodes, filter);
      }

      /**
       * Reduce the set of matched nodes to the final one in the set
       *
       * @returns {QueryWrapper}
       */

    }, {
      key: 'last',
      value: function last() {
        return this.eq(this.length() - 1);
      }

      /**
       * Get the immediately following sibling of each node in the set of matched nodes,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'next',
      value: function next(selector) {
        var _this2 = this;

        selector = getSelector(selector);
        var nodes = _.flatMap(this.nodes, function (n) {
          var index = _this2.index();
          return index >= 0 && index < n.parent.children.length - 1 ? n.parent.children[index + 1] : [];
        });
        return this.$filter(nodes, selector);
      }

      /**
       * Get all following siblings of each node in the set of matched nodes,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'nextAll',
      value: function nextAll(selector) {
        var _this3 = this;

        selector = getSelector(selector);
        var nodes = _.flatMap(this.nodes, function (n) {
          var index = _this3.index();
          return index >= 0 && index < n.parent.children.length - 1 ? _.drop(n.parent.children, index + 1) : [];
        });
        return this.$filter(nodes, selector);
      }

      /**
       * Get the parent of each nodes in the current set of matched nodess,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'parent',
      value: function parent(selector) {
        selector = getSelector(selector);
        var nodes = this.nodes.map(function (n) {
          return n.parent;
        });
        return this.$filter(nodes, selector);
      }

      /**
       * Get the ancestors of each nodes in the current set of matched nodess,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'parents',
      value: function parents(selector) {
        selector = getSelector(selector);
        var nodes = _.uniq(_.flatMap(this.nodes, function (n) {
          var parents = [];
          var parent = n.parent;
          while (parent) {
            parents.push(parent);
            parent = parent.parent;
          }
          return parents;
        }));
        return this.$filter(nodes, selector);
      }

      /**
       * Get the ancestors of each node in the set of matched nodes,
       * up to but not including the node matched by the selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'parentsUntil',
      value: function parentsUntil(selector) {
        selector = getSelector(selector);
        var nodes = _.uniq(_.flatMap(this.nodes, function (n) {
          var parents = [];
          var parent = n.parent;
          while (parent && !selector(parent)) {
            parents.push(parent);
            parent = parent.parent;
          }
          return parents;
        }));
        return $(nodes);
      }

      /**
       * Get the immediately preceding sibling of each node in the set of matched nodes,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'prev',
      value: function prev(selector) {
        var _this4 = this;

        selector = getSelector(selector);
        var nodes = _.flatMap(this.nodes, function (n) {
          var index = _this4.index();
          return index > 0 ? n.parent.children[index - 1] : [];
        });
        return this.$filter(nodes, selector);
      }

      /**
       * Get all preceding siblings of each node in the set of matched nodes,
       * optionally filtered by a selector
       *
       * @param {Wrapper~Selector} [selector]
       * @returns {QueryWrapper}
       */

    }, {
      key: 'prevAll',
      value: function prevAll(selector) {
        var _this5 = this;

        selector = getSelector(selector);
        var nodes = _.flatMap(this.nodes, function (n) {
          var index = _this5.index();
          return index > 0 ? _.take(n.parent.children, index).reverse() : [];
        });
        return this.$filter(nodes, selector);
      }

      /**
       * Get the combined string contents of each node in the set of matched nodes,
       * including their descendants
       */

    }, {
      key: 'value',
      value: function value() {
        return this.nodes.reduce(function (v, n) {
          return n.reduce(function (v, n) {
            return v + toString(n.node);
          }, v);
        }, '');
      }
    }]);

    return QueryWrapper;
  }();

  return $;
};