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
    ninja.data = Object.values(data.graph)
      .map((value) => ({
        id: value.id,
        title: value.id,
        mdIcon: "file_open",
        handler: ({ id }: { id: string }) => {
          focusOnNetworkNode(id);
        },
      }))
      .sort(({ id: f1 }, { id: f2 }) => {
        const f1BaseDir = f1.split("/").slice(0, -1).join("/");
        const f2BaseDir = f2.split("/").slice(0, -1).join("/");
        if (f1BaseDir.startsWith(f2BaseDir)) return 1;
        if (f2BaseDir.startsWith(f1BaseDir)) return -1;
        return 0;
      });
  });
}
