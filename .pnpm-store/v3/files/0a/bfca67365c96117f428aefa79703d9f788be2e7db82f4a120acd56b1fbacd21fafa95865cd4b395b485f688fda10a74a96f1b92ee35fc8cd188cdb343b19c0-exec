# deps-regex

> Regular expression for matching javascript require statements.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i deps-regex --save
```

## Usage

```js
var DepsRegex = require('deps-regex');
var re = new DepsRegex({
  matchInternal: true,
  matchES6: true,
  matchCoffeescript: true
})

re.getDependencies('var foo = require(\'bar\');');
//=>
// [ 'bar']

```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/mathieudutour/deps-regex/issues/new).

## License

Released under the MIT license.
