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
import { IconFilterCog } from "@tabler/icons-react";
import React from "react";

import { UiEvents } from "../../store/events";
import { callUseCase } from "../../store/store";
import { FileExplorerEvents } from "./events";
import { FileExplorerAccordion } from "./FileAccordion";
import { filterByGlob } from "./use-cases/filter-by-glob";
import { useAppStore } from "../../store/react-bindings";

const useStyles = createStyles((theme) => ({
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));

export function FileExplorer() {
  const { classes } = useStyles();
  const appStore = useAppStore();
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
    const invokeUseCase = callUseCase(filterByGlob);
    invokeUseCase(globPattern);
  }

  function dispatchAction(event: UiEvents | FileExplorerEvents) {
    if (event.action === "filter_by_glob") {
      applyFilter(event.payload.glob);
    } else {
    }
  }

  React.useEffect(() => {
    const unsubscribe = appStore.uiState$.subscribe(({ filters }) => {
      setFilter(filters.glob);
    });
    return () => {
      unsubscribe.unsubscribe();
    };
  });

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
