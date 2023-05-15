# QueryAST

[![Build Status][travis-image]][travis-url]
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=salesforce-ux/query-ast)](https://dependabot.com)
[![NPM version][npm-image]][npm-url]

A library to traverse/modify an AST

## Documentation

Read the [API documentation](https://salesforce-ux.github.io/query-ast/doc/1.0.0)

## Usage

```javascript
let createQueryWrapper = require('query-ast')
let $ = createQueryWrapper(ast, options)
```

## Getting Started

QueryAST aims to provide a jQuery like API for traversing an AST.

```javascript
let ast = {
  type: 'program',
  value: [{
    type: 'item_container',
    value: [{
      type: 'item',
      value: 'a'
    }]
  }, {
    type: 'item_container',
    value: []
  }, {
    type: 'item',
    value: 'b'
  }]
}

// Create a QueryWrapper that will be used to traverse/modify an AST
let $ = createQueryWrapper(ast)

// By default, the QueryWrapper is scoped to the root node
$('item').length() // 2

// The QueryWrapper can also be scoped to a NodeWrapper or array of NodeWrappers
$('item_container').filter((n) => {
  return $(n).has('item')
}).length() // 1
```

### Selectors

Most of the traversal functions take an optional `QueryWrapper~Selector` argument that will
be use to filter the results.

A selector can be 1 of 3 types:
- `string` that is compared against the return value of `options.getType()`
- `regexp` that is compared against the return value of `options.getType()`
- `function` that will be passed a `NodeWrapper` and expected to return a `boolean`

```javascript
let ast = {
  type: 'program',
  value: [{
    type: 'item_container',
    value: [{
      type: 'item',
      value: 'a'
    }]
  }, {
    type: 'item',
    value: 'b'
  }]
}

let $ = createQueryWrapper(ast)

// String
$('item').length() // 2

// RegExp
$(/item/).length() // 3

// Function
$((n) => n.node.value === 'a').length() // 1
```

### Default format

By default, QueryAST assumes that an AST will be formatted as a node tree
where each node has a `type` key and a `value` key that either contains the
string value of the node or an array of child nodes.

```javascript
let ast = {
  type: 'program',
  value: [{
    type: 'item',
    value: 'a'
  }]
}
```

## Alternate formats

Not every AST follows the same format, so QueryAST also provides a way
to traverse any tree structure. Below are the default options used to
handle the above AST structure.

```javascript
let options = {
  /**
   * Return true if the node has children
   *
   * @param {object} node
   * @returns {boolean}
   */
  hasChildren: (node) => Array.isArray(node.value),
  /**
   * Return an array of child nodes
   *
   * @param {object} node
   * @returns {object[]}
   */
  getChildren: (node) => node.value,
  /**
   * Return a string representation of the node's type
   *
   * @param {object} node
   * @returns {string}
   */
  getType: (node) => node.type,
  /**
   * Convert the node back to JSON. This usually just means merging the
   * children back into the node
   *
   * @param {object} node
   * @param {object[]} [children]
   * @returns {string}
   */
  toJSON: (node, children) => {
    return Object.assign({}, node, {
      value: children ? children : node.value
    })
  },
  /**
   * Convert the node to a string
   *
   * @param {object} node
   * @returns {string}
   */
  toString: (node) => {
    return typeof node.value === 'string' ? node.value : ''
  }
}
```

## Running tests

Clone the repository, then:

```bash
npm install
# requires node >= 6.0.0
npm test
```

## Generate Documentation

```bash
npm run doc
```

[npm-url]: https://npmjs.org/package/query-ast
[npm-image]: http://img.shields.io/npm/v/query-ast.svg

[travis-url]: https://travis-ci.org/salesforce-ux/query-ast
[travis-image]: https://travis-ci.org/salesforce-ux/query-ast.svg?branch=master
