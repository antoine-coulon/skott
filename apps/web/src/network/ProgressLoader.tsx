import {
  Box,
  Progress,
  useMantineColorScheme,
  Text,
  Button,
  Group,
} from "@mantine/core";
import React from "react";

import { useAppEffects, useAppStore } from "@/store/react-bindings";
import { AppState } from "@/store/state";
import { notify } from "@/store/store";

const makeProgressContext = (state: AppState) => {
  const nodesSize = state.data.files.length;
  const edgesSize = Object.values(state.data.graph).reduce(
    (numberOfEdges, nodeBody) => {
      return numberOfEdges + nodeBody.adjacentTo.length;
    },
    0
  );

  const messages = {
    size_warning:
      `Graph contains ${nodesSize} nodes and ${edgesSize} edges.` +
      ` Rendering will be slow and will block the main thread. Consider using a smaller dataset.` +
      ` "Improve Spacing" option was automatically disabled to improve loading time, but node spacing won't be optimal.`,
    documentation_info:
      "Check the documentation from Graph Configuration menu to customize the visualization.",
  };
  if (nodesSize >= 300 || edgesSize >= 900) {
    return { message: messages.size_warning, thresholdReached: true };
  }
  return { message: messages.documentation_info, thresholdReached: false };
};

const minimumDataSizeForProgressBar = 50;

export function ProgressLoader() {
  const appStore = useAppStore();
  const { colorScheme } = useMantineColorScheme();
  const [showProgress, setShowProgress] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const { message, thresholdReached } = makeProgressContext(
    appStore.getState()
  );

  useAppEffects((store) => {
    if (
      appStore.getState().data.files.length <= minimumDataSizeForProgressBar
    ) {
      return;
    }

    if (store.action === "network_cancel") {
      setProgress(0);
      setShowProgress(false);
    }

    if (store.action === "network_refresh") {
      setProgress(0);
    }

    if (store.action === "network_loading") {
      setShowProgress(true);
      setProgress(store.payload.progress);

      if (store.payload.progress === 100) {
        setShowProgress(false);
      }
    }
  });

  if (!showProgress) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        zIndex: 1,
        left: "0",
        background:
          colorScheme === "dark"
            ? "rgba(45, 45, 45, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "350px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box>
          <Text m="lg">{message}</Text>

          <Progress
            color="blue"
            radius="sm"
            size="lg"
            value={progress}
            animate
            style={{
              width: "50%",
              margin: "0 auto",
            }}
          />

          {thresholdReached ? (
            <Group mt="xl" position="center">
              <Button
                onClick={() => {
                  notify({ action: "network_cancel" });
                }}
                mt="lg"
                size="sm"
                variant="filled"
                color="orange"
              >
                Cancel initial rendering
              </Button>
            </Group>
          ) : null}
        </Box>
      </div>
    </div>
  );
}
