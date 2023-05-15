import * as diff from 'diff';
import cliTruncate from 'cli-truncate';

function formatLine(line, outputTruncateLength) {
  var _a;
  return cliTruncate(line, (outputTruncateLength ?? (((_a = process.stdout) == null ? void 0 : _a.columns) || 80)) - 4);
}
function unifiedDiff(actual, expected, options = {}) {
  if (actual === expected)
    return "";
  const { outputTruncateLength, outputDiffLines, outputDiffMaxLines, showLegend = true } = options;
  const indent = "  ";
  const diffLimit = outputDiffLines || 15;
  const diffMaxLines = outputDiffMaxLines || 50;
  const counts = {
    "+": 0,
    "-": 0
  };
  let previousState = null;
  let previousCount = 0;
  const str = (str2) => str2;
  const dim = options.colorDim || str;
  const green = options.colorSuccess || str;
  const red = options.colorError || str;
  function preprocess(line) {
    if (!line || line.match(/\\ No newline/))
      return;
    const char = line[0];
    if ("-+".includes(char)) {
      if (previousState !== char) {
        previousState = char;
        previousCount = 0;
      }
      previousCount++;
      counts[char]++;
      if (previousCount === diffLimit)
        return dim(`${char} ...`);
      else if (previousCount > diffLimit)
        return;
    }
    return line;
  }
  const msg = diff.createPatch("string", expected, actual);
  let lines = msg.split("\n").slice(5).map(preprocess).filter(Boolean);
  let moreLines = 0;
  const isCompact = counts["+"] === 1 && counts["-"] === 1 && lines.length === 2;
  if (lines.length > diffMaxLines) {
    const firstDiff = lines.findIndex((line) => line[0] === "-" || line[0] === "+");
    const displayLines = lines.slice(firstDiff - 2, diffMaxLines);
    const lastDisplayedIndex = firstDiff - 2 + diffMaxLines;
    if (lastDisplayedIndex < lines.length)
      moreLines = lines.length - lastDisplayedIndex;
    lines = displayLines;
  }
  let formatted = lines.map((line) => {
    line = line.replace(/\\"/g, '"');
    if (line[0] === "-") {
      line = formatLine(line.slice(1), outputTruncateLength);
      if (isCompact)
        return green(line);
      return green(`- ${formatLine(line, outputTruncateLength)}`);
    }
    if (line[0] === "+") {
      line = formatLine(line.slice(1), outputTruncateLength);
      if (isCompact)
        return red(line);
      return red(`+ ${formatLine(line, outputTruncateLength)}`);
    }
    if (line.match(/@@/))
      return "--";
    return ` ${line}`;
  });
  if (moreLines)
    formatted.push(dim(`... ${moreLines} more lines`));
  if (showLegend) {
    if (isCompact) {
      formatted = [
        `${green("- Expected")}   ${formatted[0]}`,
        `${red("+ Received")}   ${formatted[1]}`
      ];
    } else {
      if (formatted[0].includes('"'))
        formatted[0] = formatted[0].replace('"', "");
      const last = formatted.length - 1;
      if (formatted[last].endsWith('"'))
        formatted[last] = formatted[last].slice(0, formatted[last].length - 1);
      formatted.unshift(
        green(`- Expected  - ${counts["-"]}`),
        red(`+ Received  + ${counts["+"]}`),
        ""
      );
    }
  }
  return formatted.map((i) => i ? indent + i : i).join("\n");
}

export { formatLine, unifiedDiff };
