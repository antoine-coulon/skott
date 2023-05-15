import { TransformResult } from 'vite';
import { R as RawSourceMap } from './types-63205a44.js';

interface InstallSourceMapSupportOptions {
    getSourceMap: (source: string) => RawSourceMap | null | undefined;
}
declare function withInlineSourcemap(result: TransformResult): Promise<TransformResult>;
declare function extractSourceMap(code: string): RawSourceMap | null;
declare function installSourcemapsSupport(options: InstallSourceMapSupportOptions): void;

export { extractSourceMap, installSourcemapsSupport, withInlineSourcemap };
