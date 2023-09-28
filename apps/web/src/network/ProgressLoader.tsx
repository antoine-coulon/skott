import { Box, Progress, useMantineColorScheme, Text } from "@mantine/core";
import React from "react";

import { useAppEffects, useAppStore } from "@/store/react-bindings";

export function ProgressLoader() {
  const appStore = useAppStore();
  const { colorScheme } = useMantineColorScheme();
  const [showProgress, setShowProgress] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  useAppEffects((store) => {
    if (store.action === "network_refresh") {
      setShowProgress(true);
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
          width: "250px",
          height: "250px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box>
          <Text m="md">
            Check the documentation from Graph Configuration menu to customize
            the visualization.
          </Text>

          <Progress
            color="blue"
            radius="sm"
            size="lg"
            value={progress}
            animate
          />
        </Box>
      </div>
    </div>
  );
}
