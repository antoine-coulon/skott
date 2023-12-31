import watcher from "@parcel/watcher";
import kleur from "kleur";

function toDotlessExtension(fileExtension: string) {
  return fileExtension.replace(".", "");
}

export function registerWatchMode(cwd: string, fileExtensions: string[]) {
  console.log(
    `\n ${kleur
      .bold()
      .yellow("Watching for graph changes in current working directory...")}`
  );

  const listOfWatchableFileExtensions = fileExtensions
    .map(toDotlessExtension)
    .join(",");

  return watcher.subscribe(
    cwd,
    (_err, _events) => {
      console.log(`\n ${kleur.bold().yellow("Changes detected")}`);
    },
    {
      ignore: [`!*.{${listOfWatchableFileExtensions}}`]
    }
  );
}
