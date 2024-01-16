import fs from "node:fs/promises";
import path from "node:path";

import { pipe } from "@effect/data/Function";
import * as Option from "@effect/data/Option";
import watcher from "@parcel/watcher";
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
  onChangesDetected: () => void;
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

  const uniqueIgnoreList = [...new Set(ignoreList)];

  console.log(
    `\n ${kleur.bold().yellow(watchModeStatus.watching_for_changes)}`
  );

  let changesCount = 0;

  function printChangeCount() {
    return kleur.bold().green(`x${changesCount}`);
  }

  return watcher.subscribe(
    cwd,
    (_err, _events) => {
      changesCount++;

      if (changesCount === 1) {
        process.stdout.write("\n");
      }

      if (changesCount > 1) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
      }

      process.stdout.write(
        ` ${kleur
          .bold()
          .yellow(watchModeStatus.changes_detected)} ${printChangeCount()}`
      );

      onChangesDetected();
    },
    {
      ignore: uniqueIgnoreList
    }
  );
}
