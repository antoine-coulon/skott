import { setSafeTimers } from '@vitest/utils';
import { a as resetRunOnceCounter } from './chunk-integrations-run-once.38756e30.js';

let globalSetup = false;
async function setupCommonEnv(config) {
  resetRunOnceCounter();
  setupDefines(config.defines);
  if (globalSetup)
    return;
  globalSetup = true;
  setSafeTimers();
  if (config.globals)
    (await import('./chunk-integrations-globals.1a781ae7.js')).registerApiGlobally();
}
function setupDefines(defines) {
  for (const key in defines)
    globalThis[key] = defines[key];
}

export { setupCommonEnv as s };
