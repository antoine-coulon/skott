import watcher from "@parcel/watcher";
import kleur from "kleur";

import { defaultIgnoredDirs } from "../src/modules/resolvers/base-resolver.js";

function toDotlessExtension(fileExtension: string) {
  return fileExtension.replace(".", "");
}

export const watchModeStatus = {
  watching_for_changes:
    "Watching for graph changes in current working directory...",
  changes_detected: "Changes detected"
};

export function registerWatchMode({
  cwd,
  ignorePattern,
  fileExtensions
}: {
  cwd: string;
  ignorePattern: string;
  fileExtensions: string[];
}) {
  console.log(
    `\n ${kleur.bold().yellow(watchModeStatus.watching_for_changes)}`
  );

  const listOfWatchableFileExtensions = fileExtensions
    .map(toDotlessExtension)
    .join(",");

  const ignoreList = [
    `!**/*.{${listOfWatchableFileExtensions}}`,
    ...defaultIgnoredDirs
  ];

  if (ignorePattern) {
    ignoreList.push(ignorePattern);
  }

  return watcher.subscribe(
    cwd,
    (_err, _events) => {
      console.log(
        `\n ${kleur.bold().yellow(watchModeStatus.changes_detected)}`
      );
    },
    {
      ignore: ignoreList
    }
  );
}
