import React from "react";
import "ninja-keys";
import { NinjaKeys } from "ninja-keys";

import { useAppStore } from "@/store/react-bindings";
import { notify } from "@/store/store";

export default function GlobalSearch() {
  const appStore = useAppStore();
  const containerRef = React.useRef<NinjaKeys | null>(null);

  function focusOnNode(id: string) {
    notify({ action: "focus_on_node", payload: { nodeId: id } });
  }

  React.useEffect(() => {
    const uiEventsSubscription = appStore.events$.subscribe((event) => {
      if (event.action === "open_search") {
        containerRef.current?.open();
        containerRef.current?.focus();
      }
    });

    const dataStoreSubscription = appStore.dataState$.subscribe((data) => {
      if (containerRef.current) {
        containerRef.current.data = Object.values(data.graph)
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
    });

    return () => {
      uiEventsSubscription.unsubscribe();
      dataStoreSubscription.unsubscribe();
    };
  }, []);

  return (
    // @ts-ignore
    <ninja-keys
      placeholder="Search for a node..."
      hideBreadcrumbs="true"
      ref={containerRef}
    />
  );
}
