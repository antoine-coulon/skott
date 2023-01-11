import { ServerResponse } from "node:http";

import compression from "compression";
import kleur from "kleur";
import { open } from "openurl";
import polka from "polka";
import sirv from "sirv";
// @ts-ignore - no types yet
import resolveWebAppStaticPath from "skott-webapp";

import { SkottInstance, SkottStructure } from "../../src/skott.js";

function findSkottWebAppDirectory(): string {
  const skottWebAppDirectory = resolveWebAppStaticPath();

  return skottWebAppDirectory;
}

const trackingWithCommands = {
  builtin: {
    label: "Built-in dependencies",
    argument: "--trackBuiltinDependencies"
  },
  thirdParty: {
    label: "Third-party dependencies",
    argument: "--trackThirdPartyDependencies"
  },
  typeOnly: {
    label: "Type-level only dependencies",
    argument: "--trackTypeOnlyDependencies"
  }
} as const;

function displaySelectedTracking(
  option: keyof typeof trackingWithCommands,
  enabled: boolean
): void {
  const optionInformation = trackingWithCommands[option];
  console.log(
    `\n ${kleur
      .bold()
      .magenta(`${optionInformation.label}: ${enabled ? "✅" : "❌"}`)}`
  );
  if (!enabled) {
    console.log(
      `\n --> Use ${kleur
        .bold()
        .yellow(optionInformation.argument)} to enable tracking.`
    );
  }
}

// eslint-disable-next-line max-params
export function openWebApplication(
  skottInstance: SkottInstance,
  skottStructure: SkottStructure,
  entrypoint: string | undefined,
  options: {
    thirdParty: boolean;
    builtin: boolean;
    typeOnly: boolean;
  }
): void {
  const skottWebAppPath = findSkottWebAppDirectory();

  for (const [key, value] of Object.entries(options)) {
    displaySelectedTracking(key as keyof typeof trackingWithCommands, value);
  }

  const compress = compression();
  const assets = sirv(skottWebAppPath, {
    immutable: true
  });
  const srv = polka().use(compress, assets);

  console.log(`\n ${kleur.italic("Prefetching data...")} `);

  let computedCycles: string[][] = [];

  srv.use("/cycles", (_, response: ServerResponse) => {
    response.setHeader("Content-Type", "application/json");
    if (computedCycles.length > 0) {
      return response.end(computedCycles);
    }

    const cycles = skottInstance.findCircularDependencies();
    computedCycles = computedCycles.concat(cycles);

    return response.end(computedCycles);
  });

  srv.use("/api", (_, response: ServerResponse) => {
    response.setHeader("Content-Type", "application/json");
    response.end({ ...skottStructure, cycles: [] });
  });

  srv.listen(process.env.SKOTT_PORT || 0);

  // @ts-expect-error - "port" exists
  const bindedAddress = `http://127.0.0.1:${srv.server?.address()?.port}`;

  console.log(
    `\n ${kleur.bold(
      `💻 Opened ${kleur.bold().green("@skott/webapp")} on`
    )} ${kleur.bold().bgMagenta(`${bindedAddress}`)}`
  );

  open(bindedAddress, (error) => {
    if (error) {
      console.log(
        `\n ${kleur
          .red()
          .bold(`Could not open @skott/webapp on ${bindedAddress}`)}`
      );
    }
  });
}
