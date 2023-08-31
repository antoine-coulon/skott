import {
  Navbar,
  TextInput,
  Code,
  createStyles,
  rem,
  Box,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import * as m from "minimatch-browser-fork";
import { IconFilterCog } from "@tabler/icons-react";
import React from "react";

import { UiEvents } from "../../events.js";
import { useDataStore } from "../../store/data-store.js";
import { FileExplorerEvents } from "./events.js";
import { FileExplorerAccordion } from "./FileAccordion.js";

const useStyles = createStyles((theme) => ({
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));

function filterByGlobMatch(glob: string) {
  return function (filename: string) {
    return !m.filter(glob, { matchBase: true })(filename);
  };
}

function areKeptFiles(glob: string) {
  return function (files: string[]) {
    return !files.some((file) => m.minimatch(file, glob, { matchBase: true }));
  };
}

export function FileExplorer() {
  const { classes } = useStyles();
  const dataStore = useDataStore();
  const theme = useMantineTheme();
  const [filter, setFilter] = React.useState("");

  function selectFilterColor() {
    if (filter.length === 0) {
      return theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[6];
    } else {
      return theme.colors.teal[7];
    }
  }

  function applyFilter(globPattern: string) {
    setFilter(globPattern);

    const { graph, files, cycles, ...storeValues } =
      dataStore.getInitialStore();
    const filteredFiles = files.filter(filterByGlobMatch(globPattern));
    const filteredGraph = Object.fromEntries(
      Object.entries(graph).filter(([key]) => {
        return filteredFiles.includes(key);
      })
    );
    const filteredCycles = cycles.filter(areKeptFiles(globPattern));

    dataStore.store$.next({
      ...storeValues,
      files: filteredFiles,
      graph: filteredGraph,
      cycles: filteredCycles,
    });
  }

  function dispatchAction(event: UiEvents | FileExplorerEvents) {
    if (event.action === "filter_by_glob") {
      applyFilter(event.payload.glob);
    } else {
    }
  }

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Box p="md">
          <TextInput
            placeholder="Example: src/**/*.ts"
            size="xs"
            color="red"
            value={filter}
            onChange={(event) => applyFilter(event.target.value)}
            icon={
              <IconFilterCog
                size="0.8rem"
                stroke={1.5}
                color={selectFilterColor()}
              />
            }
            rightSectionWidth={60}
            rightSection={
              <Code
                style={{
                  backgroundColor: selectFilterColor(),
                }}
                className={classes.searchCode}
              >
                Filter
              </Code>
            }
            styles={{ rightSection: { pointerEvents: "none" } }}
            mb="sm"
          />
        </Box>

        <FileExplorerAccordion actionDispatcher={dispatchAction} />
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
