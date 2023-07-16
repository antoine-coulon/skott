import { SkottStructureWithMetadata } from "./skott.js";
import React from "react";
import "ninja-keys";
import { NinjaKeys } from "ninja-keys";

import * as Option from "@effect/data/Option";
import { DataStore, UiEvents } from "./events.js";
import { Subject } from "rxjs";

export default function GlobalSearch({
  dataStore$,
  uiEvents$,
}: {
  dataStore$: Subject<DataStore>;
  uiEvents$: Subject<UiEvents>;
}) {
  const [data, setData] = React.useState<
    Option.Option<SkottStructureWithMetadata>
  >(Option.none());
  const containerRef = React.useRef<NinjaKeys | null>(null);

  function focusOnNode(id: string) {
    uiEvents$.next({ action: "focus", payload: { nodeId: id } });
  }

  React.useEffect(() => {
    const uiEventsSubscription = uiEvents$.subscribe((event) => {
      if (event.action === "open_search") {
        containerRef.current?.open();
        containerRef.current?.focus();
      }
    });

    const dataStoreSubscription = dataStore$.subscribe((dataStore) => {
      setData(Option.some(dataStore));
    });

    return () => {
      uiEventsSubscription.unsubscribe();
      dataStoreSubscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (containerRef.current && Option.isSome(data)) {
      containerRef.current.data = Object.values(data.value.graph)
        .map((value) => ({
          id: value.id,
          title: value.id,
          mdIcon: "file_open",
          handler: ({ id }: { id: string }) => focusOnNode(id),
        }))
        .sort(({ id: f1 }, { id: f2 }) => {
          const f1BaseDir = f1.split("/").slice(0, -1).join("/");
          const f2BaseDir = f2.split("/").slice(0, -1).join("/");
          if (f1BaseDir.startsWith(f2BaseDir)) return 1;
          if (f2BaseDir.startsWith(f1BaseDir)) return -1;
          return 0;
        });
    }
  }, [data]);

  return (
    // @ts-ignore
    <ninja-keys
      placeholder="Search for a node..."
      hideBreadcrumbs="true"
      ref={containerRef}
    />
  );
}
