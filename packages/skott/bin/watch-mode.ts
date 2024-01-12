import watcher from "@parcel/watcher";
import kleur from "kleur";

import { defaultIgnoredDirs } from "../src/modules/resolvers/base-resolver.js";

function toDotlessExtension(fileExtension: string) {
  return fileExtension.replace(".", "");
}

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
    `\n ${kleur
      .bold()
      .yellow("Watching for graph changes in current working directory...")}`
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
      console.log(`\n ${kleur.bold().yellow("Changes detected")}`);
    },
    {
      ignore: ignoreList
    }
  );
}
