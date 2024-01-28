import { useClient } from "@/client/react-bindings";
import { logError, logInfo } from "@/logger";
import { refreshApp } from "@/refresh-app";
import { callUseCase } from "@/store/store";
import React from "react";

export function useSubscribeToWatchMode() {
  const client = useClient();

  React.useEffect(() => {
    const eventSource = new EventSource("/api/subscribe");

    eventSource.onopen = function () {
      logInfo(`Successfully subscribed to file watching events.`);
    };

    eventSource.onmessage = function () {
      logInfo(`Files changed. Refreshing application...`);
      callUseCase(refreshApp)(client);
    };

    eventSource.onerror = function () {
      logError(`Failed to subscribe to file watching events.`);
    };

    return () => {
      eventSource.close();
    };
  }, []);
}
