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

import { callUseCase } from "@/store/store";
import { useAppStore } from "@/store/react-bindings";
import { filterByGlob } from "@/core/file-system/filter-by-glob";

import { FileExplorerAccordion } from "./FileAccordion";

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

  React.useEffect(() => {
    const unsubscribe = appStore.store$.subscribe(({ ui }) => {
      setFilter(ui.filters.glob);
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

        <FileExplorerAccordion />
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
