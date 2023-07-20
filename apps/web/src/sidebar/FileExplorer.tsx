import {
  Navbar,
  TextInput,
  Code,
  Text,
  createStyles,
  rem,
  Accordion,
  Box,
  ActionIcon,
  Flex,
  Image,
  Menu,
  ScrollArea,
} from "@mantine/core";
import {
  IconFilterCog,
  IconDots,
  IconFilterPlus,
  IconFocusCentered,
  IconLoadBalancer,
  IconReportSearch,
} from "@tabler/icons-react";

import { fakeSkottData } from "../fake-data";
import { isJavaScriptModule, isTypeScriptModule } from "../util.js";
import React from "react";
import { UiEvents } from "../events.js";

const data = fakeSkottData;

const skottPathSeparator = "#sk#";

function parseFilePath(fileId: string): string {
  return fileId.split(skottPathSeparator).join("/");
}

type FileExplorerEvents = {
  action: "filter_by_glob";
  payload: {
    glob: string;
  };
};

const useStyles = createStyles((theme) => ({
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));

const fileTree = {
  lib: {
    "index.js": {},
    "some-dir": {
      "index.js": {},
      "some-folder": {
        "index.js": {},
        "deep-folder": {
          "index.js": {},
          "some-folder": {
            "index.js": {},
            "deep-folder": {
              "index.js": {},
              "some-folder": {
                "index.js": {},
                "deep-folder": {
                  "index.js": {},
                  "some-folder": {
                    "index.js": {},
                    "deep-folder": {
                      "index.js": {},
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  app: {
    "main.ts": {},
  },
  "index.js": {},
};

function AccordionControl({
  children,
  onAction,
}: {
  children: React.ReactNode;
  onAction: (action: "filter") => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </Accordion.Control>
      <Menu
        transitionProps={{ transition: "pop-top-right" }}
        position="right"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon size="lg">
            <IconDots size="1rem" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => onAction("filter")}
            icon={<IconFilterPlus size="1.3rem" color="violet" stroke={1.5} />}
          >
            Add to filter pattern
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

function File({
  name,
  isRoot,
  fileId,
  actionDispatcher,
}: {
  name: string;
  isRoot: boolean;
  fileId: string;
  actionDispatcher: (action: UiEvents) => void;
}) {
  return (
    <Flex
      align="center"
      justify="space-between"
      ml={15}
      p={isRoot ? 10 : 0}
      mb={5}
    >
      <Flex align="center">
        <Image src={"./javascript.png"} width={15} fit="contain" />
        <Text truncate="end" ml={10}>
          {name}
        </Text>
      </Flex>
      <Menu
        transitionProps={{ transition: "pop-top-right" }}
        position="right"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon size="lg">
            <IconDots size="1rem" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() =>
              actionDispatcher({
                action: "focus_on_node",
                payload: { nodeId: parseFilePath(fileId) },
              })
            }
            icon={
              <IconFocusCentered size="1.3rem" color="violet" stroke={1.5} />
            }
          >
            Focus
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              actionDispatcher({
                action: "isolate_node",
                payload: { nodeId: parseFilePath(fileId) },
              })
            }
            icon={
              <IconLoadBalancer size="1.3rem" color="violet" stroke={1.5} />
            }
          >
            Isolate
          </Menu.Item>
          <Menu.Item
            onClick={() => {}}
            icon={
              <IconReportSearch size="1.3rem" color="violet" stroke={1.5} />
            }
          >
            Open details
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}

function Folder({
  name,
  children,
  openedFolders,
  fileId,
  onOpen,
  onClose,
  actionDispatcher,
}: {
  name: string;
  children: Record<string, any>;
  fileId: string;
  openedFolders: Set<string>;
  onOpen: (filename: string) => void;
  onClose: (filename: string) => void;
  actionDispatcher: (action: UiEvents | FileExplorerEvents) => void;
}) {
  return (
    <Accordion
      key={name}
      variant="filled"
      chevronPosition="left"
      multiple
      onChange={(values) => {
        if (values.length > 0) {
          onOpen(fileId);
        } else {
          onClose(fileId);
        }
      }}
    >
      <Accordion.Item value={name}>
        <AccordionControl
          onAction={(event) => {
            if (event === "filter") {
              actionDispatcher({
                action: "filter_by_glob",
                payload: { glob: `${parseFilePath(fileId)}/**/*` },
              });
            }
          }}
        >
          <Flex align={"center"}>
            {openedFolders.has(fileId) ? (
              <Image src={"./opened_folder.svg"} width={20} fit="contain" />
            ) : (
              <Image src={"./folder.svg"} width={20} fit="contain" />
            )}
            <Text truncate="end" ml={5}>
              {name}
            </Text>
          </Flex>
        </AccordionControl>
        <Accordion.Panel>
          {Object.entries(children).map(([name, value]) => {
            if (isTypeScriptModule(name) || isJavaScriptModule(name)) {
              return (
                <File
                  isRoot={false}
                  fileId={`${fileId}#sk#${name}`}
                  key={`file-${name}`}
                  name={name}
                  actionDispatcher={actionDispatcher}
                />
              );
            }
            return (
              <Folder
                key={`folder-${name}`}
                name={name}
                fileId={`${fileId}#sk#${name}`}
                children={value}
                openedFolders={openedFolders}
                onOpen={onOpen}
                onClose={onClose}
                actionDispatcher={actionDispatcher}
              />
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function FileExplorerAccordion({
  actionDispatcher,
}: {
  actionDispatcher: (action: UiEvents | FileExplorerEvents) => void;
}) {
  const [openedFolders, setOpenedFolders] = React.useState(new Set<string>());

  return (
    <>
      {Object.entries(fileTree).map(([leafName, value]) => {
        if (isTypeScriptModule(leafName) || isJavaScriptModule(leafName)) {
          return (
            <File
              isRoot
              key={leafName}
              fileId={leafName}
              name={leafName}
              actionDispatcher={actionDispatcher}
            />
          );
        }
        return Folder({
          name: leafName,
          children: value,
          fileId: leafName,
          openedFolders,
          onOpen: (fileId) => {
            openedFolders.add(fileId);
            setOpenedFolders(new Set(openedFolders));
          },
          onClose: (fileId) => {
            openedFolders.delete(fileId);
            setOpenedFolders(new Set(openedFolders));
          },
          actionDispatcher,
        });
      })}
    </>
  );
}

export function FileExplorer() {
  const { classes } = useStyles();

  const typescriptFiles: string[] = [];
  const javascriptFiles: string[] = [];

  for (const file of data.files) {
    if (isTypeScriptModule(file)) {
      typescriptFiles.push(file);
    }

    if (isJavaScriptModule(file)) {
      javascriptFiles.push(file);
    }
  }

  function applyFilter(globPattern: string) {}

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
            icon={<IconFilterCog size="0.8rem" stroke={1.5} />}
            rightSectionWidth={60}
            rightSection={<Code className={classes.searchCode}>Filter</Code>}
            styles={{ rightSection: { pointerEvents: "none" } }}
            mb="sm"
          />
        </Box>

        <FileExplorerAccordion actionDispatcher={dispatchAction} />
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
