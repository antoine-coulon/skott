import { Observable } from "rxjs";
import { focusOnNetworkNode } from "./network";
import { SkottStructureWithCycles } from "./skott";

export function initializeGlobalSearch(
  dataStream$: Observable<SkottStructureWithCycles>
) {
  const ninja = document.querySelector("ninja-keys");

  if (!ninja) return;

  const kbdContainer = document.querySelector(".kbd-option");

  kbdContainer?.addEventListener("click", function () {
    ninja.open();
  });

  dataStream$.subscribe((data) => {
    const { graph, entrypoint } = data;
    const hasEntryPoint = entrypoint !== "none";
    const files = Object.values(graph)
      .filter((value) => value.id !== entrypoint)
      .map((value) => ({
        id: value.id,
        title: value.id,
        mdIcon: "file_open",
        handler: ({ id }: { id: string }) => {
          focusOnNetworkNode(id);
        },
      }));

    ninja.data = [
      {
        id: hasEntryPoint ? entrypoint : "Files to browse",
        title: hasEntryPoint ? entrypoint : "Type the file name",
        mdIcon: hasEntryPoint ? "file_open" : "input",
        section: "Files found",
        // @ts-expect-error
        children: files,
        handler: ({ id }: { id: string }) => {
          if (entrypoint) focusOnNetworkNode(id);
        },
      },
    ];
  });
}
