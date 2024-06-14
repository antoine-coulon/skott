import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import watcher from "@parcel/watcher";
import { pipe, Option } from "effect";
import kleur from "kleur";
// @ts-expect-error - no valid type definitions exist
import gitignoreParse from "parse-gitignore";

import { defaultIgnoredDirs } from "../modules/resolvers/base-resolver.js";

export const watchModeStatus = {
  watching_for_changes:
    "Watching for graph changes in current working directory...",
  changes_detected: "Changes detected"
};

function toDotlessExtension(fileExtension: string) {
  return fileExtension.replace(".", "");
}

function clearTerminal() {
  const clearCommand = process.platform === "win32" ? "cls" : "clear";
  try {
    execSync(clearCommand, { stdio: "inherit" });
  } catch {}
}

async function getRootGitIgnorePath(cwd: string) {
  try {
    const files = await fs.readdir(cwd);

    for (const f of files) {
      if (f.includes(".gitignore")) {
        return Option.some(path.join(cwd, f.toString()));
      }
    }
  } catch {}

  return Option.none();
}

async function retrieveGitIgnoredEntries(cwd: string): Promise<string[]> {
  const gitIgnore = await getRootGitIgnorePath(cwd);

  return pipe(
    gitIgnore,
    Option.map((gitIgnorePath) =>
      fs
        .readFile(gitIgnorePath)
        .then((c) => gitignoreParse(c).patterns)
        .catch(() => [])
    ),
    Option.getOrElse(() => [])
  );
}

function makeLogger(verbose: boolean) {
  return {
    log: (message: string) => {
      if (!verbose) return;
      console.log(message);
    },
    stdout: (message: string) => {
      if (!verbose) return;
      process.stdout.write(message);
    }
  };
}

export interface WatchModeOptions {
  cwd: string;
  ignorePatterns: string[];
  fileExtensions: string[];
  verbose?: boolean;
  onChangesDetected: (doneSubscribersPropagation: () => void) => void;
}

export async function registerWatchMode({
  cwd,
  ignorePatterns,
  fileExtensions,
  verbose,
  onChangesDetected
}: WatchModeOptions) {
  /**
   * For simplicity's sake, we only support discarding entries from the .gitignore
   * located at the provided cwd.
   */
  const gitIgnoredEntries = await retrieveGitIgnoredEntries(cwd);
  const logger = makeLogger(verbose ?? false);

  const listOfWatchableFileExtensions = fileExtensions
    .map(toDotlessExtension)
    .join(",");

  const ignoreList = [
    // Whitelist the provided `fileExtensions` API option (fallbacks to a default list).
    `!**/*.{${listOfWatchableFileExtensions}}`,
    // Discard all entries ignored by gitignore
    ...gitIgnoredEntries,
    // Discard all directories ignored by default
    ...defaultIgnoredDirs,
    ...ignorePatterns
  ];

  logger.log(
    kleur.bold().grey("\n \n -------------skott(watch-mode)-------------")
  );

  logger.log(`\n ${kleur.bold().yellow(watchModeStatus.watching_for_changes)}`);

  const uniqueIgnoreList = [...new Set(ignoreList)];

  let changesCount = 0;

  function printChangeCount() {
    return kleur.bold().green(`(x${changesCount})`);
  }

  return watcher.subscribe(
    cwd,
    (_err, _events) => {
      if (verbose) {
        changesCount++;

        if (changesCount === 1) {
          logger.stdout("\n");
        }

        clearTerminal();

        if (changesCount > 1) {
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
        }
      }

      onChangesDetected(() => {
        logger.log(
          kleur.bold().grey("\n \n <------------skott(watch-mode)------------>")
        );

        logger.log(
          `\n ${kleur.bold().yellow(watchModeStatus.watching_for_changes)}`
        );

        logger.stdout(
          `\n ${kleur
            .bold()
            .yellow(watchModeStatus.changes_detected)} ${printChangeCount()}`
        );
      });
    },
    {
      ignore: uniqueIgnoreList
    }
  );
}

process.on("SIGINT", () => {
  console.log(`\n ${kleur.bold().blue("skott")} was interrupted`);
  process.exit(130);
});
