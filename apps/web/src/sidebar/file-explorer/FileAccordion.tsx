import React from "react";
import {
  Text,
  Accordion,
  Box,
  ActionIcon,
  Flex,
  Image,
  Menu,
} from "@mantine/core";
import {
  IconDots,
  IconFilterPlus,
  IconFocusCentered,
  IconFile,
} from "@tabler/icons-react";
import { makeTreeStructure } from "fs-tree-structure";

import { isJavaScriptModule, isTypeScriptModule } from "../../util";
import { useAppStore } from "@/store/react-bindings";
import { callUseCase, notify } from "@/store/store";
import { filterByGlob } from "@/core/file-system/filter-by-glob";

const skottPathSeparator = "#sk#";

function parseFilePath(fileId: string): string {
  return fileId.split(skottPathSeparator).join("/");
}

const languagesWithIcons = {
  ts: <Image src={"./typescript.png"} width={15} fit="contain" />,
  js: <Image src={"./javascript.png"} width={15} fit="contain" />,
};

function getLanguageIcon(filename: string) {
  if (isTypeScriptModule(filename)) {
    return languagesWithIcons.ts;
  } else if (isJavaScriptModule(filename)) {
    return languagesWithIcons.js;
  } else {
    return <IconFile size={15} />;
  }
}

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
}: {
  name: string;
  isRoot: boolean;
  fileId: string;
}) {
  return (
    <Flex
      align="center"
      justify="space-between"
      ml={15}
      pl={isRoot ? 10 : "0.9rem"}
      mb={5}
      pr={0}
    >
      <Flex align="center">
        {getLanguageIcon(name)}
        <Text truncate="end" maw={150} ml={10}>
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
              notify({
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
}: {
  name: string;
  children: Record<string, any>;
  fileId: string;
  openedFolders: Set<string>;
  onOpen: (filename: string) => void;
  onClose: (filename: string) => void;
}) {
  function applyFilter(globPattern: string) {
    const invokeUseCase = callUseCase(filterByGlob);
    invokeUseCase(globPattern);
  }

  return (
    <Accordion
      key={name}
      variant="filled"
      chevronPosition="left"
      multiple
      defaultValue={openedFolders.has(fileId) ? [name] : []}
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
              applyFilter(`${parseFilePath(fileId)}/**/*`);
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
          {openedFolders.has(fileId)
            ? Object.entries(children).map(([name, value]) => {
                if (isTypeScriptModule(name) || isJavaScriptModule(name)) {
                  return (
                    <File
                      isRoot={false}
                      fileId={`${fileId}#sk#${name}`}
                      key={`file-${name}`}
                      name={name}
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
                  />
                );
              })
            : null}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export function FileExplorerAccordion() {
  const [openedFolders, setOpenedFolders] = React.useState(new Set<string>());
  const [fileTree, setFileTree] = React.useState<Record<string, any>>({});
  const appStore = useAppStore();

  React.useEffect(() => {
    const s = appStore.store$.subscribe(({ data }) => {
      setFileTree(makeTreeStructure(data.files, { sort: true }));
    });

    return () => {
      s.unsubscribe();
    };
  }, []);

  return (
    <>
      {Object.entries(fileTree).map(([leafName, value]) => {
        if (isTypeScriptModule(leafName) || isJavaScriptModule(leafName)) {
          return (
            <File isRoot key={leafName} fileId={leafName} name={leafName} />
          );
        }
        return Folder({
          name: leafName,
          children: value,
          fileId: leafName,
          openedFolders,
          // shouldOpenChildren: openedFolders.has(leafName),
          onOpen: (fileId) => {
            openedFolders.add(fileId);
            setOpenedFolders(new Set(openedFolders));
          },
          onClose: (fileId) => {
            openedFolders.delete(fileId);
            setOpenedFolders(new Set(openedFolders));
          },
        });
      })}
    </>
  );
}
