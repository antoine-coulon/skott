import { ChildProcess, spawn } from "node:child_process";
import { platform } from "node:process";

import compression from "compression";
import isWsl from "is-wsl";
import kleur from "kleur";
import polka from "polka";
import sirv from "sirv";
import resolveWebAppStaticPath from "skott-webapp";

const supportedPlatforms = ["darwin", "win32", "linux"] as const;

function selectPlatformBinary() {
  let binary: string | undefined;

  switch (platform) {
    case "darwin":
      binary = "open";
      break;
    case "win32":
      binary = "explorer.exe";
      break;
    case "linux":
      binary = "xdg-open";
      break;
    default:
      throw new Error(
        `Unsupported platform: ${
          process.platform
        }. Supported platforms are: ${supportedPlatforms.join(", ")}`
      );
  }

  return binary;
}

function open(url: string, callback: (error: Error) => void) {
  try {
    let child: ChildProcess;

    if (isWsl) {
      child = spawn("cmd.exe", ["/c", "start", url]);
    } else {
      const binary = selectPlatformBinary();
      child = spawn(binary, [url]);
    }

    child.on("error", callback);
  } catch (error) {
    callback(error as Error);
  }
}

function findSkottWebAppDirectory() {
  const skottWebAppDirectory = resolveWebAppStaticPath();

  if (!skottWebAppDirectory) {
    throw new Error(
      "package 'skott-webapp' could not be found. Please install it as a dependency."
    );
  }

  return skottWebAppDirectory;
}

export function createHttpApp(port: number) {
  const skottWebAppPath = findSkottWebAppDirectory();
  const compress = compression();
  const assets = sirv(skottWebAppPath, {
    immutable: true
  });
  const app = polka().use(compress, assets);

  return {
    app,
    listen: (
      inputOptions:
        | {
            autoOpen: false;
            onListen?: (port: number) => void;
          }
        | {
            autoOpen: true;
            onListen?: (port: number) => void;
            onOpenError?: (error: Error) => void;
          }
    ) => {
      app.listen(port);

      // @ts-expect-error - port exists
      const bindedAddress = `http://localhost:${app.server?.address()?.port}`;

      if (inputOptions.onListen) {
        inputOptions.onListen(port);
      } else {
        console.log(
          `\n ${kleur.bold(`💻 Web application is ready:`)} ${kleur
            .bold()
            .underline()
            .magenta(`${bindedAddress}`)}`
        );
      }

      if (!inputOptions.autoOpen) {
        return;
      }

      open(bindedAddress, (error) => {
        if (error) {
          if (inputOptions.onOpenError) {
            inputOptions.onOpenError(error);

            return;
          }

          console.log(
            `\n ${kleur
              .red()
              .bold(
                `Could not automatically open the application on ${bindedAddress}. Reason: "${
                  error.message ?? "unknown"
                }"`
              )}
                    
              \n ${kleur
                .yellow()
                .bold("Application remains accessible manually")}
                `
          );
        }
      });
    }
  };
}
