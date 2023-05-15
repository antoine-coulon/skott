import cac from 'cac';
import c from 'picocolors';
import { createServer } from 'vite';
import { ViteNodeServer } from './server.mjs';
import { ViteNodeRunner } from './client.mjs';
import { toArray } from './utils.mjs';
import { installSourcemapsSupport } from './source-map.mjs';
import { v as viteNodeHmrPlugin, c as createHotContext, h as handleMessage } from './chunk-hmr.mjs';
import 'node:perf_hooks';
import 'pathe';
import 'debug';
import 'node:fs';
import 'mlly';
import 'node:url';
import 'source-map-support';
import 'node:module';
import 'node:path';
import 'node:vm';
import 'node:events';

var version = "0.28.2";

const cli = cac("vite-node");
cli.version(version).option("-r, --root <path>", "Use specified root directory").option("-c, --config <path>", "Use specified config file").option("-w, --watch", 'Restart on file changes, similar to "nodemon"').option("--options <options>", "Use specified Vite server options").help();
cli.command("[...files]").action(run);
cli.parse();
async function run(files, options = {}) {
  var _a;
  if (!files.length) {
    console.error(c.red("No files specified."));
    cli.outputHelp();
    process.exit(1);
  }
  process.argv = [...process.argv.slice(0, 2), ...options["--"] || []];
  const serverOptions = options.options ? parseServerOptions(options.options) : {};
  const server = await createServer({
    logLevel: "error",
    configFile: options.config,
    root: options.root,
    plugins: [
      options.watch && viteNodeHmrPlugin()
    ]
  });
  await server.pluginContainer.buildStart({});
  const node = new ViteNodeServer(server, serverOptions);
  installSourcemapsSupport({
    getSourceMap: (source) => node.getSourceMap(source)
  });
  const runner = new ViteNodeRunner({
    root: server.config.root,
    base: server.config.base,
    fetchModule(id) {
      return node.fetchModule(id);
    },
    resolveId(id, importer) {
      return node.resolveId(id, importer);
    },
    createHotContext(runner2, url) {
      return createHotContext(runner2, server.emitter, files, url);
    }
  });
  await runner.executeId("/@vite/env");
  for (const file of files)
    await runner.executeFile(file);
  if (!options.watch)
    await server.close();
  (_a = server.emitter) == null ? void 0 : _a.on("message", (payload) => {
    handleMessage(runner, server.emitter, files, payload);
  });
  if (options.watch) {
    process.on("uncaughtException", (err) => {
      console.error(c.red("[vite-node] Failed to execute file: \n"), err);
    });
  }
}
function parseServerOptions(serverOptions) {
  var _a, _b, _c, _d, _e;
  const inlineOptions = ((_a = serverOptions.deps) == null ? void 0 : _a.inline) === true ? true : toArray((_b = serverOptions.deps) == null ? void 0 : _b.inline);
  return {
    ...serverOptions,
    deps: {
      ...serverOptions.deps,
      inline: inlineOptions !== true ? inlineOptions.map((dep) => {
        return dep.startsWith("/") && dep.endsWith("/") ? new RegExp(dep) : dep;
      }) : true,
      external: toArray((_c = serverOptions.deps) == null ? void 0 : _c.external).map((dep) => {
        return dep.startsWith("/") && dep.endsWith("/") ? new RegExp(dep) : dep;
      })
    },
    transformMode: {
      ...serverOptions.transformMode,
      ssr: toArray((_d = serverOptions.transformMode) == null ? void 0 : _d.ssr).map((dep) => new RegExp(dep)),
      web: toArray((_e = serverOptions.transformMode) == null ? void 0 : _e.web).map((dep) => new RegExp(dep))
    }
  };
}
