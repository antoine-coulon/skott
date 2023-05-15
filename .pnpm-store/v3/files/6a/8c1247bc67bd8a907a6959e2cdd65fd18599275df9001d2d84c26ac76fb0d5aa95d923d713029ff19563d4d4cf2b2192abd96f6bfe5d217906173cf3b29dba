declare function formatLine(line: string, outputTruncateLength?: number): string;
type Color = (str: string) => string;
interface DiffOptions {
    outputDiffMaxLines?: number;
    outputTruncateLength?: number;
    outputDiffLines?: number;
    showLegend?: boolean;
    colorSuccess?: Color;
    colorError?: Color;
    colorDim?: Color;
}
/**
* Returns unified diff between two strings with coloured ANSI output.
*
* @private
* @param {String} actual
* @param {String} expected
* @return {string} The diff.
*/
declare function unifiedDiff(actual: string, expected: string, options?: DiffOptions): string;

export { DiffOptions, formatLine, unifiedDiff };
