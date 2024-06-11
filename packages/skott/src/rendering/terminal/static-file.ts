import { createRequire } from "module";

import kleur from "kleur";
import ora from "ora";

import type { SkottNode } from "../../graph/node.js";

export async function renderStaticFile(
  graph: Record<string, SkottNode>,
  staticFileType: string
): Promise<void> {
  console.log();

  try {
    const require = createRequire(import.meta.url);
    const pluginPath = require.resolve("@skottorg/static-file-plugin");
    const { generateStaticFile, supportedStaticFileTypes } = await import(
      pluginPath
    );

    if (!supportedStaticFileTypes.includes(staticFileType)) {
      console.error(
        kleur.red(
          ` Provided type: "${staticFileType}". Expected one of: ${supportedStaticFileTypes.join(
            ", "
          )}`
        )
      );

      return;
    }

    try {
      const spinner = ora("Generating static file").start();
      // @ts-ignore - dynamic import that might not be available
      generateStaticFile(graph, staticFileType);
      spinner.stop();

      console.log(kleur.green(` Static file generation successful.`));
    } catch (error) {
      console.error(
        kleur.red(` Static file generation failed. Reason: ${error}`)
      );
      process.exitCode = 1;
    }
  } catch {
    console.error(
      kleur.red(
        ` Static file generation is not available.` +
          ` Please install the '@skottorg/static-file-plugin' package.`
      )
    );
    process.exitCode = 1;
  }
}
