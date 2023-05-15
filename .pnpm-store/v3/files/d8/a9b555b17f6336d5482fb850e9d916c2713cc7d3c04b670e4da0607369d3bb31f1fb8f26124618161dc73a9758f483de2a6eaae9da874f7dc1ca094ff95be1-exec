'use strict';

/**
 * Regular expression for matching require statements.
 */

function DepsRegex(options) {
  var regex, matchingDeps, matchingName = '\\s*(?:[\\w${},\\s*]+)\\s*';

  options = options || {};

  if (options.matchInternal !== false) {
    matchingDeps = '\\s*[\'"`]([^\'"`]+)[\'"`]\\s*';
  } else {
    matchingDeps = '\\s*[\'"`]([^\'"`.]+)[\'"`]\\s*';
  }

  regex = '(?:(?:var|const|let)' + matchingName + '=\\s*)?require\\(' + matchingDeps + '\\);?';

  if (options.matchES6 !== false) {
    regex += '|import(?:' + matchingName + 'from\\s*)?' + matchingDeps + ';?';
  }

  if (options.matchCoffeescript !== false) {
    regex += '|(?:' + matchingName + '=\\s*)?require' + matchingDeps + ';?';
  }

  if (options.matchGruntTask !== false) {
    regex += '|grunt(?:.tasks)?.loadNpmTasks\\(' + matchingDeps + '\\);?';
  }

  this.regex = function() {
    return new RegExp(regex, 'g');
  };
}

DepsRegex.prototype.exec = function(string) {
  return this.regex().exec(string);
};

DepsRegex.prototype.test = function(string) {
  return this.regex().test(string);
};

DepsRegex.prototype.getDependencies = function(string) {
  var matches = [], m = this.regex().exec(string);
  while (m) {
    matches.push(m[1] || m[2] || m[3] || m[4]);
    string = string.slice(m.index + m[0].length);
    m = this.regex().exec(string);
  }
  return matches;
};

module.exports = DepsRegex;
