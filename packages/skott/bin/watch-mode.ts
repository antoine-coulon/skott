import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import watcher from "@parcel/watcher";
import { pipe, Option } from "effect";
import kleur from "kleur";
// @ts-expect-error - no valid type definitions exist
import gitignoreParse from "parse-gitignore";

import { defaultIgnoredDirs } from "../src/modules/resolvers/base-resolver.js";

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

export async function registerWatchMode({
  cwd,
  ignorePattern,
  fileExtensions,
  onChangesDetected
}: {
  cwd: string;
  ignorePattern: string;
  fileExtensions: string[];
  onChangesDetected: (doneSubscribersPropagation: () => void) => void;
}) {
  /**
   * For simplicity's sake, we only support discarding entries from the .gitignore
   * located at the provided cwd.
   */
  const gitIgnoredEntries = await retrieveGitIgnoredEntries(cwd);

  const listOfWatchableFileExtensions = fileExtensions
    .map(toDotlessExtension)
    .join(",");

  const ignoreList = [
    // Whitelist the provided `fileExtensions` API option (fallbacks to a default list).
    `!**/*.{${listOfWatchableFileExtensions}}`,
    // Discard all entries ignored by gitignore
    ...gitIgnoredEntries,
    // Discard all directories ignored by default
    ...defaultIgnoredDirs
  ];

  if (ignorePattern) {
    ignoreList.push(ignorePattern);
  }

  console.log(
    kleur.bold().grey("\n \n -------------skott(watch-mode)-------------")
  );

  console.log(
    `\n ${kleur.bold().yellow(watchModeStatus.watching_for_changes)}`
  );

  const uniqueIgnoreList = [...new Set(ignoreList)];

  let changesCount = 0;

  function printChangeCount() {
    return kleur.bold().green(`(x${changesCount})`);
  }

  return watcher.subscribe(
    cwd,
    (_err, _events) => {
      changesCount++;

      if (changesCount === 1) {
        process.stdout.write("\n");
      }

      clearTerminal();

      if (changesCount > 1) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
      }

      onChangesDetected(() => {
        console.log(
          kleur.bold().grey("\n \n <------------skott(watch-mode)------------>")
        );

        console.log(
          `\n ${kleur.bold().yellow(watchModeStatus.watching_for_changes)}`
        );

        process.stdout.write(
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
